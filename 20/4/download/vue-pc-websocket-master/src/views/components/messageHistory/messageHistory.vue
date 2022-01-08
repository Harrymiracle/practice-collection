<template>
  <div class="messageHistory" v-if="showHistory" @click="unClose">
    <div class="history-header clearfix">
      <Avatar size="large" shape="square" icon="ios-person" :src="Number(userInfo.targetType)===1?avatarFormatter(userInfo.headerPic):avatarFormatter(userInfo.headerPic,true)" />
      <span class="nickName">{{ userInfo.name }}</span>
      <img style="cursor: pointer;" :src="icon.close" alt="" @click="close">
    </div>
    <div class="history-body">
      <Row class="datePick">
        <Col span="12" style="padding-right: 6px;padding-left: 20px;">
          <div style="background: #F1F2F7;height: 32px;">
            <Col span="12" class="startTime" >
              <DatePicker :value="startDate" @on-clear="clearDate" @on-change="pickStartDate" :options="optionStart" type="date" placeholder="开始时间"></DatePicker>
            </Col>
            <Col span="2" class="until">至</Col>
            <Col span="10" class="endTime">
              <DatePicker :value="endDate" @on-change="pickEndDate" :options="optionEnd" type="date" placeholder="结束时间"></DatePicker>
            </Col>
          </div>
        </Col>
        <Col span="12" style="padding-left: 6px;padding-right: 20px;">
          <Input prefix="ios-search" v-model="searchObj.value" @on-change="getMessageList" placeholder="搜索聊天内容" />
        </Col>
        <div class="zhanwei"></div>
      </Row>
      <div class="messageContent">
        <ul class="contentTab clearfix">
          <li v-for="(item,index) in tabs" :class="{ active:index==current}"  @click="tabsClick(index)">{{item}}</li>
          <li :class="{ active:current==5}">
            <Dropdown trigger="hover" @on-click="dropDownClick" placement="bottom-start">
              更多
              <DropdownMenu slot="list">
                <DropdownItem name="352">转账</DropdownItem>
                <DropdownItem v-if="userInfo.targetType ==1" name="7">单聊语音电话</DropdownItem>
                <DropdownItem v-if="userInfo.targetType ==0" name="113">群聊语音电话</DropdownItem>
                <DropdownItem name="384">位置</DropdownItem>
                <DropdownItem name="32">名片</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
        <div class="contentList">
          <ul >
            <li v-for="(item,index) in chatHistoryList">
              <Avatar shape="square" icon="md-person"  :src="Number(item.direction) ===1?avatarFormatter(item.targetheadImage):icon.personAvatar" />
              <div class="userName">
                  <span class="nickName" v-html="Number(item.direction) ===1?item.targetImAppNickName:selfDetail.nick_name"></span>
                  <div class="customerName" v-if="Number(item.direction) === 0 && userInfo.customerStaffName">
                      <span>客服-{{ userInfo.customerStaffName }}</span>
                      <span>({{ userInfo.customerLoginName }})</span>
                  </div>
                <template v-if="Number(item.contentType) === 1||Number(item.contentType) === 114||Number(item.contentType) === 115|| Number(item.contentType) === 116 ">
                  <Poptip  :transfer="true" trigger="hover" word-wrap width="200">
                    <div slot="content">
                      <div v-html="item.chatContent.replace(/\[[^\]]+\]/g,emotion)"></div>
                    </div>
                    <div class="recentNews" v-html="item.chatContent.replace(/\[[^\]]+\]/g,emotion)" ></div>
                  </Poptip>
                </template>
                <template v-else-if="Number(item.contentType) === 2">
                  <viewer :options="options" class="viewer" ref="viewer">
                    <img class="image" v-if="item.chatContent.substring(item.chatContent.length-8) === 'notFound'" :src="icon.notFound"  style="cursor:pointer;max-width: 80px;" @click="showBigPic($event)">
                    <img class="image" v-else :src="item.chatContent.substring(item.chatContent.lastIndexOf('.')) !== '.jpg'?item.chatContent+'.jpg':item.chatContent"  style="cursor:pointer;max-width: 80px;" @click="showBigPic($event)">
                  </viewer>
                </template>
                <template v-else-if="Number(item.contentType) === 3">
                  <div>
                    <m-audio  :src="item.chatContent.replace(/\.\w+$/,'')+'.mp3'" text="播放" :show-duration="true"></m-audio>
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 4">
                  <div>
                    <img :src="icon.video" @click="videoShow(item.chatContent)" width="120" height="80" style="border-radius: 2px;cursor: pointer;" alt="">
                  </div>
                </template>
                <template v-else-if="Number(item.contentType) === 5">
                  <div class="recentNews" style="padding: 10px;border: 1px solid #F1F2F7;">
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
                <template v-else-if="Number(item.contentType) === 7 || Number(item.contentType) === 113">
                  <Poptip  :transfer="true" trigger="hover" word-wrap width="200">
                    <div slot="content">
                      <div>语音通话:已结束</div>
                    </div>
                    <div class="recentNews">语音通话:已结束</div>
                  </Poptip>
                </template>
                <template v-else-if="Number(item.contentType) === 273">
                  <Poptip :transfer="true" trigger="hover" word-wrap width="200" :content="JSON.parse(item.chatContent)[0]">
                    <div class="recentNews">
                      <a class="linkContent clearfix" target="_blank" :href="linkFormatter(JSON.parse(item.chatContent)[1])" >
                        <span>{{ JSON.parse(item.chatContent)[0].length<=12?JSON.parse(item.chatContent)[0]:JSON.parse(item.chatContent)[0].substring(0,12)+'......' }}</span>
                        <img :src="icon.link" width="36" alt="">
                      </a>
                    </div>
                  </Poptip>
                </template>
                  <template v-else-if="Number(item.contentType) === 272">
                    <div class="recentNews" >
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
                  <template v-else-if="Number(item.contentType) === 352">
                    <div class="recentNews" >
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
                          <div class="transferText" v-if="item.chatContent.match(/转账给你(\S*)元/)">
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
                  <template v-else-if="Number(item.contentType) === 384">
                    <div class="recentNews" >
                  <span style="float: left;cursor: pointer;" @click="showMap(item.chatContent)" >
                    <!-- <span v-html="item.chatContent.split('|')[3]"></span> -->
                    <span v-if="item.chatContent[0]">{{item.chatContent[0]}}：</span> {{item.chatContent[1]}}
                    <img style="margin-left: 3px;margin-bottom: -3px;" :src="icon.location" alt="">
                  </span>
                    </div>
                  </template>
                  <template v-else-if="Number(item.contentType) === 32">
                    <div class="messageCard"  style="border: 1px solid #f1f4f7;padding: 0;">
                      <div style="text-align: left;border-bottom: 1px solid #f1f4f7;padding: 5px 0 3px 7px;color: #959CB6;">
                        <span>名片</span>
                      </div>
                      <div style="padding: 7px;line-height: 20px;">
                        <div><span>微信号：</span><span style="word-break: break-all;">{{ item.chatContent[0] }}</span></div>
                        <div><span>昵称：</span><span>{{ item.chatContent[1] }}</span></div>
                        <div><span>性别：</span><span>{{ item.chatContent[4]==1?'男':'女' }}</span></div>
                        <div><span>地区：</span><span>{{ item.chatContent[3] }}</span></div>
                      </div>
                    </div>
                  </template>
              </div>
              <span class="time">{{ item.createTime }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Modal class="videoModal"  v-model="videoModal" @on-cancel="cancelVedio" :footer-hide="true">
      <p slot="header" style="color:#f60;text-align:center">
      </p>
      <video-player   class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
      ></video-player>
    </Modal>
    <Modal class="mapModal"  v-model="historyMapModal" :footer-hide="true">
      <p slot="header" style="color:#f60;text-align:center">
      </p>
      <history-map id="modalMap" ref="mapLocation" :loaction="currentLoaction"></history-map>
    </Modal>
  </div>
</template>

<script>
  import historyMap from '../messageHistory/historyMap'
  import emojilist from '../../../commons/emojiList'
    export default {
        name: "messageHistory",
      props:{
        showHistory:{
          type:Boolean
        }
      },
      components:{
        historyMap
      },
      data () {
          return {
            videoModal:false,
            historyMapModal:false,
            currentLoaction:[],
            options:{
              inline: false,
              button: true,
              navbar: false,
              title: false,
              toolbar: false,
              tooltip: true,
              movable: true,
              zoomable: true,
              rotatable: true,
              scalable: true,
              transition: true,
              fullscreen: true,
              keyboard: true,
            },
            playerOptions : {

            },
            current:0,
            searchObj:{
              value:'',
              name:"key",
              operation:"LIKE",
              type:"string"
            },
            tabs:['全部','图片与视频','文件','红包','链接'],
            optionStart:{
              disabledDate (date) { // 禁止选择今天之后的日期
                return date && date.valueOf() > Date.now();
              }
            },
            optionEnd:{
              disabledDate (date) { // 禁止选择今天之后的日期
                return date && date.valueOf() > Date.now();
              }
            },
            startDate:'',
            startTime:{
              name:"createTime",
              operation:"GE",
              type:"string",
              value:""
            },
            endDate:'',
            endTime:{
              name:"createTime",
              operation:"LE",
              type:"string",
              value:""
            },
            selectOption:{
              name:"contentType",
              operation:"IN",
              type:"numeric",
              value:[]
            }
          }
      },
      computed:{
          userInfo () {
            return this.$store.state.userInfo
          },
          selfDetail () {
            return this.$store.state.selfDetail;
          },
          chatHistoryList() {
              return this.$store.state.chatHistoryList
          }
      },
      methods:{
        showMap (row) {
          this.currentLoaction=row;
          this.$refs.mapLocation.initMap(row);
          this.historyMapModal = true;
        },
        cancelVedio () {
          setTimeout(()=>{
            this.playerOptions.sources[0].src = '';
          },500)

        },
        videoShow (src) {
          this.videoModal = true;
          this.playerOptions={
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: src //url地址
            }],
            poster: "", //你的封面地址
            // width: document.documentElement.clientWidth, //播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            }
          }
        },
        dropDownClick (val) {
          this.current =5;
          this.selectOption.value=[Number(val)];
          this.getMessageList();
        },
        // tabs 切换
        tabsClick (index) {
          switch (index) {
            case 0:
              this.selectOption.value=[];
              break;
            case 1:// 图片与视频
              this.selectOption.value=[2,4];
              break;
            case 2://文件
              this.selectOption.value=[5];
              break;
            case 3:// 红包
              this.selectOption.value=[272];
              break;
            case 4:// 链接
              this.selectOption.value=[273];
              break;
            default:
              break;

          }
          this.getMessageList();
          this.current = index;
          // 阻止事件冒泡
          // console.log(this.endOffset)
          if (event && event.stopPropagation) {//非IE
            event.stopPropagation();
          }
          else {//IE
            window.event.cancelBubble = true;
          }
        },
        close () {
          this.$emit('close')
        },
        unClose () {
          // 阻止事件冒泡
          // console.log(this.endOffset)
          if (event && event.stopPropagation) {//非IE
            event.stopPropagation();
          }
          else {//IE
            window.event.cancelBubble = true;
          }
        },
        pickStartDate (date) { // 选择开始时间的回调
          if (date) {
            this.startTime.value =date+' 00:00:00';
          } else {
            this.startTime.value = ''
          }

            this.optionEnd ={
              disabledDate (d) { // 结束时间禁止选择开始时间之前的日期
                return (d && d.valueOf() < new Date(date).valueOf()- 86400000) || (d && d.valueOf() > Date.now());
              }
            };
            this.getMessageList()
        },
        pickEndDate (date) { // 选择结束时间的回调
          this.endDate = date
          this.endTime.value = this.endDate+' 23:59:59';
          this.optionStart ={
            disabledDate (d) { // 开始时间禁止选择结束时间之后的日期
              return (d && d.valueOf() > new Date(date).valueOf()) || (d && d.valueOf() > Date.now());
            }
          };
          this.getMessageList()

        },
        // 获取一周的日期
        getWeekDate () {
          let today = new Date();
          let month =today.getMonth()+1;
          let day =today.getDate();
          if (month.toString().length<2) {
            month = '0'+month
          }
          if (day.toString().length<2) {
            day = '0'+day
          }
           let time1=today.getFullYear()+"-"+month+"-"+day;//time1表示当前时间
          let date = new Date(today);
          date.setDate(today.getDate()-6);
          let month1= date.getMonth()+1;
          let day1 = date.getDate();
          if (month1.toString().length<2) {
            month1 = '0'+month1
          }
          if (day1.toString().length<2) {
            day1 = '0'+day1
          }
          let time2 = date.getFullYear()+"-"+month1+"-"+day1;
          this.startDate = time2;
          this.startTime.value = this.startDate+' 00:00:00';
          this.endDate = time1;
          this.endTime.value =  this.endDate+' 23:59:59';
        },
        getMessageList () {
          let arr = [
              {
                  pageSize:1000
              }
          ]
          if (this.startTime.value) {
            arr.push(this.startTime);
            arr.push( this.endTime)
          }
            if (this.searchObj.value) {
                arr.push(this.searchObj);
            }
            if (this.selectOption.value.length) {
                arr.push(this.selectOption)
            }
            this.$store.dispatch('getMessageList',arr)
        },
        clearDate () { // 清除时间选择
          this.endDate = '';
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
      },
      mounted () {
        this.getWeekDate();
      }
    }
