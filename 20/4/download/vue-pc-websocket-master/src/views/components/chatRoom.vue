<template>
    <div class="chatRoom">
      <div class="content">
        <div v-if="!messageList.length" class="chatList" ref="chatList" style="text-align: center;padding-top: 21vh;">
          <img :src="icon.noContent" alt="">
          <div>暂无内容~</div>
        </div>
        <div v-else class="chatList" ref="chatList" v-scroll-bottom="scrollToBottom">
          <div style="text-align: center">
            <a v-show="!showLoading && !showMoreText" href="JavaScript:;" @click="handleReachTop" style="color: #434349;display: inline-block;padding: 6px 14px;background: #fff;border-radius: 2px;">
              <img style="margin-bottom: -2px;margin-right: 2px;" :src="icon.loadingMore" alt="">
              <span>点击加载更多</span>
            </a>
            <div v-show="showLoading">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>加载中...</div>
            </div>
            <div style="color: #434349;display: inline-block;padding: 6px 14px;background: #fff;border-radius: 2px;" v-show="showMoreText && messageList.length > 20">别点了，没有啦</div>
          </div>
          <template v-for="(item,index ) in messageList">
            <template  v-if="Number(item.isSelf) === 1 && Number(item.contentType) === 1">
              <div class="messageList sysMessageList" style="text-align: center" v-html="item.chatContent"></div><!--系统消息-->
            </template>
            <template  v-else >
              <div class="messageList" v-if="!isEmpty" :class="Number(item.direction) === 0?'me':'other'">
                <div style="text-align: center;margin: 5px 0 10px;" v-if="showTime(item.createTime,index)">{{ showTimeFormatter(item.createTime) }}</div><!--显示间隔时间-->
                <Avatar size="large" shape="square" icon="md-person" :src="Number(item.direction) === 1?avatarFormatter(item.targetheadImage):avatarFormatter(selfDetail.header_image)" /> <!--头像显示-->
                <div style="padding-left: 50px;margin-bottom: 5px;" v-if="Number(item.direction) ===1 && Number(item.targetType) === 0">{{item.targetImAppNickName}}</div><!--群组聊天显示昵称-->
                <div style="padding-right: 50px;margin-bottom: 5px;" v-if="Number(item.direction) ===0 && userInfo.customerStaffName">
                  <span>客服-{{ userInfo.customerStaffName }}</span>
                  <span>({{ userInfo.customerLoginName  }})</span>
                </div><!--客服用户名姓名-->
                <img :src="icon.warning" v-if ="(item.isShowRetry || Number(item.status) === 1) && Number(item.direction) === 0" style="width: 16px;margin-bottom: -3px;margin-right:5px;" @click="reSendMessage(item)" /><!--显示重发图标-->
                <template v-if="Number(item.contentType) === 1||Number(item.contentType) === 114||Number(item.contentType) === 115||Number(item.contentType) === 116"><!--聊天内容文本-->
                  <pre :class="Number(item.direction) === 0?'me-message':'other-message'" v-html="item.chatContent.replace(/\[[^\]]+\]/g,emotion)" class="message"></pre>
                </template>
                <template v-else-if="Number(item.contentType) === 2"><!--聊天内容图片-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" style="padding:0;background: #f9f9f9" >
                    <img v-if="item.chatContent.substring(item.chatContent.length-8) === 'notFound'" :src="icon.notFound"  style="cursor:pointer;max-width: 120px;" @click="showBigPic($event)">
                    <img v-else :src="item.chatContent.substring(item.chatContent.lastIndexOf('.')) !== '.jpg'?item.chatContent+'.jpg':item.chatContent"  style="cursor:pointer;max-width: 120px;" @click="showBigPic($event)">
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 3"><!--聊天内容语音-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" style="padding: 5px 12px" >
                    <m-audio  :src="item.chatContent.replace(/\.\w+$/,'')+'.mp3'" text="" :show-duration="true"></m-audio>
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 4"><!--聊天内容视频-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" style="padding: 0;height: 80px;" >
                    <img :src="icon.video" @click="videoShow(item.chatContent)" width="120" height="80" style="border-radius: 2px;cursor: pointer;" alt="">
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 5 "><!--聊天内容文件-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" style="white-space: normal;background: #fff;min-width: 180px;">
                    <span v-if="item.chatContent.substring(item.chatContent.length-8) === 'notFound'">对方给你发送一个文件，该版本不支持查看</span>
                    <div v-else>
                      <div class="clearfix" style="display: block;padding-bottom: 10px;border-bottom: 1px solid #F1F2F7;">
                        <img style="float: left;" :src="icon.download" alt="">
                        <span style="float: left;margin: 8px 0 8px 12px;color: #343434;">{{ fileFormatter(item.chatContent,1) }}</span>
                      </div>
                      <a target="_blank" style="display: block;text-align: center;padding-top: 10px;color: #343434;" :href="fileFormatter(item.chatContent,2)">下载</a>
                    </div>
                  </div>
                </template>
                <template v-else-if=" Number(item.contentType) === 7 || Number(item.contentType) === 113"><!--聊天内容语音电话-->
                  <pre :class="Number(item.direction) === 0?'me-message':'other-message'" class="message">语音通话:已结束</pre>
                </template>
                <template v-else-if="Number(item.contentType) === 272"><!--聊天内容红包-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" style="padding: 0;">
                    <div class="redPackage">
                      <div class="redPackage_1 clearfix" :style="{background: (Number(item.direction) === 0 && item.chatContent.indexOf('红包金额') > -1) || (Number(item.direction) === 1 && item.chatContent.split('|').length>1 && item.chatContent.indexOf('红包金额') < 0)?'rgba(241,94,72,1)':'rgba(241,94,72,.5)'}">
                        <img style="float: left;" :src="(Number(item.direction) === 0 && item.chatContent.indexOf('红包金额') > -1) || (Number(item.direction) === 1 && item.chatContent.split('|').length>1 && item.chatContent.indexOf('红包金额') < 0)?icon.redPackage:icon.redPackageOpen" alt="">
                        <div v-if="(Number(item.direction) === 0 && item.chatContent.indexOf('红包金额') > -1) || (Number(item.direction) === 1 && item.chatContent.split('|').length>1 && item.chatContent.indexOf('红包金额') < 0)" style="float: left;display: inline-block;margin-top: 8px;margin-left: 9px;font-size: 12px;">{{ item.chatContent.split('|')[1] || '恭喜发财，大吉大利' }}</div>
                        <div v-else style="display: inline-block;margin-left: 9px;">
                          <div>{{ item.chatContent.split('|')[0] }}</div>
                          <div>已被领完</div>
                        </div>
                      </div>
                      <div class="redPackage_2">红包</div>
                    </div>
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 352 "><!--聊天内容转账-->
                  <div :class="Number(item.direction) ===0?'me-message':'other-message'" class="message" style="padding: 0;">
                    <div class="redPackage" v-if="Number(item.direction) ===0 && item.chatContent.match(/转账金额(\S*)元/) ">
                      <div class="redPackage_1 clearfix" :style="{background:'rgba(241,94,72,1)'}">
                        <img :src="icon.transfer" style="float: left;" alt="">
                        <div class="transferText">
                          <div>{{ item.chatContent }}</div>
                        </div>
                      </div>
                      <div class="redPackage_2">转账</div>
                    </div>
                    <div class="redPackage" v-else>
                      <div class="redPackage_1 clearfix" :style="{background:item.chatContent.match(/转账给你(\S*)元/)?'rgba(241,94,72,1)':'rgba(241,94,72,.5)'}">
                        <img :src="item.chatContent.match(/转账给你(\S*)元/)?icon.transfer:icon.transferOpen" style="float: left;" alt="">
                        <div v-if="item.chatContent.match(/转账给你(\S*)元/)" class="transferText">
                          <div>{{ '￥'+item.chatContent.match(/转账给你(\S*)元/)[1] }}</div>
                          <div>{{ item.chatContent.match(/转账给你/)[0] }}</div>
                        </div>
                        <div v-else class="transferText">
                          <div>{{ item.chatContent }}</div>
                          <div>已被领取</div>
                        </div>
                      </div>
                      <div class="redPackage_2">转账</div>
                    </div>
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 273"><!--聊天内容链接-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" style="padding: 0;">
                    <template v-if="typeof item.chatContent == 'string'">
                      <a class="linkContent clearfix" target="_blank" :href="linkFormatter(JSON.parse(item.chatContent)[1])">
                        <span>{{ JSON.parse(item.chatContent)[0].length<=12?JSON.parse(item.chatContent)[0]:JSON.parse(item.chatContent)[0].substr(0,12)+'......' }}</span>
                        <img :src="icon.link" width="36" alt="">
                      </a>
                    </template>
                    <template v-else>
                      <a class="linkContent clearfix" target="_blank" :href="linkFormatter(item.chatContent[1])">
                        <span>{{ item.chatContent[0].length<=12?item.chatContent[0]:item.chatContent[0].substr(0,12)+'......' }}</span>
                        <img :src="icon.link" width="36" alt="">
                      </a>
                    </template>
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 384"><!--聊天内容位置-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" class="message" >
                    <span style="float: left;cursor: pointer;" @click="showMap(item.chatContent)">
                      <!-- <span style="float:left;">{{ item.chatContent.split('|')[3] }}</span> -->
                      <span style="float:left;" v-if="item.chatContent[0]">{{item.chatContent[0]}}：</span>
                      <span> {{item.chatContent[1]}} </span>
                      <img style="margin-left: 3px;margin-bottom: -3px;" :src="icon.location" alt="">
                    </span>
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 32"><!--聊天内容名片-->
                  <div :class="Number(item.direction) === 0?'me-message':'other-message'" :style="{background:Number(item.direction) === 0?'rgba(53,52,52,.9)':'#fff',color:Number(item.direction) === 0?'#fff':'#434349'}" class="message" style="
