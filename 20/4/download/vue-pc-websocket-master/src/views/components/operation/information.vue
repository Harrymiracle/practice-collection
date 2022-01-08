<template>
    <div class="information">
      <div style="width: 100%;height: 100%;padding-top: 40%;text-align: center;" v-if="friendList.length === 0 && groupList.length === 0 && (chatList && chatList.length === 0)">
        <img class="contactImAppHeaderPic" style="width: 30px;height: 30px;" :src="icon.nothing" alt="">
        <div style="color: #6C7293;font-size: 14px;margin-top: 10px;">
          暂无更多资料~
        </div>
      </div>
      <div style="width: 100%;height: 100%;" v-else>
        <div class="personal" v-if="detailInfo.targetType === 1">
          <div class="head">
            <div class="avatar">
              <Avatar style="margin-left: 7px;" :src="avatarFormatter(detailInfo.contactImAppHeaderPic)?avatarFormatter(detailInfo.contactImAppHeaderPic):icon.personAvatar" size="large" shape="square" icon="md-person" />
              <div class="info_name">
                <span class="nickName">{{ detailInfo.contactImAppNickName }}</span>
                <div class="remark">
                  <span class="title" style="float:left;">备注：</span>
                  <div v-html="detailInfo.contacImAppNote" style="float: left;" ref="remark" :contenteditable="editStatus"></div>
                  <img :src="editStatus?icon.save:icon.edit" alt="" @click="editStatus?doSave(1):handleEdit(1)" v-show="false">
                </div>
              </div>
            </div>
          </div>
          <!--<div class="tags" v-show="false">-->
          <!--<p slot="title">-->
          <!--全部标签：-->
          <!--</p>-->
          <!--<Tag>意向客户</Tag>-->
          <!--<Tag>高价值客户</Tag>-->
          <!--<Tag>全部标签</Tag>-->
          <!--<Button icon="ios-add">添加</Button>-->
          <!--</div>-->
          <div class="emptyNotice"><div></div>暂无更多内容</div>
        </div>
        <div class="group" v-else>
          <div class="head">
            <div class="avatar">
              <Avatar style="margin-left: 7px;" size="large" :src="avatarFormatter(detailInfo.groupHeaderPic,true)" shape="square" icon="md-person" />
              <div class="info_name">
                <div class="remark">
                  <span class="title">群名称：</span>
                  <div class="groupName" v-html="detailInfo.groupName" ref="groupName" :contenteditable="editGroupNameStatus"></div>
                  <img :src="editGroupNameStatus?icon.save:icon.edit" alt="" @click="editGroupNameStatus?doSave(2):handleEdit(2)" v-show="false">
                </div>
                <div class="groupTotal">
                  <span style="color: #959CB6;">群成员：</span>
                  <span>{{ detailInfo.groupMemberCount }}</span>人
                </div>
              </div>
            </div>
          </div>
          <div class="announcement">
            <span class="remark">
                <span class="title">群公告：<img v-show="false" :src="editGroupAnnouncementStatus?icon.save:icon.edit" alt="" @click="editGroupAnnouncementStatus?doSave(3):handleEdit(3)"></span>
                <div style="overflow-y: auto" class="groupAnnouncement" v-html="detailInfo.notice" ref="groupAnnouncement" :contenteditable="editGroupAnnouncementStatus"></div>
                <div v-if="showMore" v-html="detailInfo.notice" ref="fullGroupAnnouncement" class="fullGroupAnnouncement"></div>
            </span>
            <span class="remark">
              <span class="title">我在本群中的昵称：<img v-show="false" :src="editGroupNickNameStatus?icon.save:icon.edit" alt="" @click="editGroupNickNameStatus?doSave(4):handleEdit(4)"></span>
              <div class="groupNickName" v-html="nickNameFormatter(detailInfo)" ref="groupNickName" :contenteditable="editGroupNickNameStatus"></div>
            </span>
          </div>
          <div class="groupList">
            <div class="search">
              <Input prefix="ios-search" v-model="searchObj.value" placeholder="搜索群成员" @on-change="getGroupMemberList" />
              </Input>
            </div>
            <ul v-if="groupMemberList.length">
              <li class="clearfix" v-for="(item,index) in groupMemberList" :class="{active:index == current}" @click="handleClick(index,item)">
                <Avatar size="large" shape="square" icon="ios-person" :src="item.headerPic" />
                <span class="nickName" v-html="item.nickName"></span>
              </li>
            </ul>
            <ul v-else-if="searchObj.value && !groupMemberList.length">
              <li>未找到“<span style="color: #f5a623;">{{searchObj.value}}</span>”关键字的结果</li>
            </ul>
            <ul v-else>
              <li style="text-align: center;">暂无信息~</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "information",
      data () {
          return {
            remark:'',
            groupName:'',
            groupAnnouncement:'',
            groupNickName:'',
            editGroupNickNameStatus:false,
            editGroupNameStatus:false,
            editGroupAnnouncementStatus:false,
            editStatus:false,
            searchText:'',
            showMore:false,
            current:0,
            searchObj:{
              value:'',
              name:"key",
              operation:"LIKE",
              type:"string"
            },

          }
      },
      computed: {
          userInfo () {
            return this.$store.state.userInfo;
          },
        detailInfo () {
          return this.$store.state.detailInfo;
        },
        groupMemberList () {
          return this.$store.state.groupMemberList;
        },
        isClean () {return this.$store.state.isClean},
        isEmpty () {
          return this.$store.state.isEmpty
        },
        friendList () {
          return this.$store.state.friendList;
        },
        groupList() {
          return this.$store.state.groupList;
        },
        chatList() {
          return this.$store.state.recentChatList
        },
          groupMemberAllList() {
              return this.$store.state.groupMemberAllList
          }
      },
      watch:{
        isClean:function (val) {// 列表点进来的清除搜索信息
          if (val) {
            this.searchObj.value = ''
          }
        },
      },
      methods:{
        handleClick (index,row) { // 点击群好友
          this.current =index;

        },
        nickNameFormatter (row) {
          let nickName = '';
          this.groupMemberAllList.map(val=>{
            if (val.contactImIdInApp === row.staffIdInApp) {
              nickName = val.nickName
            }
          });
          return nickName
        },
        doSave (n) { // 保存信息
          if (n ==1) { // 保存备注
            console.log( this.$refs.remark.innerHTML)
            this.editStatus = false
          } else if (n==2) { // 群名称保存
            console.log( this.$refs.groupName.innerHTML)
            this.editGroupNameStatus = false
          }else if (n==3) {
            console.log( this.$refs.groupAnnouncement.innerHTML)
            this.editGroupAnnouncementStatus = false
          }else if (n==4) {
            console.log( this.$refs.groupNickName.innerHTML)
            this.editGroupNickNameStatus = false
          }
        },
        // 编辑
        handleEdit (n) {
          switch (n) {
            case 1:// 编辑备注信息
              new Promise((resolve) =>{
                this.editStatus = true;
                resolve()
              }).then(() =>{
                this.$refs.remark.focus();
                var range = window.getSelection(); //创建range
                range.selectAllChildren(this.$refs.remark);
                range.collapseToEnd(); //光标移至最后
              });
            break;
            case 2:// 编辑群名称
              new Promise((resolve) =>{
                this.editGroupNameStatus = true;
                resolve()
              }).then(() =>{
                this.$refs.groupName.focus();
                var range = window.getSelection(); //创建range
                range.selectAllChildren(this.$refs.groupName);
                range.collapseToEnd(); //光标移至最后
              });
              break;
            case 3:// 编辑群公告
              new Promise((resolve) =>{
                this.editGroupAnnouncementStatus = true;
                resolve()
              }).then(() =>{
                this.$refs.groupAnnouncement.focus();
                var range = window.getSelection(); //创建range
                range.selectAllChildren(this.$refs.groupAnnouncement);
                range.collapseToEnd(); //光标移至最后
              });
              break;
            case 4:// 编辑群昵称
              new Promise((resolve) =>{
                this.editGroupNickNameStatus = true;
                resolve()
              }).then(() =>{
                this.$refs.groupNickName.focus();
                var range = window.getSelection(); //创建range
                range.selectAllChildren(this.$refs.groupNickName);
                range.collapseToEnd(); //光标移至最后
              });
              break;
            default:
            break;

          }

        },
        // 查询群成员
        getGroupMemberList () {
            this.$store.dispatch('getGroupMemberList',this.searchObj)
        }
      },

      mounted () {
      }
    }
