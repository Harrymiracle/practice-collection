<template>
<div class="adressList">
  <Collapse v-model="value1" :accordion="true">
    <Panel name="1">
      全部好友（{{ friendList.length?friendList.length:0 }}）
      <div slot="content">
        <ul >
          <li class="clearfix" v-for="(item,index) in friendList" :class="{active:index == current1}" @click="handleClick(index,2,item)">
            <Avatar size="large" shape="square" icon="md-person" :src="avatarFormatter(item.contactImAppHeaderPic)" />
            <span class="nickName" @mouseleave="hideFull($event)" @mouseenter="showFull(item.contactImAppNickName,$event)">{{ item.contactImAppNickName }}</span>
            <span class="fullName">{{ item.contactImAppNickName }}</span>
          </li>
        </ul>
      </div>
    </Panel>
    <Panel name="2">
      所有群（{{ groupList.length?groupList.length:0 }}）
      <div slot="content">
        <ul >
          <li class="clearfix" v-for="(item,index) in groupList" :class="{active:index == current}" @click="handleClick(index,1,item)">
            <Avatar size="large" shape="square" icon="md-person" :src="avatarFormatter(item.groupHeaderPic,true)" />
            <span class="nickName" @mouseleave="hideFull($event)" @mouseenter="showFull(item.groupName,$event)">{{ item.groupName }}</span>
            <span class="fullName">{{ item.groupName }}</span>
          </li>
        </ul>

      </div>
    </Panel>


  </Collapse>
</div>
</template>

<script>
  import jQ from 'jquery'
    export default {
        name: "adressList",
        props:{
            searchObj:Object
        },
      data () {
          return {
            value1:"0",
            current:'none',
            current1:'none',
          }
      },
      computed:{
          friendList() {
              return this.$store.state.friendList
          },
          groupList() {
              return this.$store.state.groupList
          },
          detailInfo() {
              return this.$store.state.detailInfo
          }
      },
      methods:{
          showFull (name,event) {
            if (name.length>9) {
              event.target.nextElementSibling.style.display = 'block';
            }
          },
        hideFull (event) {
          event.target.nextElementSibling.style.display = 'none';
        },
        handleClick (index,num,row) {
            this.$store.state.isEmpty =false;
          if (num === 1) {
              this.current =index;
              this.current1 ='none';
              row.targetId = row.groupImIdInApp
              this.$store.commit('setUserInfo',row);
              this.$store.dispatch('getGroupInfo')
              this.$store.dispatch('getSelfInfo')
              this.$store.dispatch('getGroupMemberList')
          } else {
            this.current1 =index;
            this.current ='none';
            row.targetId = row.contactImIdInApp
            this.$store.commit('setUserInfo',row);
            this.$store.dispatch('getDetailInfo')
            this.$store.dispatch('getSelfInfo')
          };
        }
      },
      mounted () {
          this.$store.dispatch('getFriendsList',this.searchObj)
          this.$store.dispatch('getGroupList',this.searchObj)
          if (this.detailInfo.targetType === 0) {
              this.$store.dispatch('getGroupMemberList')
          }
          this.$nextTick(function () {
            let str = `<img src="${this.icon.sanjiao}" alt=""/>`
            jQ('.adressList .ivu-icon-ios-arrow-forward').append(str);
            if (!this.groupList.length) {
              this.$store.commit('setGroupMemberList',[]);
            }
          })
      }

    }
</script>

<style lang="less" >
.adressList {
  width: 100%;
  height: calc(100% - 60px);
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
  .ivu-collapse {
    background: #fff;
    border: 0;
    .ivu-collapse-item {
      border: 0;
      .ivu-collapse-header {
        border-bottom: 1px solid #dcdee2;
        height: 59px;
        line-height: 59px;
        font-size: 16px;
        color: #959CB6;
        .ivu-icon {
          font-size: 24px;
        }
      }
      .ivu-collapse-content {
        padding: 0;
        .ivu-collapse-content-box {
          padding: 0;
          .active {
            background: #F1F2F7;
          }
          li {
            list-style: none;
            position: relative;
            padding: 10px 12px 10px 18px;
            border-bottom: 1px solid #F1F2F7;
            cursor: pointer;
            &:hover {
              background: #F1F2F7;
            }
            .nickName {
              display: inline-block;
              height: 40px;
              line-height: 40px;
              margin-left: 15px;
              font-size: 14px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: calc(100% - 55px);
              float: left;
            }

            .ivu-avatar {
              float: left;
            }
            .fullName {
              display: none;
              background: #fff;
              box-shadow: 0 3px 7px 7px rgba(0,0,0,0.08);
              position: absolute;
              width: 180px;
              z-index: 2;
              padding: 12px;
              left: 50%;
              margin-left: -90px;
              top: 49px;
              &::before {
                content: "";
                display: block;
                width: 0;
                height: 0;
                border-right: 6px solid transparent;
                border-left: 6px solid transparent;
                border-top: 6px solid transparent;
                border-bottom: 6px solid #fff;
                position: absolute;
                top: -12px;
                left: 50%;
              }
            }
          }
        }
      }

    }
  }

}
</style>
