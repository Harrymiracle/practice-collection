import CryptoJS from 'crypto-js';
import icon from './images'
export default {
  install(Vue, options) {// 加密
      Vue.prototype.encrypt = function (msg,key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key)
        const encrypted = CryptoJS.TripleDES.encrypt(msg, keyHex, {
          iv: CryptoJS.enc.Utf8.parse('01234567'),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })
        return encrypted.toString()
      };
    Vue.prototype.avatarFormatter = function (src,targetType) {
      if (src) {
          if (src.substring(src.length-8)=='notFound' ||src.substring(src.length-6)=='media/') {
            if (targetType) {
              return icon.groupAvatar;
            } else {
              return icon.personAvatar;
            }
          }else {
            return src
          }
      } else {

        if (targetType) {
          return icon.groupAvatar;
        } else {
          return icon.personAvatar;
        }
      }
    };
    Vue.prototype.fileFormatter = function (link,n) { // 文件格式化
      let name = link.match(/media\/(.*)_/)[1];// 匹配/media和_之间的内容
      let suffix = link.substr(link.lastIndexOf("."));// 获取文件后缀名
      let fullName = name+suffix; // 显示的文件名
      if (n==1) { // 页面显示的名称
        return fullName;
      }else { // 链接地址
        let linkDirectory =link.substring(0,link.lastIndexOf("/")+1);
        return linkDirectory+fullName
      }
    };
    Vue.prototype.linkFormatter = function (link) { // 链接格式化
      let regExp = new RegExp('://', 'g');
      if (regExp.test(link)) {
        return link
      }else {
        return 'http://'+link // 没有协议的添加http协议
      }
    }

  }
}