</script>

<style lang="less">
  .information {
    height: 100%;
    .personal,.group {
      height: 100%;
      .title {
        color: #959CB6;
      }
      .head {
        height: 80px;
        padding: 0 10px;
        .avatar {
          height: 100%;
          padding-top: 20px;
          padding-left: 12px;
          border-bottom: 1px solid #E9EAEE;
          .ivu-avatar {
            float: left;
          }
          .info_name {
            float: left;
            display: inline-block;
            padding-left: 15px;
            .nickName {
              display: block;
              font-size: 13px;
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

            }
            .remark {
              display: block;
              font-size: 13px;
              div {
                margin: 0;
                width: auto;
                display: inline-block;
                padding-right: 8px;
                border-bottom: none;
                color: #434349;
                white-space:pre-wrap; /* css3.0 */
                white-space:-moz-pre-wrap; /* Firefox */
                white-space:-pre-wrap; /* Opera 4-6 */
                white-space:-o-pre-wrap; /* Opera 7 */
                word-wrap:break-word; /* Internet Explorer 5.5+ */
                max-width: 130px;
                overflow: hidden;
                margin-bottom: -3px;
                &.groupName {
                  max-width: 130px;
                  height: 18px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                &:focus {
                  text-decoration:underline;
                  outline: none;
                }
              }
              img {
                cursor: pointer;
                margin-bottom: -3px;
              }
            }
            .groupTotal {
              display: block;
              font-size: 13px;
              margin-top: 5px;
            }
          }

        }


      }
      .tags {
        height: calc(100% - 80px);
        padding: 10px 20px;
        color: #959CB6;
        font-size: 13px;
        .ivu-tag {
          height: 26px;
          line-height: 26px;
          margin-right: 8px;
          margin-top: 10px;
          padding: 0 11px;
          text-align: center;
          background: #F1F2F7;
          border-color:rgba(195,198,214,0.33);
          border-radius: 2px;
          .ivu-tag-text {
            color: #959CB6;
            font-size:12px;-webkit-transform:scale(0.8);
            transform:scale(0.8);

          }
        }
        .ivu-btn {
          height: 26px;
          padding: 2px 10px 1px 6px;
          color: #959CB6;
          margin-top: 10px;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          .ivu-icon {
            font-size: 22px;
            height: 22px;
            width: 15px;
            line-height: 18px;
          }

        }
      }
      .emptyNotice {
        height: calc(100% - 80px);
        text-align: center;
        div {
          height: 50%;
        }
      }
      .announcement {
        padding: 10px 20px 20px;
        border-bottom: 1px solid #E9EAEE;
        height: 180px;
        .remark {
          display: block;
          font-size: 13px;
          position: relative;
          .fullGroupAnnouncement {
            position: absolute;
            padding: 10px;
            background: rgba(0,0,0,.5);
            color: #fff;
            z-index: 2;
          }
            div {
              margin: 0;
              width: auto;
              display: inline-block;
              padding-right: 8px;
              border-bottom: none;
              color: #434349;
              white-space:pre-wrap; /* css3.0 */
              white-space:-moz-pre-wrap; /* Firefox */
              white-space:-pre-wrap; /* Opera 4-6 */
              white-space:-o-pre-wrap; /* Opera 7 */
              word-wrap:break-word; /* Internet Explorer 5.5+ */
              &.groupNickName {
                display: block;
                margin-top: 5px;
              }
              &.groupAnnouncement {
                display: block;
                margin-top: 5px;
                margin-bottom: 15px;
                height: 65px;
                line-height: 23px;
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
                  background: #ffffff;
                }
              }
              &:focus {
                text-decoration:underline;
                outline: none;
              }
            }
          img {
            cursor: pointer;
            margin-bottom: -3px;
          }
        }
      }
      .groupList {
        height: calc(100% - 260px);
        .search {
          padding: 20px 10px 10px;
          .ivu-input {
            background: #F1F2F7;
            border-radius:2px;
            border: none;
          }
        }
        ul {
          height: calc(100% - 62px);
          overflow: auto;
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
          li {
            list-style: none;
            padding: 10px 20px ;
            &.active {
              background: #F1F2F7;
            }
            &:hover {
              background: #F1F2F7;
            }
            .ivu-avatar-large.ivu-avatar-icon {
              float: left;
            }
            .nickName {
              display: inline-block;
              height: 40px;
              line-height: 40px;
              margin-left: 20px;
              font-size: 14px;
              max-width: 180px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }

          }
        }


      }
    }

  }

</style>
