<template>
    <div class="weChat">
      <div class="menu">
        <Menu theme="dark" :active-name="$route.name">
          <MenuItem name="chatList" to="chatList">
            <img :src="$route.name === 'chatList'?icon.menuUserS:icon.menuUser" alt="">
          </MenuItem>
          <MenuItem name="adressList" to="adressList">
            <img :src="$route.name === 'adressList'?icon.menuAdressS:icon.menuAdress" alt="">
          </MenuItem>
        </Menu>
      </div>
      <div class="main">
        <div class="linkMan_detail">
          <div class="search">
            <Input prefix="ios-search" v-model="searchObj.value" placeholder="搜索姓名" @on-change="getSearchList()" />
            </Input>
          </div>
          <router-view name="menu" :searchObj="searchObj"></router-view>
        </div>
        <div class="main-content">
          <div class="chat">
            <div class="top">
              <div class="nickName" v-if="!isEmpty">{{ nickName }}
                <span style="color: #7D83A0" v-if="detailInfo.targetType === 1">({{ detailInfo.contactImAppAccount }})</span>
              </div>
              <div v-show="!isEmpty" class="userName">
                <div style="display: inline-block">&nbsp;
                  <div  class="nick_name">来自于&nbsp;&nbsp;{{ selfDetail.nick_name?selfDetail.nick_name:"" }}
                  </div>
                </div>
                <div class="noticeText">确保当前微信的设备保持亮屏状态</div>
                <Avatar :src="avatarFormatter(selfDetail.header_image)" style="margin-left: 7px;" size="large" shape="square" icon="md-person" />
              </div>
            </div>
            <div class="page">
              <router-view name="chat" :searchObj="searchObj"></router-view>
            </div>
          </div>
          <div class="info">
            <router-view name="info" :routeName="routeName"></router-view>
          </div>
        </div>
      </div>
      <Modal class="qrcodeModal"  v-model="qrcodeModal" @on-cancel="cancelqrcode" >
        <div class="clearfix" slot="header">
          <span class="headerTitle">App扫码同步</span>
          <Icon type="md-information-circle" size="16" color="#C3C6D6" />
          <span class="headerSubTitle">提示：请使用工作手机中的指掌易APP进行扫码</span>
        </div>
        <div class="qrcode">
          <div ref="qrcode" id="qrcode" ></div> <!-- 创建一个div，并设置id为qrcode -->
          <div class="qrcode_text">如果好友没有完全同步到后台，可以选择重新扫码同步好友</div>
        </div>
        <div slot="footer">
          <Button @click="cancelqrcode">关闭</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'  // 引入qrcode
    export default {
        name: "weChat",
        data() {
            return {
                searchObj:{
                    value:'',
                    name:"key",
                    operation:"LIKE",
                    type:"string"
                },
                timer:null,
                routeName:'',
                qrcodeModal:false,
                qrcodeConfig:{
                    width: 222,
                    height: 222,
                    text: '', // 二维码地址
                    colorDark : "#000",
                    colorLight : "#fff",
                },
          }
        },
        mounted() {
            this.routeName = this.$route.name
            if (this.searchObj.value) {
                this.$router.push({
                    name:'searchList'
                })
            } else {
                if (this.preRouteName !== 'searchList' && this.routeName === 'searchList') {
                    this.$router.push({
                        name:this.preRouteName
                    })
                }
            }
            this.$nextTick(function () {
                this.getChatList();
            })
        },
        methods: {
            qrcodeModalShow() {
                let loginInfo ={
                    customerId: this.loginInfo.staffId,
                    customerStaffName: this.loginInfo.userName,
                    customerLoginName: this.loginInfo.loginName,
                    url: this.$baseURL+"/uusafe/ucp/rest/autoallocation/distribution",
                    timestamp: new Date().getTime()
                }
                const key = 'uusafeuusafeuusafeuusafe'
                this.qrcodeConfig.text = this.encrypt(JSON.stringify(loginInfo), key)
                this.qrcode();
                this.qrcodeModal = true
            },
            cancelqrcode () {
                this.qrcodeModal =false;
                this.$refs.qrcode.innerHTML =''
                this.$store.state.showQrcode =false
            },
            qrcode() {
                let qrcode = new QRCode('qrcode', this.qrcodeConfig)
            },
            // 搜索框查询信息（好友、群组、聊天记录）
            getSearchList () {
                if (!this.searchObj.value) {
                    this.$store.state.isSearch = false
                }
                const promist = new Promise((resolve, reject) => {// 查询好友列表
                    this.$store.dispatch('getFriendsList',this.searchObj).then(data=>{
                        if (data) {
                            resolve(data)
                        }
                    })
                })
                const promist1 = new Promise((resolve, reject) => {// 群组信息
                    this.$store.dispatch('getGroupList',this.searchObj).then(data=>{
                        if (data) {
                            resolve(data)
                        }
                    })
                });
                Promise.all([promist, promist1]).then((resultList) => {
                    this.$store.commit('setSearchList',resultList)
                });

            },
            // 音频解码
            audioChange (source) {
                let data ={
                    source:source,
                    type:'mp3'
                }
                this.$store.dispatch('post',{url:'uusafe/mmba/rest/ffmpeg/audioChange',data}).then(res=>{
                });
            },
            getChatList () {
                new Promise(resolve=>{
                    this.$store.state.websock.onmessage =  (e) => {
                        try {
                            let obj =JSON.parse(e.data);
                            if (obj) {
                                this.$store.commit('reset');
                            }
                            if (obj.type === 'message') { // 接收的消息
                                this.$store.state.isImgError =true;
                                if (obj.data.targetImAppId === this.userInfo.targetImAppId && Number(obj.data.staffId) === Number(this.userInfo.staffId) && obj.data.staffIdInApp === this.userInfo.staffIdInApp ){ // 是当前聊天界面
                                    if (Number(obj.data.contentType) === 3) { // 消息为音频时
                                        this.audioChange(obj.data.chatContent); // 音频解码
                                        this.timer = setInterval(()=>{ // 5秒一次请求判断解码是否完成
                                            this.$store.dispatch('post',{url:'uusafe/mmba/rest/ffmpeg/check',data:{source:obj.data.chatContent}}).then(res=>{
                                                if (Number(res.code) === 200) {
                                                    clearInterval(this.timer);
                                                    this.$store.commit('updateMessage',obj.data);//解码成功后添加信息
                                                }
                                            });
                                        },5000);
                                    } else {
                                        this.$store.commit('updateMessage',obj.data);// 不是音频消息直接更新
                                    }
                                    if (Number(obj.data.direction) === 0) { // 从客户端的发送消息
                                        if (obj.data.reqId) {
                                            this.$store.commit('delMessage',obj.data.reqId); //删除本地添加的消息
                                        }
                                    }
                                    this.$store.state.recentChatList.map(val=>{ // 新消息直接更新最近消息列表
                                        if (val.targetImAppId === obj.data.targetImAppId && val.staffIdInApp === obj.data.staffIdInApp && Number(val.staffId) === Number(obj.data.staffId)) {
                                            val.chatContent = obj.data.chatContent;
                                            val.contentType = obj.data.contentType;
                                            val.createTime = obj.data.createTime
                                        }
                                    });
                                    this.$store.commit('updateRecentChatList',obj.data)
                                }else { // 不是当前聊天窗口时,
                                    this.$store.state.recentChatList.map(val=>{ // 最近消息列表增加未读消息
                                        if (val.targetImAppId === obj.data.targetImAppId && val.staffIdInApp === obj.data.staffIdInApp && Number(val.staffId) === Number(obj.data.staffId)) {
                                            val.unread+=1;
                                            val.chatContent = obj.data.chatContent;
                                            val.contentType = obj.data.contentType;
                                            val.createTime = obj.data.createTime
                                        }
                                    })
                                }
                            }else if (obj.type === 'reply') { // 发送消息失败的回执
                                this.$store.commit('setRetryStatus',obj.data.reqId);
                                this.$store.state.isImgError =true;
                            }else if (obj.type === 'logout') {
                                this.$Notice.error({
                                    title: '账号已在其他地方登录',
                                });
                                setTimeout(()=>{
                                    this.$store.commit('logout')
                                },1000)


                            }else {
                                //this.$store.state.messageList.pop();
                            }
                        }catch (e) {

                        }
                    };
                }).then(res=>{
                    if (res.length) {

                    }
                })


            }
        },
        computed:{
            nickName() {
                return this.$store.state.detailInfo.contactImAppNickName || this.$store.state.detailInfo.groupName
            },
            detailInfo () {
                return this.$store.state.detailInfo
            },
            loginInfo () {
                return this.$store.state.loginInfo
            },
            chatList () {
                return this.$store.state.recentChatList
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            preRouteName() {
                return this.$store.state.preRouteName
            },
            isEmpty() {
                return this.$store.state.isEmpty
            },
            selfDetail() {
                return this.$store.state.selfDetail
            },
            showQrcode() {
                return this.$store.state.showQrcode
            },
        },
        watch:{
            searchObj: {
                handler: function(newVal, oldVal) {
                    if (newVal.value) {
                        this.$router.push({
                            name:'searchList'
                        })
                    } else {
                        if (this.preRouteName !== 'searchList') {
                            this.$router.push({
                                name:this.preRouteName
                            })
                        }
                    }
                },
                deep: true
            },
            showQrcode(val) {
                if (val) {
                    this.qrcodeModalShow()
                } else {
                    this.$store.dispatch('getFriendsList',this.searchObj)
                    this.$store.dispatch('getGroupList',this.searchObj)
                }
            },
            $route:function(to,from) {
                if (to.name !== 'searchList') {
                    this.searchObj.value = ''
                }
                this.$store.state.preRouteName = from.name
                this.routeName = to.name
            }
        },
    }
</script>

<style lang="less">
  .qrcodeModal {
    .ivu-modal-header {
      border-bottom: 1px solid #e8eaec;
      .headerTitle {
        color: #959CB6;
        font-size: 15px;
        float: left;
      }
      .ivu-icon-md-information-circle {
        float: left;
        margin: 0 7px 0 10px;
      }
      .headerSubTitle {
        color: #434349;
        font-size: 12px;
        float: left;
        display: inline-block;
        margin-top: 2px;
      }
    }
    .ivu-modal-content {
      background: #fff;
      .qrcode {
        text-align: center;
        padding-top: 50px;
        #qrcode {
          img {
            margin: 0 auto;
          }
        }
        .qrcode_text {
          margin-top: 20px;
          margin-bottom: 60px;
          color: #434349;
          font-size: 13px;
        }
      }
    }
  }
