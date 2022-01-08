let data = {
    1: [
        { day: '2020-06-04', channel: 2, num: 6 },
        { day: '2020-06-05', channel: 2, num: 3 },
        { day: '2020-06-08', channel: 2, num: 70 }
    ],
    2: [
        { day: '2020-06-06', channel: 2, num: 50 },
        { day: '2020-06-09', channel: 3, num: 17 },
        { day: '2020-06-05', channel: 2, num: 3 }
    ],
    6: [
        { day: '2020-06-07', channel: 2, num: 09 }
    ],
    0: [
        { day: '2020-06-09', channel: 2, num: 16 },
        { day: '2020-06-03', channel: 1, num: 1 }
    ],
    8: '',
    9: {}
}

let dataArray = []

for (let key in data) {
    let temp = []
    if (data[key] && data.hasOwnProperty(key) && data[key].length) {
        temp = data[key].map(n => n.day)
        // temp = data[key].reduce((res, cur) => {
        //     res.push(cur.day)
        //     return res;
        // }, [])
    }
    dataArray = [...new Set(dataArray.concat(temp))]
}
dataArray = dataArray.sort((a, b) => {
    return (+new Date(a)) - (+new Date(b))
})

console.log(dataArray)

for (let key in data) {
    if (!Array.isArray(data[key])) {
        data[key] = []
    }
    data[key] = data[key].sort((a, b) => {
        return (+new Date(a.day)) - (+new Date(b.day))
    })
    dataArray.map((n, i) => {
        if (!data[key][i] || !data[key][i]['day'] || data[key][i]['day'] !== n) {
            data[key].splice(i, 0, { day: n, channel: 222, num: 666 })
        }
    })
}

console.log(data)