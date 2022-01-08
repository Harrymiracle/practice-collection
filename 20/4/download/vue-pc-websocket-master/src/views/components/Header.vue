<template>
  <div class="header">
    <div class="container">
      <div class="left">
        <img :src="icon.logo" width="34" height="39" alt="">
        <span class="header_title">掌上微客服</span>
        <span class="header_subTitle">V1.0</span>
      </div>
      <div class="right">
        <Dropdown @on-click="logout" trigger="click" style="margin-top: 18px">
          <Avatar size="small" icon="ios-person" :src="icon.personAvatar" /><span class="user">{{ userName }}</span>
          <DropdownMenu  slot="list">
            <DropdownItem>退出登录</DropdownItem>

          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="qrCode">
        <img @click="showCodeModal()" :src="icon.scanner"  alt="">
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {

        }

      },
      computed:{
        userName () {// 业务员名称
          return this.$store.state.loginInfo.loginName

        }
      },
      methods:{
        logout () {
          this.$store.commit('logout');
        },
        showCodeModal() {
          this.$store.state.showQrcode = true
        }
      }
    }
</script>

<style lang="less">
  .header {
    width: 100%;
    min-width: 1200px;
    height: 60px;
    background: #000;
    color: #fff;
    .container {
      width: 1200px;
      margin: auto;
      .left {
        float: left;
        img {
          margin-top: 10px;
          float: left;
        }
        span {
          float: left;
          display: inline-block;
          &.header_title {
            font-size: 20px;
            font-weight:600;
            line-height: 60px;
            margin-left: 8px;
          }
          &.header_subTitle {
            font-size: 16px;
            line-height: 55px;
            margin-left: 4px;
            color: rgba(255,255,255,.7);
          }

        }

      }
      .qrCode {
        float: right;
        margin-right: 20px;
        line-height: 60px;
        margin-top: 7px;
        img {
          cursor: pointer;
        }
      }
      .right {
        float: right;
        .ivu-dropdown {
          cursor: pointer;
          position: relative;
          width: 100%;
          .ivu-select-dropdown {
            width: 100%;
            min-width: 80px;
            .ivu-dropdown-menu {
              min-width: 80px;
            }
          }
        }
        .user {
          float: right;
          color: rgba(255,255,255,.7);
          font-size: 14px;
          margin-left: 6px;
          display: inline-block;
          height: 24px;
          line-height: 24px;
        }
      }
    }
  }
</style>