line-height: 15px;width: 150px;text-align: left;padding: 0;font-size: 12px">
                    <div style="text-align: left;border-bottom: 1px solid;padding: 5px 7px 3px" :style="{color:Number(item.direction) === 0?'#fff':'#959CB6',borderColor:Number(item.direction) === 0?'#535353':'#979797'}">
                      <span>名片</span>
                    </div>
                    <div style="padding: 0 7px 7px;">
                      <div><span>微信号：</span><span style="word-break: break-all">{{ item.chatContent[0] }}</span></div>
                      <div><span>昵称：</span><span>{{ item.chatContent[1] }}</span></div>
                      <div><span>性别：</span><span>{{ Number(item.chatContent[4]) === 1?'男':'女' }}</span></div>
                      <div><span>地区：</span><span>{{ item.chatContent[3] }}</span></div>
                    </div>
                  </div>
                </template>
                <img :src="icon.warning" v-if ="(item.isShowRetry || Number(item.status) === 1) && Number(item.direction) ===1" style="width: 16px;margin-bottom: -3px;margin-left:5px;" @click="reSendMessage(item)" /><!--显示重发图标-->
              </div>
            </template>
          </template>

          <viewer v-show="false" :options="options" :images="images" class="viewer" ref="viewer">
            <div class="image-wrapper" v-for="src in images">
              <img class="image" :src="src">
            </div>
          </viewer>
          <Spin size="large" fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>uploading</div>
          </Spin>
        </div>
        <div class="sendMessage">
          <message-history :show-history="showHistory" ref="showHistory" @close="handleClose"></message-history>
          <div class="icons">
            <img @click="handleShow()" :src="icon.emojiFace" alt="">
            <img v-if="isEmpty" :src="icon.uploadPic" alt="">
            <Upload
              v-else
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :headers="headers"
              accept=".jpg,.png,.gif"
              :data="uploadData"
              :action="action">
              <img :src="icon.uploadPic" alt="">
            </Upload>
            <img :src="icon.message" style="cursor: pointer;" @click="historyShow" alt="">

            <emotion v-show="emojiShow" class="emojiBox" @emotion="handleEmotion" :height="200" ></emotion>
            <!--<picker v-show="emojiShow"  :showSearch="false" :showCategories="false" :showPreview="false" :showSkinTones="false" color="#f5a623" class="emojiBox" @select="handleEmotion" set="apple" />-->
          </div>
          <div class="send">
            <!--<emoji emoji=":santa::skin-tone-3:" :size="16" />-->
            <div
              @click="handleClick"
              :contenteditable="isEmpty?false:true"
              v-html="message.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
              ref="inputBox"
              @keydown="handlePress"
              id="pre"></div>
          </div>
        </div>
      </div>
      <Modal class="videoModal"  v-model="videoModal"  @on-cancel="cancelVedio" :footer-hide="true">
        <p slot="header" style="color:#f60;text-align:center">
        </p>
        <video-player   class="video-player-box vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"

        ></video-player>
      </Modal>
      <Modal class="mapModal"  v-model="mapModal" :footer-hide="true">
        <p slot="header" style="color:#f60;text-align:center">
        </p>
        <history-map id="chatMap" ref="mapLocation" :loaction="currentLoaction"></history-map>
      </Modal>
    </div>
