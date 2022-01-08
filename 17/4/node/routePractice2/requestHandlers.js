/**
 * Created by Administrator on 2017/4/7.
 */

function start() {
    console.log("Request handler 'start' was called.");
    return "Hello Start";
}

function upload() {
    console.log("Request handler 'upload' was called.");
    return "Hello Upload";
}

exports.start = start;
exports.upload = upload;

