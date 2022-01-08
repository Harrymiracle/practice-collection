/**
 * [$ description] 工具类
 * @type {[type]}
 * @author chencong
 */
const $ = require('jquery');
const tool =  {
    /**
     * [isJSON description] 是否为json
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    isJSON(obj){
        return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    },
    /**
     * [stringify description] 序列化
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    stringify(val){
        return val === undefined || typeof val === "function" ? val + "" : JSON.stringify(val);
    },
    /**
     * [deserialize description] 反序列化
     * @return {[type]} [description]
     */
    deserialize(value){
        if (typeof value !== "string") {
            return undefined;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            return value || undefined;
        }
    },
    /**
     * [isFunction description] 是否为func
     * @return {Boolean} [description]
     */
    isFunction(value){
        return {}.toString.call(value) === "[object Function]";
    },
    /**
     * [isArray description] 是否为数组
     * @return {Boolean} [description]
     */
    isArray(value){
        return value instanceof Array;
    },
    /**
     * [islocalStorage description] 浏览器是否支持localStorage
     * @return {[type]} [description]
     */
    islocalStorage(){
        return window.localStorage ? true : false;
    },
    /**
     * [setStore description] 设置 localStorage
     * @param  {[type]} key  [description]
     * @param  {[type]} value [description]  --->  单个  数组  {}
     * @return {[type]}       [description]
     */
    setStore(key,value){
		if(this.islocalStorage){
            if (key && !this.isJSON(key)) {
                window.localStorage.setItem(key, this.stringify(value));
            } else if (key && this.isJSON(key) && !value) {
                for (let a in key) this.setStore(a, key[a]);
            }
        }else{
            console.log('浏览器不支持localStorage(setStore)');
        }
    },
    /**
     * [getStore description] 获取某个localStorage值
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    getStore(key){
    	if(this.islocalStorage){
            if(!key){
                throw new Error('getStore参数不存在');
            }
    		return this.deserialize(window.localStorage.getItem(key));
    	}else{
            console.log('浏览器不支持localStorage(getStore)');
        }
    },
    /**
     * [delStore description] 删除某个 localStorage值
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    delStore(key){
    	if(this.islocalStorage){
            if(!key){
                throw new Error('delStore参数不存在');
            }
            window.localStorage.removeItem(key);
        }else{
            console.log('浏览器不支持localStorage(getStore)');
        }
    },
    /**
     * [clearStore description] 清空localStorage
     * @return {[type]} [description]
     */
    clearStore(){
        if(this.islocalStorage){
            window.localStorage.clear();
        }else{
            console.log('浏览器不支持localStorage(clearStore)');
        }
    },
    /**
     * [isPhone description] 验证是否为手机号
     * @param  {[type]}  phoneNo [description]
     * @return {Boolean}         [description]
     */
    isPhone(phoneNo){
        return /^1[3|4|5|7|8|][0-9]{9}$/.test(phoneNo);
    },
    /**
     * 获取url当中的参数
     * @param name
     * @returns {*}
     */
    getString(name){
        var after = window.location.hash.split("?")[1];
        if(after){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = after.match(reg);
            if(r != null){
                return  decodeURIComponent(r[2]);
            }else{
                 return null;
            }
        }
    }
};
module.exports = tool;