</template>

<script>
  import Emotion from '../components/emoji/index'
  import historyMap from './messageHistory/historyMap'
  import messageHistory from './messageHistory/messageHistory'// 聊天历史记录
  import com from '../../commons/com';
  import emojilist from '../../commons/emojiList'
  export default {
      name: "chatRoom",
      props:{
          searchObj:Object
      },
      components:{
        Emotion, // 表情组件
        messageHistory, // 历史信息弹窗
        historyMap // 地图弹窗
      },
      data () {
          return {
              videoModal:false, // 视频查看
              mapModal:false, // 地图查看
              action:process.env.NODE_ENV === 'development'?process.env.API_ROOT+'/uusafe/ucp/file/rest/fileUpload':this.$baseURL+'/uusafe/ucp/file/rest/fileUpload', // 山传图片地址 开发？开发：生产
              currentLoaction:[], // 地图位置信息
              headers:{ // 上传图片headers验证
                Authorization: ''
              },
              playerOptions : {},
              message:'说点什么...',// 消息
              emojiShow:false,// 表情框
              endOffset:0,// 光标位置
              emojiObj:{}, // 表情信息
              showHistory:false,// 消息历史记录弹窗
              options: {
                inline: false,
                button: true,
                navbar: true,
                title: false,
                toolbar: true,
                tooltip: true,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
                transition: true,
                fullscreen: true,
                keyboard: true,
              },
              uploadData:{ // 上传图片参数

              },
              spinShow:false, // 上传loading显示
              websock: null,
              showLoading:false
          }
      },
      methods: {
          // 验证聊天列表时间是否显示
          showTime (time,index) {
            if (index>0)  {
              var d1 = new Date(this.messageList[index-1].createTime);
              var d2 = new Date(time);

              if (parseInt(d2 - d1)>300000) { // 验证两条信息时间间隔是否超过五分钟
                  return true
              }else {
                return false
              }

            }
          },
          showTimeFormatter (time) {// 时间格式化
            let date =new Date();
            let year =date.getFullYear();
            let month = date.getMonth()+1;
            month = month<10?'0'+month:month;
            let day = date.getDate();
            day = day<10?'0'+day:day;
            let today = year+'-'+month+'-'+day;
            if (today == time.split(" ")[0]) {
              let nowTime = new Date().getTime();
              let chatTime = new Date(time).getTime();
              let xTime = nowTime - chatTime
              let hours = parseInt((xTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              let minutes = parseInt((xTime % (1000 * 60 * 60)) / (1000 * 60));
              if (hours) {
                if (minutes) {
                  return hours + "小时" + minutes + "分钟前";
                } else {
                  return hours + "小时前"
                }
              }else {
                if (minutes>0) {
                  return minutes+'分钟前'
                }else {
                  return '刚刚'
                }
              }
            }else {
              return time
            }
          },
          // 显示地图查看弹窗
          showMap (row) {
            this.currentLoaction=row;
            this.$refs.mapLocation.initMap(row)
            this.mapModal = true;
          },
          // 关闭视频查看弹窗 清除视频地址
          cancelVedio () {
           setTimeout(()=>{
             this.playerOptions.sources[0].src = '';
           },500)

          },
          // 显示视频查看弹窗
          videoShow (src) {

            this.videoModal = true;
            this.playerOptions={ // 视频插件配置
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              language: 'zh-CN',
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                src: src //url地址
              }],
              poster: "", //你的封面地址
              // width: document.documentElement.clientWidth, //播放器宽度
              notSupportedMessage: '该浏览器暂不支持播放该视频格式', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
              }
            }
            // this.playerOptions.sources[0].src = src;
            // this.playerOptions.notSupportedMessage = '';
          },
          showBigPic (event) {// 查看图片
            let images = document.getElementsByClassName('image');// 获取所有图片
            for (let i= 0; i<images.length; i++) {
              if (event.target.currentSrc === images[i].src) {
                images[i].click();

              }
            }
          },
          // 显示表情框并获得光标
          handleShow () {
              if (this.isEmpty) {
                 return false
              }
              this.emojiShow = !this.emojiShow
            this.$refs.inputBox.focus();
            if (this.$refs.inputBox.innerHTML =='说点什么...') {
              this.$refs.inputBox.innerHTML ='';
              this.message =''
            }
            var range = window.getSelection(this.$refs.inputBox).getRangeAt(0); //创建range
            var end = range.endOffset;// 最后光标的位置
            var preElement = range.endContainer;
            while(preElement.previousSibling){ // 文字中插入表情定位光标
              if(preElement.previousSibling.outerHTML){
                end += preElement.previousSibling.outerHTML.length;
              }else{
                end += preElement.previousSibling.textContent.length;
              }
              preElement = preElement.previousSibling;
            }
            if (preElement.childNodes.length) { // 表情中插入表情定位光标
              var s=0;
              for (let i = 0; i<end;i++) {
                if (preElement.childNodes[i].outerHTML) {
                  s+=preElement.childNodes[i].outerHTML.length;
                }else {
                  s+=preElement.childNodes[i].textContent.length;
                }
              }
              end =s;
            }
            this.endOffset =end;
            // 阻止事件冒泡
            if (event && event.stopPropagation) {//非IE
              event.stopPropagation();
            }
            else {//IE
              window.event.cancelBubble = true;
            }
          },
          handleClick () { // 点击输入框获得光标位置
            if (this.isEmpty) {
                return false
            }
            this.$refs.inputBox.focus();
            this.$store.state.scrollToBottom = 1
            if (this.$refs.inputBox.innerHTML =='说点什么...') {
              this.$refs.inputBox.innerHTML ='';
              this.message =''
            }
            var range = window.getSelection(this.$refs.inputBox).getRangeAt(0); //创建range
            var end = range.endOffset;
                var preElement = range.endContainer;
            while(preElement.previousSibling){
                   if(preElement.previousSibling.outerHTML){
                         end += preElement.previousSibling.outerHTML.length;
                         }else{
                     end += preElement.previousSibling.textContent.length;
                         }
              preElement = preElement.previousSibling;
                   }
            if (preElement.childNodes.length) {
              var s=0;
              for (let i = 0; i<end;i++) {
                if (preElement.childNodes[i].outerHTML) {
                  s+=preElement.childNodes[i].outerHTML.length;
                }else {
                  s+=preElement.childNodes[i].textContent.length;
                }
              }
              end =s;
            }
            this.endOffset =end;
          },
          handleEmotion (i) { // 选择表情的回调
            this.emojiShow = true;
            this.emojiObj =i;
            // 阻止事件冒泡
            if (event && event.stopPropagation) {//非IE
              event.stopPropagation();
            }
            else {//IE
              window.event.cancelBubble = true;
            }
           if (this.$refs.inputBox.innerHTML=='说点什么...') {
             this.$refs.inputBox.innerHTML=''
           }
            this.message = this.$refs.inputBox.innerHTML;
            var start  = this.message.substr(0,this.endOffset);
            var end  = this.message.substr(this.endOffset,this.message.length);
            this.message = start +this.emotion(i)+end;
            this.endOffset += this.emotion(i).length;
          },
          // 将匹配结果替换表情图片
          emotion (res) {
            let word = res.replace(/\[|\]/gi,'');
            let index = emojilist.indexOf(word);
            if (index>= 0) {
                return `<img src="https://btsstatic.oss-cn-shanghai.aliyuncs.com/admin/emoji/${index}.gif" align="middle">`
            } else {
                return ''
            }

          },
          // 将图片换成表情
          remotion (res) {
            let word = res.replace(/\<img src="https:\/\/btsstatic.oss-cn-shanghai.aliyuncs.com\/admin\/emoji\/|\.gif" align="middle">/gi,'');
            return `[${emojilist[word]}]`
          },

          //发送消息
          sengMessage () {
            let message =this.$refs.inputBox.innerHTML.replace(/<img src="https:\/\/btsstatic.oss-cn-shanghai.aliyuncs.com\/admin\/emoji\/(\S*).gif" align="middle">/g,this.remotion);
            if (message =='') {
              this.$Notice.warning({
                title: '不能发送空消息！',
              });

              return
            }
            let date = new Date().getTime();
            let messageObj ={
                reqId:date+'_'+this.loginInfo.staffId,
                direction:'0',
                contentType:1,
                chatContent:message,
                deviceId:this.detailInfo.deviceId,
                staffId:this.detailInfo.staffId,
                staffIdInApp:this.detailInfo.staffIdInApp,
                targetheadImage:this.selfDetail.header_image,
                targetImAppId:this.detailInfo.contactImIdInApp || this.detailInfo.groupImIdInApp
            };
            if (this.detailInfo.contactImIdInApp) {
              messageObj.targetType =1;
            }else  {
              messageObj.targetType =0;
            };
            this.$store.commit('websocketsend',messageObj);
             // this.$store.state.websock.onmessage = function (e) {
             //     let obj =JSON.parse(e.data);
             //        console.log(obj)
             //    };

            this.$store.commit('updateMessage',messageObj);
            this.$refs.inputBox.innerHTML='';
            this.message = ''
          },
          handlePress(event) {// enter键发送消息
            if(event.keyCode == 13) {
             this.sengMessage();
              event.preventDefault(); // 阻止浏览器默认换行操作
              return false;
            }else {

            }
          },
          historyShow () {// 显示历史记录弹窗
              if (this.isEmpty) {
                  return false
              }
            this.showHistory=!this.showHistory;
            this.$refs.showHistory.searchObj.value='';
            this.$refs.showHistory.getWeekDate();
            this.$refs.showHistory.tabsClick(0)
            // 阻止事件冒泡
            // console.log(this.endOffset)
            if (event && event.stopPropagation) {//非IE
              event.stopPropagation();
            }
            else {//IE
              window.event.cancelBubble = true;
            }
          },
          handleClose () { //关闭历史记录弹窗
            this.showHistory = false;
          },
          //图片上传之前
          beforeUpload ( file) {
            this.uploadData.name = file.name;
            this.headers.Authorization = com.getAuthorization()
            this.spinShow = true;
          },
          // 图片上传成功
          uploadSuccess (res,file) {
            this.spinShow = false;
            let date = new Date().getTime();
            let messageObj ={
                reqId:date+'_'+this.loginInfo.staffId,
                direction:'0',
                contentType:2,
                chatContent:res.data.filePath,
                deviceId:this.detailInfo.deviceId,
                staffIdInApp:this.detailInfo.staffIdInApp,
                targetheadImage:this.selfDetail.header_image,
                staffId:this.detailInfo.staffId,
                targetImAppId:this.detailInfo.contactImIdInApp || this.detailInfo.groupImIdInApp
            };
            if (this.detailInfo.contactImIdInApp) {
              messageObj.targetType =1;
            }else  {
              messageObj.targetType =0;
            };
            this.$store.commit('websocketsend',messageObj);
            this.$store.commit('updateMessage',messageObj);
          },
          //图片上传失败
          uploadError () {
            this.spinShow = false;
            this.$Notice.error({
              title: '图片上传失败！',
            });
          },
          reSendMessage (row) {// 重新发送消息
            // row.oldReqId = row.reqId;
            // delete row.isShowRetry;
            // delete row.status;
            // let date = new Date().getTime();
            // row.reqId = date+'_'+this.loginInfo.staffId;
            // this.$store.commit('websocketsend',row);
            // this.$store.commit('updateMessage',row);
            // this.$store.commit('delReSendMessage',row.reqId);// 删除失败信息
          },
          handleReachTop() {
              this.showLoading = true
              this.$store.state.scrollToBottom = 3
              setTimeout(()=>{
                  this.$store.dispatch('getMessageList',this.messageLength).then(data=>{
                      if (data) {
                          this.showLoading = false
                      }
                  });
              },1000)

          }
      },
    // destroyed() {
    //   this.$store.commit('websocketclose') //离开路由之后断开websocket连接
    // },
    watch:{
      expressionContent (val) {
        if (val) {
          this.message = val.chatContent;
        }
      }
    },
      computed: {
          messageList () {
            return this.$store.state.messageList;
          },
          userName () {
            return this.$store.state.loginInfo.userName;
          },
          images () {
            return this.$store.state.images;
          },
          loginInfo () {
            return this.$store.state.loginInfo;
          },
          detailInfo () {
            return this.$store.state.detailInfo;
          },
          userInfo () {
              return this.$store.state.userInfo;
          },
          player() {
            return this.$refs.videoPlayer.player;
          },
          isEmpty () {
            return this.$store.state.isEmpty;
          },
          selfDetail () {
            return this.$store.state.selfDetail;
          },
          expressionContent () {
            return this.$store.state.expressionContent;
          },
          messageLength() {
              return this.$store.state.messageLength
          },
          showMoreText() {
              return this.$store.state.showMoreText
          },
          scrollToBottom() {
              return this.$store.state.scrollToBottom
          }
      },
      mounted () {
        document.getElementById('app').onclick=() =>{// 点击其他关闭弹窗
          this.emojiShow = false;
          this.handleClose();
        };
        this.$nextTick(function () {
            this.$refs.inputBox.onblur= ()=> {
                if (this.$refs.inputBox.innerHTML==='') {
                    this.message='说点什么...';
                }
            }
        })
      }
    }
