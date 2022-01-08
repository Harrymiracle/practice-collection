<template>
<div class="searchList" v-if="searchList.length">
  <template v-if="!searchList[0].length && !searchList[1].length">
    <div style="background: #fff;height: 100%;text-align: center;padding: 20px 10px 0;">
      <span>未找到“<span style="color: #f5a623;">{{searchObj.value}}</span>”关键字的结果</span>
    </div>
  </template>
  <template v-else>
    <div v-if="searchList[0].length">
      <div class="searchTitle">好友</div>
      <ul>
        <li class="clearfix" v-for="(item,index) in searchList[0]" @click="handleSearchClick(index,2,item)">
          <Badge>
            <Avatar shape="square" icon="md-person" :src="avatarFormatter(item.contactImAppHeaderPic)" />
          </Badge>
          <div class="userName" style="line-height: 40px;">
            <div class="nickName">
              {{ item.contactImAppNickName }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="searchList[1].length">
      <div class="searchTitle">群组</div>
      <ul>
        <li class="clearfix" v-for="(item,index) in searchList[1]" @click="handleSearchClick(index,1,item)">
          <Badge >
            <Avatar shape="square" icon="md-person" :src="avatarFormatter(item.groupHeaderPic,true)" />
          </Badge>
          <div class="userName" style="line-height: 40px;">
            <div class="nickName">
              {{ item.groupName }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
</div>
</template>

<script>
    export default {
        name: "searchList",
        props:{
            searchObj:Object
        },
        data() {
            return {

            }
        },
        methods:{
            handleSearchClick (index,num,row) { // 搜索框查询之后点击事件
                if (num === 2) {
                    row.targetId = row.contactImIdInApp
                    this.$store.commit('setUserInfo',row);
                    this.$store.dispatch('getDetailInfo')
                    this.$store.dispatch('getSelfInfo')
                } else if (num === 1) {
                    row.targetId = row.groupImIdInApp
                    this.$store.commit('setUserInfo',row);
                    this.$store.dispatch('getGroupInfo')
                    this.$store.dispatch('getSelfInfo')
                    this.$store.dispatch('getGroupMemberList')
                }
                //this.$store.state.isSearch = false;

            },
        },
        computed :{
            searchList () {
                return this.$store.state.searchList
            }
        },
    }
</script>

<style lang="less">
  .searchList {
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
    .searchTitle {
      padding: 5px 12px;
      font-size: 14px;
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
          max-width: 110px;
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
