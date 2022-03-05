const path = require('path');
const fs = require('fs');
const net = require('net');
const { EventEmitter } = require('events');


// 文件状态定义，空状态可能是未开始上传、下载，也可能是已过期，任务队列有则是未开始
const FileStatus = {
    // expired: "expired", // 文件过期
    remoteCanceled: "remoteCanceled", // 对方取消
    canceled: "canceled", // 自己取消
    downloading: "downloading", // 下载中
    downloadOk: "downloadOk", // 下载完成
    downloadFailed: "downloadFailed", // 下载失败
    uploading: "uploading", // 上传中
    uploadOk: "uploadOk", // 上传完成
    uploadFailed: "uploadFailed", // 上传失败
    fileNotExist: "fileNotExist" // 文件不存在
}
// 文件发送包大小
const DADA_PACKAGE_SIZE = 1024 * 1024;


// 不考虑断点续传，只做全量下载
function packageP2PMsg({ cmd = 2000, token, fReadPath, offset = 0, length }) {
    let buf = Buffer.alloc(4 + 128 + 640 + 4 + 4);
    buf.writeInt32LE(cmd, 0);
    buf.write(token, 4);
    buf.write(fReadPath, 4 + 128);
    buf.writeInt32LE(offset, 4 + 128 + 640);
    buf.writeInt32LE(length, 4 + 128 + 640 + 4);
    return buf;
}

// 解析buffer数据
function parseP2PMsg(buf) {
    if (buf.length != 4 + 128 + 640 + 4 + 4) return;
    // token 字符串结束符
    let index = Math.min(buf.indexOf(0, 4), 128);
    let frPathIndex = Math.min(buf.indexOf(0, 4 + 128), 640);
    return {
        cmd: buf.readInt32LE(0),
        token: buf.toString('utf8', 4, index),
        fReadPath: buf.toString('utf8', 4 + 128, frPathIndex),
        offset: buf.readInt32LE(4 + 128 + 640),
        length: buf.readInt32LE(4 + 128 + 640 + 4)
    }
}

function getUniquePath(filePath) {
    let newpath = filePath;
    let num = 1;
    let first_part = filePath;
    let second_part;
    if (fs.existsSync(newpath)) {
        second_part = path.extname(newpath)
        first_part = path.dirname(newpath) + path.sep + path.basename(newpath, second_part)
    }
    while (fs.existsSync(newpath)) {
        newpath = first_part;
        newpath += `(${num})`;
        newpath += second_part;
        num++;
    }
    return newpath;
}

// 网络地址转换
function ntoa(n) {
    var myN = n;
    if (myN < 0) { //Try saving JavaScript from itself.  Yay crappy Javascript bitwise operators!
        myN = ((myN >>> 1) * 2) + (myN & 1);
    }
    if (myN < 0 || myN > 256 * 256 * 256 * 256) {
        console.error("Bad ntoa call with '" + myN + "'.");
        return false;
    }
    //The last Math.floor isn't strictly necessary, but it saves us from getting non-integers as inputs.
    return Math.floor(myN % 256) + '.' + Math.floor((myN / 256) % 256) + '.' + Math.floor((myN / 256 / 256) % 256) + '.' + Math.floor(myN / 256 / 256 / 256);
}


const P2PPorts = [7270, 7271, 7272, 7273, 7274, 7275, 7276, 7277, 7278, 7279, 7280, 7281, 7282, 7283, 7284, 7285, 7286, 7287, 7288, 7289];
let tcp_server = net.createServer();  // 创建 tcp server
let portIndex = 0;
let P2PPort = -1;


const init = Symbol('init');
const startServer = Symbol('startServer');
const dealConnect = Symbol('dealConnect');
const uploadFile = Symbol('uploadFile');

class P2PFileTransfer extends EventEmitter {
    constructor() {
        super();
    }

    [init]() {
        let that = this;
        // 处理客户端连接
        tcp_server.on('connection', function (socket) {
            console.log('tcp_server connection', socket.address());
            that[dealConnect](socket);
        })

        tcp_server.on('error', function (e) {
            console.log('tcp_server error!', e);
            if (e.code === 'EADDRINUSE') {
                console.log('地址正被使用, 重试中...');
                tcp_server.close();
                if (++portIndex >= P2PPorts.length) {
                    console.error('端口全部监听失败')
                    return;
                }
                that[startServer](P2PPorts[portIndex]);
            }
        })

        tcp_server.on('close', function () {
            console.log('tcp_server close!');
        })
    }

    [startServer](port) {
        // 监听 端口
        tcp_server.listen(port, '0.0.0.0', function () {
            P2PPort = port;
            console.log('tcp_server listening ', port);
        });
        return port;
    }

    // 处理每个客户端消息
    [dealConnect](socket) {
        let that = this;
        socket.on('data', function (data) {
            let msg = parseP2PMsg(data)
            console.log('received data %s msg: %s', data, msg);
            if (msg && msg.cmd === 2000) {
                // TODO: 收到文件请求，开始上传文件
                msg.socket = socket;
                socket.P2PMsg = msg
                that[uploadFile](msg);
            } else {
                socket.destroy();
            }
        })
        // 客户端断开时执行
        socket.on('close', function () {
            console.log('client disconneted!');
            that.emit('fileStatus', { token, fileStatus: FileStatus.remoteCanceled });
        })
        // 客户端正异常断开时执行
        socket.on('error', function (err) {
            console.log('client error disconneted!', err);
        })
    }

