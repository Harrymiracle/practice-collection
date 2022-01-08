<template>
<div class="userList">
    <div class="listNull" v-if="(chatList&&!chatList.length)|| !chatList">
      <img :src="icon.listNull" alt="">
      <div style="margin-top: 10px;">暂无信息~</div>
    </div>
    <ul v-else>
      <li class="clearfix" v-for="(item,index) in chatList" :class="{ active:index === current}" @click="handleClick(index,item)">
        <Badge :count="item.unread">
          <Avatar shape="square" icon="md-person" :src="Number(item.targetType) === 1?avatarFormatter(item.headerPic):avatarFormatter(item.headerPic,true)" />
        </Badge>
        <div class="userName">
          <span class="nickName">
           {{ item.name }}
          </span>
          <span class="recentNews" v-html="messageFormatter(item)"></span>
        </div>
        <span class="time" v-if="item.createTime">{{ timeFormatter(item.createTime) }}</span>
      </li>
    </ul>
</div>
</template>


<script>
    import emojilist from '../../../commons/emojiList'
    export default {
        name: "userList",
        props:{
            searchObj:Object
        },
        data() {
            return {
                current:0,
                status:false
            }
        },
        methods:{
            messageFormatter(item) {
                if (Number(item.contentType) === 1||Number(item.contentType) === 114||Number(item.contentType) === 115||Number(item.contentType) === 116 || Number(item.contentType) === 352) {
                    if (Number(item.unread) !== 0) {
                        return `<span style="margin-left: 2px;">[未读]</span>${item.chatContent.replace(/\[[^\]]+\]/g,this.emotion)}`
                    } else {
                        return item.chatContent.replace(/\[[^\]]+\]/g,this.emotion)
                    }
                } else if (Number(item.contentType) === 2) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[图片]'
                    } else {
                        return '[图片]'
                    }
                } else if (Number(item.contentType) === 3) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[语音]'
                    } else {
                        return '[语音]'
                    }
                }else if (Number(item.contentType) === 7 || Number(item.contentType) === 113) {
                    if (Number(item.unread)!== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[语音通话]'
                    } else {
                        return '[语音通话]'
                    }
                } else if (Number(item.contentType) === 4) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[视频]'
                    } else {
                        return '[视频]'
                    }
                } else if (Number(item.contentType) === 5) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[文件]'
                    } else {
                        return '[文件]'
                    }
                } else if (Number(item.contentType) === 384) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[位置]'
                    } else {
                        return '[位置]'
                    }
                } else if (Number(item.contentType) === 32) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[名片]'
                    } else {
                        return '[名片]'
                    }
                } else if (Number(item.contentType) === 273) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[链接]'
                    } else {
                        return '[链接]'
                    }
                } else if (Number(item.contentType) === 272) {
                    if (Number(item.unread) !== 0) {
                        return '<span style="margin-left: 2px;">[未读]</span>[红包]'
                    } else {
                        return '[红包]'
                    }
                }
            },
            // 将匹配结果替换表情图片
            emotion (res) {
                let word = res.replace(/\[|\]/gi,'');
                let index = emojilist.indexOf(word);
                if (index>= 0) {
                    return `<img src="https://btsstatic.oss-cn-shanghai.aliyuncs.com/admin/emoji/${index}.gif" style="width: 20px;margin-top: -8px;" align="middle">`
                } else {
                    return ''
                }
            },
            resetUnread (row) {// 点击重置未读消息
              let params ={
                entityName: 'AccBusinessCommunicateDetailClient',
                condition: {
                  'staffIdInApp.keyword':row.staffIdInApp,
                  'targetImAppId.keyword':row.targetImAppId,
                  isread:0
                }
              }
              this.$store.dispatch('get',{url:'business/updateReadStatus',params}).then(res=>{
              });
            },
            handleClick (index,row) {// 列表点击事件
                this.current = index;
                row.targetId = row.targetImAppId
                row.unread = 0
                this.$store.commit('setUserInfo',row);
                this.$store.dispatch('getMessageList') // 获取消息列表
                if (Number(row.targetType) === 0) {
                    this.$store.dispatch('getGroupInfo')
                    this.$store.dispatch('getSelfInfo')
                    this.$store.dispatch('getGroupMemberList')
                }else {
                    this.$store.dispatch('getDetailInfo')
                    this.$store.dispatch('getSelfInfo')
                }
                this.resetUnread(row);
                this.$store.state.messageLength = 40;
            },
            getRecentList() {
                this.$store.dispatch('getChatList').then(data=>{
                    if (data) {
                        if (this.status) {
                            this.$store.commit('updateRecentChatList')
                        }
                        if (this.chatList.length) {
                            this.$store.state.isEmpty =false;
                            this.handleClick(0,this.chatList[0]);
                        }
                    }
                })
            },
            timeFormatter(time) {
                let date = (new Date());    //当前时间
                let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
                let yestday = new Date(today - 24*3600*1000).getTime();
                if (new Date(time).getTime() >= today) {
                    return time.split(' ')[1].split(':')[0]+':'+time.split(' ')[1].split(':')[1]
                } else if (new Date(time).getTime() < today && yestday <= new Date(time).getTime()) {
                    return '昨天'
                } else if(new Date(time).getTime() < yestday ){
                    return time.split(' ')[0].split('-')[0]+'/'+time.split(' ')[0].split('-')[1]+'/'+time.split(' ')[0].split('-')[2]
                }

            }
        },
        computed :{
            chatList () {
              return this.$store.state.recentChatList
            }
        },
        mounted () {
            if (this.$route.params.status) {
                this.status = this.$route.params.status;
            }
            this.getRecentList()


        }
    }
</script>

<style lang="less">
  .userList {
    width: 100%;
    height: calc(100% - 60px);
    background: #fff;
    overflow: auto;
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
    .listNull {
      width: 100%;
      height: 100%;
      background: #fff;
      text-align: center;
      padding-top: 20vh;
      box-sizing: border-box;
    }
    .active {
      background: #F1F2F7;
    }
    li {
      padding: 10px 12px 10px 18px;
      border-bottom: 1px solid #F1F2F7;
      position: relative;
      cursor: pointer;
      .ivu-badge {
        float: left;
        margin-top: 4px;
      }
      .ivu-badge-count {
        width: 15px;
        height: 15px;
        min-width: 15px;
        top: -5px;
        padding:0;
        line-height: 12px;
      }
      .userName {
        margin-left: 20px;
        display: inline-block;
        float: left;
        .nickName {
          font-size:14px;
          color: #434349;
          display: block;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          }
        .recentNews {
          font-size:12px;
          color: #6C7293;
          display: block;
          width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .time {
        position: absolute;
        right: 12px;
        color: #6C7293;
      }
      &:hover {
        background: #F1F2F7;
      }
    }
  }

</style>
