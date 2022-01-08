import axios from 'axios';
import qs from 'qs';
import iView from 'iview';
import store from '../store/index'
import $ from 'jquery'
var com =new Object();

com.getAuthorization =function (token, userID, orgCode) {
  const lastLoginTime = new Date().getTime();
  if (!token) {
    token = "";
  }
  if (!userID) {
    userID = store.state.loginInfo.userId
  }
  if (!orgCode) {
    orgCode = store.state.loginInfo.companyCode
  }
  const message = `${userID}|WEB|deviceId|${token}|${lastLoginTime}|appVer|${orgCode}`
  const key = 'uusafeuusafeuusafeuusafe'
  return vm.encrypt(message, key)
}

com.ajax = axios.create({
  timeout: 30000,
});

// 添加请求拦截器
com.ajax.interceptors.request.use( config => {
  var extra={ // 添加额外参数
    currentPage:1,
    pageSize:1000
  };
  iView.LoadingBar.start();
  if (config.url !='uusafe/ucp/auth/rest/authByLoginName') {
    if (store.state.time <= 0 ||sessionStorage.getItem('time') ==0) {
      iView.Notice.warning({
        title: '登录超时，请重新登陆！',
      });
      store.commit('logout');
    }
    if (config.url =='uusafe/ucp/chat/rest/queryForChatHistory') {
      config.headers.Authorization = com.getAuthorization('',store.state.loginInfo.staffId,'');
    }else {
      config.headers.Authorization = com.getAuthorization();
    }
  }else {
    store.state.time =60*60*24
  };

    switch (config.method) {
      case 'get':
        if (config.params) {
          if (config.params.currentPage) {
            extra.currentPage = config.params.currentPage
            extra.pageSize = config.params.pageSize
          };
        }

       config.params = Object.assign({},extra,config.params);

        break;
      case 'post':
        if (config.data) {
          if (config.data.currentPage) {
            extra.currentPage = config.data.currentPage
            extra.pageSize = config.data.pageSize
          };
        }

        if (config.url =='uusafe/ucp/auth/rest/authByLoginName') {
            extra ={}
        }
        let obj = Object.assign({},extra,config.data);
        config.data = qs.stringify(obj);// 转换formdata格式
        break;
      default:
        break;
    }
    return config;
  }
);
// 响应拦截器
com.ajax.interceptors.response.use((res) => {
    iView.LoadingBar.finish();
      if (res.status ==200) {
        if (res.data.data) {
          try {
            if (typeof res.data.data =='string') {
              return JSON.parse(res.data.data)
            }else {
              return res.data.data
            }
          }catch (e) {

          }

        } else {
        }
          return res.data
      }
  },
  error => {
    return Promise.reject(error);
  }
);
export default com;
