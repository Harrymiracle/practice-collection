/**
 * Created by linxin on 2017/3/11.
 */
const localEvent = function (item) {
    this.get = function () {
        let theItem = localStorage.getItem(item);
        return theItem ? JSON.parse(theItem) : '';
    }
    this.set = function (obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
        localStorage.removeItem(item);
    }
}

export const local = new localEvent('lx_notepad');
export const theme_local = new localEvent('lx_theme');
export const getDate = () => { //获取当天日期
    const date = new Date(),
        mouth = parseInt(date.getMonth()) + 1;
    return date.getFullYear() + '-' + mouth + '-' + date.getDate();
}