.weChat {
  width: 1200px;
  height: 100%;
  min-height: 550px;
  margin: 0 auto;
  box-shadow:1px 2px 4px 1px rgba(0,0,0,0.04);
  background: #fff;
  .menu {
    height: 100%;
    padding-top: 60px;
    background: #353434;
    overflow: hidden;
    width: 70px;
    float: left;
    .ivu-menu {
      background: #353434;
      width: 100% !important;
      height: 100%;

      .ivu-menu-item {
        padding: 26px 19px 26px 17px;
        border-left: 2px solid #353434;
      }
      .ivu-menu-item-active:not(.ivu-menu-submenu),
      .ivu-menu-item-active:not(.ivu-menu-submenu):hover {
        background: rgba(250,196,15,0.13);
        border-left: 2px solid #FDBE32;
      }
      .ivu-menu-item:hover {
        background: rgba(250,196,15,0.13);
      }
    }
  }
  .main {
    height: 100%;
    width: 1130px;
    float: left;
    .linkMan_detail {
      float: left;
      width: 230px;
      height: 100%;
      border-right: 2px solid #F0F2F5;
      .search {
        box-sizing: content-box;
        padding: 14px 14px;
        .ivu-input {
          background: #F1F2F7;
          border-radius:2px;
          border: none;
        }
      }
      .ivu-tabs {
        height: calc(100% - 60px);
        .ivu-tabs-content {
          height: 100%;
        }
      }
      .ivu-tabs-bar {
        margin-bottom: 0;
        height: 0;
        border-bottom: 0;
      }
      .ivu-tabs-tabpane {
        height: 100%;
        overflow-y: auto;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background:#C3C6D6;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px #F7F8FA;
          border-radius: 5px;
          background: #fff;
        }
      }
      .ivu-tabs-nav-wrap {
        background: #FBFBFD;
        height: 60px;
        .ivu-tabs-ink-bar {
          display: none;
        }
        .ivu-tabs-nav {
          width: 100%;
          .ivu-tabs-tab {
            position: relative;
            width: 50%;
            margin:0;
            padding: 0;
            text-align: center;
            font-size: 16px;
            padding-top: 25px;
            .ivu-icon {
              font-size: 20px;
              position: absolute;
              top: 8px;
              left: calc( 50% - 10px) ;
            }
          }
        }

      }
    }
    .main-content {
      float: left;
      width: 900px;
      height: 100%;
      .chat {
        height: 100%;
        width: 600px;
        float: left;
        .top {
          height: 60px;
          background: #f9f9f9;
          line-height: 60px;
          padding: 0 20px;
          border-right: 2px solid #F0F2F5;
          border-bottom: 2px solid #F0F2F5;
          border-bottom-right-radius: 2px;
          font-size: 15px;
          color: #333;
          .nickName {
            font-weight: 600;
            display: inline-block;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .userName {
            float: right;
            position: relative;
            .nick_name {
              display: inline-block;
              max-width: 140px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 20px;
              line-height: 20px;
              margin-bottom: -5px;
            }
            .noticeText {
              position: absolute;
              color: #999;
              font-size: 12px;
              line-height: initial;
              left: -73px;
              top: 36px;
            }
          }
        }
        .page {
          height: calc( 100% - 60px);
          width: 100%;
        }
      }
      .info {
        width: 300px;
        height: 100%;
        float: left;
      }
    }
  }
}
</style>
