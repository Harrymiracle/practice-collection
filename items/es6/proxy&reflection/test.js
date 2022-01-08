const obj = {
    a: {
        b: {
            c: 'xiaoyun'
        }
    }
}

const obj1 = new Proxy(obj, {
    get (target, name) {    
        const keys = name.split('.')
        return keys.reduce((pre, next) => {
            if (pre !== null && pre !== undefined) {
                pre = pre[next]
            }
            return pre
        }, target)
    }
})
console.log(obj1['a.b.c']);     // xiaoyun

