<template>
  <div class="detialInfo">
    <template v-if="friendList.length !==0 || groupList.length!==0 || searchObj.value">
      <img class="contactImAppHeaderPic" :src="detailInfo.targetType === 1?avatarFormatter(detailInfo.headerPic):avatarFormatter(detailInfo.headerPic,true)" alt="">
      <div class="contactImAppNickName" >{{ detailInfo.name }}</div>
      <Button type="primary" @click="sendBtn()">发消息</Button>
    </template>
    <template v-else>
      <img class="contactImAppHeaderPic" style="width: 30px;height: 30px;" :src="icon.nothing" alt="">
      <div style="text-align: center; font-size: 14px; color:#6C7293;">
        <p>还没有能聊的对象，</p>
        <p>需要登录微信同步好友或联系管理员分配～</p>
      </div>
      <Button type="primary" @click="$store.state.showQrcode = true">扫码同步</Button>
    </template>
  </div>
</template>

<script>
    export default {
        name: "detailInfo",
        props:{
            searchObj:Object
        },
        data() {
            return {
            }
        },
        computed:{
            friendList () {
                return this.$store.state.friendList;
            },
            groupList() {
                return this.$store.state.groupList;
            },
            detailInfo() {
                return this.$store.state.detailInfo;
            }
        },
        methods:{
            // 通讯录发送消息
            sendBtn () {
                this.$store.state.messageLength=20;
                this.$store.state.isEmpty =false;
                this.$router.push({
                    name:'chatList',
                    params:{
                        status:true
                    }
                });
            },
        },
        mounted() {
        }
    }
</script>

<style lang="less">
  .detialInfo {
    height: 100%;
    width: 100%;
    padding-top: 25%;
    text-align: center;
    border: 1px solid #E9EAEE;
    border-left: 0;
    border-top: 0;
    .contactImAppHeaderPic {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
    .contactImAppNickName {
      margin-top: 10px;
      font-size: 16px;
    }
    .ivu-btn {
      margin-top: 10px;
      width: 100px;
      font-size: 14px;
    }
  }

</style>
