'use strict'

function dedupe (client, hasher) {
    //JSON.stringify 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
    //此处的hasher为一个过滤项，如果传入了过滤标准就使用过滤标准，如果没有传入就使用JSON.stringify方法
    hasher = hasher || JSON.stringify

    const clone = []
    const lookup = {}

    for (let i = 0, len = client.length; i < len; i++) {
        //elem为client中的当前项
        let elem = client[i]
        //使用默认的 hasher 时 hashed 为当前项的值转换为JSON字符串格式
        //使用传入的过滤对象时，hashed为当前项中的过滤对象
        let hashed = hasher(elem)

        //查找lookup字典中是否有该hashed的key值，注意：在上面是转换成字符串格式的，因此{}，{}这两个会被视为一个键
        if (!lookup[hashed]) {
            clone.push(elem)
            lookup[hashed] = true
        }
    }

    return clone
}

module.exports = dedupe