</script>

<style lang="less">
  .videoModal,.mapModal {
    .ivu-modal-body {
      padding: 0;
    }
  }
  .mapModal {
    .ivu-modal-body {
      height: 400px;
    }
  }
  .messageHistory {
    position: absolute;
    width: 500px;
    height: 220%;
    background: #fff;
    z-index: 2;
    bottom: 100%;
    box-shadow:0px 3px 7px 7px rgba(0,0,0,0.08);
    border-radius:2px;
    padding: 20px 0;
    .history-header {
      margin-bottom: 20px;
      padding: 0 20px;
      .ivu-avatar {
        float: left;
      }
      .nickName {
        color: #434349;
        font-size: 15px;
        margin-left: 15px;
        float: left;
        margin-top: 10px;
      }
      img {
        float: right;
      }

    }
    .history-body {
      height: calc(100% - 40px);
      .datePick {
        .ivu-input-suffix {
          left: 0;
        }
        .ivu-date-picker-focused input {
          -webkit-box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.2);
          box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.2);

        }
        .ivu-input {
          background: #F1F2F7;
          border: 0;
          border-radius:2px;
          &:focus {
            -webkit-box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.2);
            box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.2);
          }
        }
        .ivu-input-with-suffix {
          padding-right: 12px;
          padding-left: 38px;
          background: #F1F2F7;
          border: 0;
        }

        .until {
          padding-top: 7px;
          padding-left: 4px;
        }
        .startTime {

        }
        .endTime {
          .ivu-input-suffix {
            display: none;
          }
          .ivu-input-with-suffix {
            padding-left: 18px;
          }

        }
        .zhanwei {
          height: 20px;
          border-bottom: 1px solid #F1F2F7;
          clear: both;
        }
      }
      .messageContent {
        height: calc(100% - 52px);
        .contentTab {
          padding: 15px 20px;
          li {
            float: left;
            color: #434349;
            font-size: 13px;
            margin-right: 35px;
            cursor: pointer;
            &.active {
              color: #f5a623;
            }
            &:hover {
              color: #f5a623;
            }
            .ivu-dropdown-menu {
              li {
                margin-right: 0;
                width: 100%;
              }
            }
          }
        }
        .contentList {
          height: calc(100% - 49px);
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
          li {
            padding: 10px 20px;
            border-bottom: 1px solid #F1F2F7;
            position: relative;
            .ivu-avatar {
              float: left;
              margin-top: 3px;
            }
            .userName {
              margin-left: 20px;
              display: inline-block;
              max-width: 380px;
              .nickName {
                font-size:14px;
                color: #434349;
              }
              .customerName {
                background: #F1F2F7;
                border-radius: 2px;
                padding: 2px 5px;
                color: #6C7293;
                font-size: 11px;
                transform: scale(.9);
                margin-left: -7px;
              }
              .ivu-poptip {
                display: block;
              }
              .recentNews {
                font-size:12px;
                color: #6C7293;
                max-width: 380px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a {
                  color: #434349;
                }
                .linkContent {
                  display: block;
                  padding: 14px 12px 14px 12px;
                  background: #fff;
                  border: 1px solid #f1f4f7;
                  span {
                    display: inline-block;
                    width: 85px;
                    white-space:normal ;
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
                      width: calc(100% - 36px);
                      margin-top: 7px;
                    }
                  }
                  .redPackage_2 {
                    padding: 5px 14px;
                    color: #959CB6;
                  }
                }
              }
              .messageCard {
                padding: 10px;
                border-radius: 2px;
                background: #fff;
                width: 180px;
                color: #434349;
              }
              .x-audio-wrap {
                .x-time {
                  margin-right: 20px;
                }
              }
              .x-audio-wrap{
                .x-sector {
                  &:before {
                    right: -5px;
                    top: -5px;
                  }
                  &:after {
                    right: -9px;
                    top: -9px;
                  }
                  .x-dot {
                    top: 1px;
                  }
                }
              }

              .video-js .vjs-icon-placeholder {
                width: 100%;
                height: 100%;
                display: block;
              }

            }
            .time {
              color: #6C7293;
              position: absolute;
              right: 20px;
              top: 10px;
            }
          }
        }
      }
    }
  }
</style>
