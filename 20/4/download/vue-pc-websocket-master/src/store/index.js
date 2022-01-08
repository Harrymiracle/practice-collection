import Vue from 'vue';
import Vuex from 'vuex';
import com from '../commons/com'
import Cookies from  'js-cookie'
import router from "../router";
import CreatePersistedState from 'vuex-persistedstate'

Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    userInfo:{},// 列表点击项的信息
    recentChatList:[],// 最近聊天列表
    messageList:[], // 聊天消息列表
    userName:'',
    loginInfo:{},// 登录信息
    groupMemberList:[],// 群成员列表
    isClean:false,// 是否清楚群成员搜索信息
    images:[],//图片查看大图
    detailInfo:{},// 好友或群资料信息
    searchList:[],// 联系人查询列表
    isEmpty:false, // 最近聊天列表是否是空
    selfDetail:{}, // 个人信息
    time:60*60*24,//  登录无操作24小时限定
    expressionContent:{}, // 常用语内容
    lockReconnect: false,//是否真正建立连接
    timeout: 28*1000,//30秒一次心跳
    timeoutObj: null,//心跳心跳倒计时
    serverTimeoutObj: null,//心跳倒计时
    timeoutnum: null,//断开 重连倒计时
    friendList:[], // 所有好友列表
    groupList:[], // 所有群 列表
    showQrcode:false, // 显示二维码状态
    messageLength:40, // 记录点击加载消息的pageSize
    chatHistoryList:[],// 消息历史记录
    showMoreText:false, // 点击加载消息列表 是否全部加载完毕
    scrollToBottom:1, // 聊天窗口是否滚动到最底部 1/2/3 1为最底部 2为聊天记录上一次加载位置 3为最顶部
    preRouteName:'chatList', // 上一次路由 默认为聊天列表
    groupMemberAllList:[] // 所有群成员列表 为了查找我在本群中的昵称
  },
  mutations:{
    reconnect(state) {//重新连接
      if(state.lockReconnect) {
        return;
      };
      //没连接上会一直重连，设置延迟避免请求过多
      state.timeoutnum && clearTimeout(state.timeoutnum);
      state.timeoutnum = setTimeout(()=> {
        //新连接
        store.commit('initWebSocket');
      },5000);
    },
    reset(state){//重置心跳
      //清除时间
      clearTimeout(state.timeoutObj);
      clearTimeout(state.serverTimeoutObj);
      //重启心跳
      store.commit('start');
    },
    start(state){//开启心跳
      state.timeoutObj && clearTimeout(state.timeoutObj);
      state.serverTimeoutObj && clearTimeout(state.serverTimeoutObj);
      state.timeoutObj = setTimeout(function(){
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (state.websock.readyState == 1) {//如果连接正常
          state.websock.send("heartCheck");
          state.lockReconnect = true;
          store.commit('reset');
        }else{//否则重连
          state.lockReconnect = false;
          store.commit('reconnect');
        }
        state.serverTimeoutObj = setTimeout(function() {
          //超时关闭
          state.websock.close();
        }, state.timeout);

      }, state.timeout)
    },
    initWebSocket(state){ //初始化weosocket
      const wsuri =vm.$webSocket+"/uusafe/ucp/chat.sc?customerId="+state.loginInfo.staffId+"&companyCode="+state.loginInfo.companyCode+"&type=pc";
      state.websock = new WebSocket(wsuri);
      state.websock.onopen =()=>{ // 连接成功
        console.log('WebSocket连接成功！');
        store.state.lockReconnect = true;
        //开启心跳
        store.commit('start');
      }
      state.websock.onerror=()=>{ // 连接失败
        state.websock=null
        //错误
        console.log('WebSocket连接发生错误！');
        store.state.lockReconnect = false;
        //重连
        store.commit('reconnect');
      }
      state.websock.onclose=(e)=>{ // 连接关闭
        console.log("connection closed (" + e.code + ")");
        store.state.lockReconnect = false;
        store.state.websock = null
        //重连
        if (Object.keys(state.loginInfo).length) {
          store.commit('reconnect');
        }
      }
    },
    websocketsend(state,Data){//数据发送
      state.websock.send(JSON.stringify(Data));
    },
    websocketclose(state,e){  //关闭
      state.websock.close();
    },
    logout (state) {// 退出登录
      state.loginInfo ={}
      state.userInfo = {}
      state.detailInfo = {}
      state.selfDetail = {}
      router.push({
        name: "login"
      });
      store.commit('websocketclose');
    },
    setExpressionContent (state,content) {// 存储常用语信息
      state.expressionContent = content;
    },
    setSearchList (state,list) { // 联系人查询列表
      state.searchList = list;
    },
    setLoginInfo (state,loginInfo) { // 存储登录信息
      state.loginInfo = loginInfo
    },

    setUserInfo (state,userInfo) { // 存储用户信息
      state.userInfo = userInfo;
    },
    // 设置好友列表
    setChatUserList (state,list) {
      state.chatUserList = list;
    },
    setMessage (state, message) { // 存储消息列表
      state.messageList=message;
      state.images=[];
      message.map(item=>{ // 获得消息列表中的所有图片
        if (item.contentType ==2) {
          state.images.push(item.chatContent)
        }
      });
    },
    updateMessage (state, message) {// 更新消息
      if (message.esId) {
        state.messageList.map(val=>{
          if (val.esId == message.esId) {//  信息去重
            state.messageList.splice(state.messageList.indexOf(val),1)
          }
        })
      }

      state.messageList.push(message);
      state.scrollToBottom = 1;
      if (message.contentType ==2) {
        state.images.push(message.chatContent)
      }
    },
    // 获取最近联系人
    setRecentChatList (state,list) {
      state.recentChatList =list;
    },
    // 更新最近联系人
    updateRecentChatList (state,message) {
      if (message) {
        let person =  state.recentChatList.find(val=>{
          return message.targetImAppId === val.targetImAppId && message.staffIdInApp === val.staffIdInApp;
        });
        state.recentChatList.splice(state.recentChatList.indexOf(person),1);
        state.recentChatList.unshift(person);
      } else {
        let person = state.recentChatList.find(item=>{
          return item.staffIdInApp === state.detailInfo.staffIdInApp && item.targetImAppId === state.detailInfo.targetId
        });
        if (person) { // 判断最近联系人 是否存在通讯录点击的联系人
          state.recentChatList.splice(state.recentChatList.indexOf(person),1) // 删除最近联系人相同项
          state.recentChatList.unshift(person); // 并添加到第一位
        } else { // 如果不存在
          let obj={
            deviceId:Number(state.detailInfo.deviceId),
            staffIdInApp: state.detailInfo.staffIdInApp,
            targetImAppId: state.detailInfo.targetId,
            unread: 0,
            staffId:Number(state.detailInfo.staffId),
            targetId:state.detailInfo.targetId,
            staffImNickName:state.detailInfo.staffImNickName,
            targetType: state.detailInfo.targetType,
            name: state.detailInfo.name,
            headerPic: state.detailInfo.headerPic
          };
          if (state.detailInfo.targetType === 1) {
            obj.targetheadImage = state.detailInfo.headerPic
            obj.targetImAppNickName = state.detailInfo.name
          } else {
            obj.groupHeaderPic = state.detailInfo.headerPic
            obj.groupName = state.detailInfo.name
          }
          state.recentChatList.unshift(obj) // 向最近联系人列表添加第一个
        }
      }
    },

    // 群成员列表
    setGroupMemberList (state,list) {
      state.groupMemberList = list;
    },
    setDetailInfo (state,detailInfo) {
      state.detailInfo = detailInfo
    },
    setRetryStatus (state,reqId) {// 显示重新发送
      state.messageList.map(val => {
        if (val.reqId == reqId) {
          vm.$set(val,'isShowRetry',true);
        }
      })
    },
    delReSendMessage (state,reqId) { // 删除重发信息原信息
      let obj={};
      state.messageList.map(val=>{
        if (val.reqId == reqId) {
          obj = val
        };
        state.messageList.splice(state.messageList.indexOf(obj),1);
      });

    },
    // 发送成功删除本地添加的消息
    delMessage (state,reqId) {
      let arr=[]
      state.messageList.map(val=>{
        if (val.reqId == reqId) {
          arr.push(val)
        };
      });
      if (arr.length>1) {
        state.messageList.splice(state.messageList.indexOf(arr[0]),1);
      }
    },
    setSelfDetail (state,row) {
      state.selfDetail = row;
    },
    setFriendList(state,list) {
      state.friendList = list
    },
    setGroupList(state,list) {
      state.groupList = list
    }
  },
  actions:{
    get (state ,options) {
     let url = 'uusafe/ucp/rest/';
     if (options.url =='uusafe/ucp/auth/rest/authByLoginName' || options.url =="uusafe/ucp/chat/rest/queryForChatHistory") {
       return com.ajax.get(options.url,{ params: options.params});
     }else {
       return com.ajax.get(url+options.url,{ params: options.params});
     }
    },
    post(state,options) {
      let url = 'uusafe/ucp/rest/';
      if (options.url =='uusafe/ucp/auth/rest/authByLoginName' || options.url =="uusafe/ucp/chat/rest/queryForChatHistory" || options.url =='uusafe/mmba/rest/ffmpeg/audioChange' || options.url =='uusafe/mmba/rest/ffmpeg/check') {
        return com.ajax.post(options.url,{},{ data: options.data})
      }else {
        return com.ajax.post(url+options.url,{},{ data: options.data})
      }

    },
    // 获取聊天消息列表
    getMessageList(store,searchData) {
      store.state.chatHistoryList =[];
      store.state.showMoreText = false
      store.state.scrollToBottom = 1
      let params={
        entityName: 'AccBusinessCommunicateDetailClient',
        condition: '',
        currentPage:1,
        pageSize:20,
        order: "createTime desc",
        queryAttrs: "targetheadImage;staffName;orgName;appName;staffImAppAccount;targetType;targetImAppNickName;bookMark;groupName;direction;chatContent;contentType;createTime;isSelf;status;reqId;deviceId;staffId"
      };
      if (typeof searchData === 'number') {
        params.pageSize = searchData
      }
      let arr=[
        {name:"customerId",operation:"NE",type:"numeric",value:0},
        {name:"targetImAppId",operation:"EQ",type:"string",value:store.state.userInfo.targetImAppId},
        {name:"staffIdInApp",operation:"EQ",type:"string",value:store.state.userInfo.staffIdInApp},
        {name:"staffId",operation:"EQ",type:"numeric",value:store.state.userInfo.staffId},
        {name:"deviceId",operation:"EQ",type:"numeric",value:store.state.userInfo.deviceId},
        {name:"status",operation:"IN",type:"numeric",value:[0,1]}
      ];
      if (typeof searchData === 'object') {
        params.pageSize = searchData[0].pageSize
        searchData.shift()
        arr = arr.concat(searchData)
      }
      params.condition = JSON.stringify(arr);
      return new Promise(resolve => {
        store.dispatch('get',{url:'business/queryForDetail',params}).then(res=>{
          if (res.result) {
            res.result.length && res.result.forEach(ele => {
              if (Number(ele.contentType) === 1) {
                let rep = new RegExp('<a href="weixin://findfriend/verifycontact">发送朋友验证</a>')
                ele.chatContent = ele.chatContent.replace(rep,'')
              } else if (Number(ele['contentType']) === 384) {
                let jsonVal
                try {
                  jsonVal = typeof ele['chatContent'] === 'string' ? JSON.parse(ele['chatContent']) : ele['chatContent']
                } catch (e) {
                  jsonVal = []
                  const location = ele['chatContent'].split('|')
                  jsonVal[0] = location[4]
                  jsonVal[1] = location[3]
                  jsonVal[2] = location[0]
                  jsonVal[3] = location[1]
                  jsonVal[4] = location[2]
                  console.error(e)
                }
                ele['chatContent'] = jsonVal
              }else if (Number(ele['contentType']) === 32) { //聊天内容名片
                ele['chatContent'] = typeof ele['chatContent'] === 'string' ? JSON.parse(ele['chatContent']) : ele['chatContent']
              }
            })
            if (typeof searchData === 'object') { // 历史消息列表
              let searchValue = searchData.filter(item=>{
                return item.operation === 'LIKE'
              })[0]
              store.state.chatHistoryList = res.result
              if (searchValue && searchValue.value) {
                let regExp = new RegExp(searchValue.value, 'g');
                store.state.chatHistoryList.map(val=>{
                  val.chatContent =val.chatContent.replace(regExp, "<span style='color:#f5a623'>" + searchValue.value + '</span>');
                })
              }
            } else {
              if (typeof searchData === 'number') { // 聊天加载更多
                store.state.messageLength = res.result.length+20;
                store.state.scrollToBottom = 2
                if (searchData >= res.totalRecord) {
                  store.state.messageLength = searchData;
                  store.state.showMoreText = true
                }
              } else { // 第一次进入聊天界面
                if (res.totalRecord <= 20) {
                  store.state.showMoreText = true
                  store.state.scrollToBottom = 1
                }
              }
              store.commit('setMessage',res.result.reverse());
            }
            resolve(res.result)
          }
        });
      })

    },
    // 获取 最近联系人列表
    getChatList(store) {
      return new Promise(resolve => {
        store.dispatch('get',{url:'uusafe/ucp/chat/rest/queryForChatHistory'}).then(res=>{
          if (res) {
            if (res.result.length) {
              res.result.forEach(item=>{
                item.tagetId = item.targetImAppId
                item.headerPic = Number(item.targetType) === 1?item.targetheadImage:item.groupHeaderPic
                item.name =item.groupName || item.targetImAppNickName
              })
            }else {
              store.state.isEmpty =true;
            }
            store.commit('setRecentChatList',res.result);
            resolve(res.result)
          }else {
            store.state.isEmpty =true;
          }
        });
      })
    },
    // 获取所有联系人列表
    getFriendsList(store,searchObj) {
      return new Promise(resolve => {
        let params={
          entityName: 'AccFriendlistDetailClient',
          condition: '',
          queryAttrs: 'contactImAppNickName;contactImAppHeaderPic;contacImAppNote;contactImIdInApp;contactImAppAccount;deviceId;staffIdInApp;staffId'
        };
        let arr=[
          {name:"customerId",operation:"EQ",type:"numeric",value:Number(store.state.loginInfo.staffId)},
          {name:"status",operation:"IN",type:"numeric",value:[1,3]},
          {name:"isFriend",operation:"EQ",type:"numeric",value:1}
        ];
        if (searchObj.value) {
          arr.push(searchObj);
        }
        params.condition = JSON.stringify(arr);
        store.dispatch('get',{url:'business/queryForDetail',params}).then(res=>{
          if (res.result) {
            res.result.forEach(item=>{
              item.tagetId = item.contactImIdInApp;
              item.headerPic = item.contactImAppHeaderPic;
            })
            store.commit('setFriendList',res.result);
            resolve(res.result)
          }
        });
      })
    },
    // 获取所有群列表
    getGroupList(store,searchObj) {
      return new Promise(resolve => {
        let params={
          entityName: 'AccGrouplistDetailClient',
          condition: '',
          queryAttrs: 'groupImIdInApp;groupName;groupNote;groupHeaderPic;notice;groupMemberCount;deviceId;staffIdInApp;staffId'
        };
        let arr=[
          {name:"customerId",operation:"EQ",type:"numeric",value:Number(store.state.loginInfo.staffId)},
          {name:"isDelete",operation:"EQ",type:"numeric",value:0}
        ];
        if (searchObj.value) {
          arr.push(searchObj);
        }
        params.condition = JSON.stringify(arr);
        store.dispatch('get',{url:'business/queryForDetail',params}).then(res=>{
          if (res.result) {
            res.result.forEach(item=>{
              item.tagetId = item.groupImIdInApp;
              item.headerPic = item.groupHeaderPic;
            })
            store.commit('setGroupList',res.result);
            resolve(res.result)
          }
        });
      })
    },
    // 好友详细信息
    getDetailInfo(store) {
      let params={
        entityName: 'AccFriendlistDetailClient',
        condition: '',
        queryAttrs: 'contactImAppNickName;contactImAppHeaderPic;contacImAppNote;contactImIdInApp;contactImAppAccount;deviceId;staffIdInApp;staffId'
      };
      let arr=[
        // {name:"customerId",operation:"EQ",type:"numeric",value:Number(this.$store.state.loginInfo.staffId)},
        {name:"status",operation:"IN",type:"numeric",value:[1,3]},
        {name:"isFriend",operation:"EQ",type:"numeric",value:1},
        {name:"contactImIdInApp",operation:"EQ",type:"string",value:store.state.userInfo.targetId},
        {name:"staffIdInApp",operation:"EQ",type:"string",value:store.state.userInfo.staffIdInApp}
      ];
      params.condition = JSON.stringify(arr);
      store.dispatch('get',{url:'business/queryForDetail',params}).then(res=>{
        if (res.result) {
          res.result.map(item=>{
            item.targetId = item.contactImIdInApp
            item.headerPic = item.contactImAppHeaderPic
            item.name = item.contactImAppNickName
            item.targetType = 1
          })
          store.commit('setDetailInfo',res.result[0]);
        }
      });
    },
    // 获取群组信息
    getGroupInfo(store) {
      let params={
        entityName: 'AccGrouplistDetailClient',
        condition: '',
        queryAttrs: 'groupImIdInApp;groupName;groupNote;groupHeaderPic;notice;groupMemberCount;deviceId;staffIdInApp;staffId'
      };
      let arr=[
        {name:"customerId",operation:"EQ",type:"numeric",value:Number(store.state.loginInfo.staffId)},
        {name:"isDelete",operation:"EQ",type:"numeric",value:0},
        {name:"groupImIdInApp",operation:"EQ",type:"string",value:store.state.userInfo.targetId},
      ];
      params.condition = JSON.stringify(arr)
      store.dispatch('get',{url:'business/queryForDetail',params}).then(res=>{
        if (res) {
          res.result.map(item=>{
            item.targetId = item.groupImIdInApp
            item.headerPic = item.groupHeaderPic
            item.name = item.groupName
            item.targetType = 0
          })
          store.commit('setDetailInfo',res.result[0]);
        }
      });
    },
    // 获取个人信息
    getSelfInfo(store) {
      let params={
        entityName: 'AccAccountDetail',
        condition: '',
        queryAttrs: 'ser_name;org_name;account;app_name;nick_name;header_image;mobile;sex;area;signature;event_time'
      };
      let arr=[
        {name:"staffIdInApp",operation:"EQ",type:"string",value:store.state.userInfo.staffIdInApp},
        {name:"pub_user_id",operation:"EQ",type:"numeric",value:store.state.userInfo.staffId},
      ];
      params.condition = JSON.stringify(arr)
      store.dispatch('get',{url:'business/queryForDetail',params}).then(data=>{
        if (data) {
         store.commit('setSelfDetail',data.result[0]);
        }
      });
    },
    // 获得群成员列表
    getGroupMemberList(store,searchObj) {
      let params={
        entityName: 'queryForMembersClient',
        condition: '',
      };
      let arr=[
        {name:"groupImIdInApp",operation:"EQ",type:"string",value:store.state.userInfo.targetId},
        {name:"staffId",operation:"EQ",type:"numeric",value:store.state.userInfo.staffId},
        {name:"deviceId",operation:"EQ",type:"numeric",value:store.state.userInfo.deviceId},
      ];
      if (searchObj && searchObj.value) {
        arr.push(searchObj);
      }
      params.condition = JSON.stringify(arr);
      store.dispatch('get',{url:'business/queryForDetail',params}).then(res=>{
        if (res.result) {
          store.commit('setGroupMemberList',res.result);
          if (!searchObj) {
            store.state.groupMemberAllList = res.result;
          } else {
            if (searchObj && searchObj.value) {
              let regExp = new RegExp(searchObj.value, 'g');
              store.state.groupMemberList.map(val=>{
                val.nickName =val.nickName.replace(regExp, "<span style='color:#f5a623'>" + searchObj.value + '</span>');
              })
            }
          }

          store.state.isClean = true;
        }
      });
    }
  },
  plugins: [CreatePersistedState({
    storage: window.sessionStorage,
    reducer(state) {
      return {
        loginInfo: state.loginInfo,
        userInfo:state.userInfo,
        detailInfo:state.detailInfo,
        selfDetail:state.selfDetail,
        preRouteName:state.preRouteName
      }
    }
  })]
});
export default store;