    // 上传文件
    [uploadFile]({ cmd, token, fReadPath, offset, length, socket }) {
        let that = this;
        this.emit('fileStatus', { token, fileStatus: FileStatus.uploading });
        if (fs.existsSync(fReadPath)) {
            let readable = fs.createReadStream(fReadPath)
            let size = fs.statSync(fReadPath).size;
            let sendedLength = 0;
            let paused = false;
            socket.on('drain', () => {
                console.log('drain')
                // readable.resume()
                paused = false
            })
            function readAndSend(stream, socket) {
                let chunk;
                if (paused) {
                    return
                }
                while (null !== (chunk = stream.read(DADA_PACKAGE_SIZE))) {
                    console.log(`读取文件 ${chunk.length} 字节的数据`);
                    break;
                }
                // 再取一下任务队列，如果被删除了就不再继续了
                if (socket.destroyed) {
                    // 连接断开，发送失败
                    console.log('网络断开或取消上传')
                    readable.destroy();
                    if (!socket.destroyed) {
                        socket.destroy();
                    }
                    return;
                } else {
                    let buf = chunk
                    if (!buf) {
                        return;
                    }
                    const f = socket.write(buf, () => {
                        console.log('send data length', buf.length);
                        sendedLength += buf.length;
                        if (sendedLength >= size) {
                            that.emit('progress', { token, progress: 100 })
                            that.emit('fileStatus', { token, fileStatus: FileStatus.uploadOk });
                            readable.destroy();
                            return
                        } else {
                            that.emit('progress', { token, progress: sendedLength * 100 / size })
                            readAndSend(stream, socket)
                        }
                    })
                    if (!f) {
                        console.log('socket.write return ', f)
                        paused = true
                    }
                }
            }
            readable.on('readable', () => {
                if (socket.destroyed) {
                    // 连接断开，发送失败
                    console.log('网络断开或取消上传')
                    readable.destroy();
                    return;
                }
                console.log('readble')
                readAndSend(readable, socket);
            })
            readable.on('end', () => {
                console.log('已没有数据');
                readable.destroy();
            })
        } else {
            that.emit('fileStatus', { token, fileStatus: FileStatus.uploadFailed });
            socket.end();
        }
    }

    startP2PServer() {
        this[init]();
        portIndex = 0;
        let port = this[startServer](P2PPorts[portIndex]);
        return port;
    }

    getPort() {
        return P2PPort;
    }

    // 下载文件
    P2PDownload(ip, port, token, fileReadPath, fileSize, fileWritePath) {
        let that = this;
        this.emit('fileStatus', { token, fileStatus: FileStatus.downloading });
        // 指定连接的tcp server ip，端口
        let options = {
            // host: ntoa(ip),
            host: ip,
            port
        }
        fileWritePath = getUniquePath(fileWritePath);
        let tcp_client = net.Socket(options);
        const w = fs.createWriteStream(fileWritePath);
        let receivedLength = 0;
        w.on('close', () => {
            console.log('recv file close')
            // 确认文件大小
            let size = fs.statSync(fileWritePath).size;
            if (fileSize === receivedLength && size === receivedLength) {
                that.emit('fileStatus', { token, fileStatus: FileStatus.downloadOk });
            } else {
                that.emit('fileStatus', { token, fileStatus: FileStatus.downloadFailed });
            }
        })

        w.on('finish', function () {
            console.log('写入完成。');
        });
        // 连接 tcp server
        tcp_client.connect(options, function () {
            console.log('connected to Server', ip, port);
            tcp_client.write(packageP2PMsg({ token, fReadPath: fileReadPath, length: fileSize }));
        })
        // 接收数据
        tcp_client.on('data', function (data) {
            console.log('received data length:', data.length);
            // 检测任务是否还在，以及状态是否被取消
            if (!fs.existsSync(fileWritePath)) {
                // 文件不存在或是自己取消
                that.emit('fileStatus', { token, fileStatus: FileStatus.fileNotExist });
                w.destroy();
                tcp_client.destroy();
            } else {
                receivedLength += data.length;
                that.emit('progress', { token, progress: receivedLength * 100 / fileSize });
                w.write(data)
                if (fileSize === receivedLength) {
                    w.end();
                }
            }
        })
        tcp_client.on('end', function () {
            console.log('data end!');
            // 处理对方取消的情况
            if (fs.existsSync(fileWritePath)) {
                if (fileSize === receivedLength) {
                    that.emit('fileStatus', { token, fileStatus: FileStatus.downloadOk });
                } else {
                    that.emit('fileStatus', { token, fileStatus: FileStatus.remoteCanceled });
                }
            }
        })
        tcp_client.on('error', function (err) {
            // 客户端异常
            console.log('tcp_client error!', err);
            w.end();
        })
    }

    // 取消上传
    cancelUpload() {

    }

    // 取消下载
    cancelDownload() {
        
    }
}

module.exports = new P2PFileTransfer();