</script>

<style lang="less">
  .chatRoom {
    height: 100%;
    width: 100%;
    .content {
      width: 100%;
      height: 100%;
      .chatList {
        height: 70%;
        background: #f9f9f9;
        border-right: 1px solid #F0F2F5;
        padding: 12px 20px;
        overflow-y: auto;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
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
          background: #F9F9F9;
        }
        .ivu-scroll-container {
          overflow: auto;
        }
        .messageList {
          position: relative;
          margin-top: 20px;
          &:first-child {
            margin-top: 0;
          }
        }
        .sysMessageList {
          a {
            color: #f5a623;
          }
        }
        .message {
          display: inline-block;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          padding: 9.5px 12px;
          font-size: 14px;
          max-width: calc(100% - 106px);
          white-space:pre-wrap; /* css3.0 */
          white-space:-moz-pre-wrap; /* Firefox */
          white-space:-pre-wrap; /* Opera 4-6 */
          white-space:-o-pre-wrap; /* Opera 7 */
          word-wrap:break-word; /* Internet Explorer 5.5+ */
          position: relative;
          .linkContent {
            display: block;
            padding: 14px 12px;
            background: #fff;
            span {
              display: inline-block;
              width: 85px;
              font-size: 12px;
              color: #434349;
              text-align: left;
              float: left;
            }
            img {
              margin-left: 8px;
              float: left;
            }
          }
          .redPackage {
            white-space: normal;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            background: #fff;
            text-align: left;
              .redPackage_1 {
                background: #F15E48;
                padding: 12px 14px;
                color: #fff;
                border-radius:2px 2px 0px 0px;
                width: 230px;
                font-size: 12px;
                .transferText {
                  display: inline-block;
                  line-height: 15px;
                  margin-left: 9px;
                  float: left;
                  max-width: calc(100% - 36px);
                  margin-top: 7px;
                }
              }
            .redPackage_2 {
              padding: 5px 14px;
              color: #959CB6;
            }
          }
        }
        .other {
          .ivu-avatar {
            float:left;
          }
          text-align: left;
          .other-message {
            color: #333333;
            background: #fff;
            margin: 0 0 0 10px;
            a{
              color: #333333;
            }
            &::before {
              content:"";
              display: block;
              width: 0;
              height: 0;
              border-right: 6px solid #fff;
              border-left: 6px solid transparent;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
              position: absolute;
              top: 14px;
              left: -12px;
            }
            .x-audio-wrap{
              box-shadow: 0 0 0;
              position: relative;
              .x-time {
                margin-left: 25px;
              }
              .x-sector {
                border-color: #434349;
                position: absolute;
                left: 0;
                top: 12px;
                margin-left: 0;
                border-right: 0;
                border-top: 0;
                &:before {
                  right: -3px;
                  top: -3px;
                  height: 8px;
                  width: 8px;
                  border-color: #434349;
                  border-radius: 1px 12px;
                }
                &:after {
                  right: -10px;
                  top: -10px;
                  height: 14px;
                  width: 14px;
                  border-color: #434349;
                  border-radius: 1px 14px;
                }
                .x-dot {
                  top: 3px;
                  background: #434349;
                }
              }
            }
          }
        }
        .me {
          text-align: right;
          .ivu-avatar {
            float:right;
          }
          .me-message {
            color: #fff;
            background: #575858;
            margin: 0 10px 0 0;
            &::before {
              content:"";
              display: block;
              width: 0;
              height: 0;
              border-right: 6px solid transparent;
              border-left: 6px solid #575858;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
              position: absolute;
              top: 8px;
              right: -12px;
            }
            .x-audio-wrap{
              box-shadow: 0 0 0;
              position: relative;
              .x-time {
                margin-left: 35px;
                color: #fff;
              }
              .x-sector {
                border-color: #fff;
                position: absolute;
                right: 0;
                top: 12px;
                border-right: 0;
                border-top: 0;
                transform: rotate(-135deg);
                &:before {
                  right: -3px;
                  top: -3px;
                  height: 8px;
                  width: 8px;
                  border-color: #fff;
                  border-radius: 1px 12px;
                }
                &:after {
                  right: -10px;
                  top: -10px;
                  height: 14px;
                  width: 14px;
                  border-color: #fff;
                  border-radius: 1px 14px;
                }
                .x-dot {
                  top: 3px;
                  background: #fff;
                }
              }
            }
          }
          .ivu-icon.ivu-icon-ios-sync {
            display: inline-block;
            width: 18px;
            height: 20px;
            margin-right: 3px;
            cursor: pointer;
          }
        }

      }
      .sendMessage {
        height: 30%;
        border: 2px solid #F0F2F5;
        border-left: 0;
        border-bottom: 0;
        background: #f9f9f9;
        position: relative;
        .ivu-upload {
          display: inline-block;
          height: 20px;
        }
        .icons {
          height: 40px;
          padding-left: 20px;
          line-height: 50px;
          position: relative;
          img {
            cursor: pointer;
            padding-right: 12px;
          }
          .emojiBox {
            position: absolute;
            bottom: 40px;
            background: #fff;
            border-radius: 2px;
            .emotion-box {
              width: 300px;
            }
            .emotion-box::-webkit-scrollbar {/*滚动条整体样式*/
              width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 1px;
            }
            .emotion-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background:#C3C6D6;
            }
            .emotion-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px #F7F8FA;
              border-radius: 5px;
              background: #fff;
            }
          }
        }
        .send {
          height: calc(100% - 40px);
          padding-bottom: 20px;
          #pre {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            background: #F7F8FA;
            padding: 0 30px;
            resize: none;
            margin: 0;
            font-size: 14px;
            white-space:pre-wrap; /* css3.0 */
            white-space:-moz-pre-wrap; /* Firefox */
            white-space:-pre-wrap; /* Opera 4-6 */
            white-space:-o-pre-wrap; /* Opera 7 */
            word-wrap:break-word; /* Internet Explorer 5.5+ */
            overflow-y: auto;
            &::-webkit-scrollbar {/*滚动条整体样式*/
              width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 1px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background:#EDEDED;
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px #F7F8FA;
              border-radius: 5px;
              background: #F7F8FA;
            }
          }
        }

      }
    }

  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
