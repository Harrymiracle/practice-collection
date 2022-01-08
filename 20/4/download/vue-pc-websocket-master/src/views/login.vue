<template>
    <div class="login"  @keydown.enter="handleSubmit()">
      <div class="loginBox">
        <div class="logo_title">
          <img :src="icon.logo_title" alt="">
        </div>
        <div class="login_part">
          <div class="login_text">登录LOGIN</div>
          <Form ref="loginForm" :model="loginInfo" :rules="loginInfoRules" >
            <FormItem prop="companyCode">
              <Input type="text" v-model="loginInfo.companyCode" placeholder="企业标识...">
              </Input>
            </FormItem>
            <FormItem prop="loginName">
              <Input type="text" v-model="loginInfo.loginName" placeholder="用户名...">
              </Input>
              <div class="ivu-form-item-error-notice"></div>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="loginInfo.password" placeholder="密码...">
              </Input>
              <div class="ivu-form-item-error-notice"></div>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit()">登录</Button>
            </FormItem>
          </Form>
          <div>
            <Checkbox v-model="rememberCheck"><span :style="{color:rememberCheck?'#f5a623':''}">记住标识码和用户名</span></Checkbox>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import $ from 'jquery';
    export default {
        name: "login",
      data () {
          return {
            loginInfo:{
              companyCode:'',
              loginName:'',
              password:'',

            },
            // companyCodeError:'',
            // loginNameError:'',
            // passwordError:'',
            loginInfoRules: {
              companyCode: [
                { required: true, message: '请输入企业标识', trigger: 'blur' }
              ],
              loginName: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],
            },
            rememberCheck:false
          }
      },
      methods:{
        handleSubmit() {
          // this.companyCodeError='';
          // this.loginNameError='';
          // this.passwordError='';
          this.$refs.loginForm.validate((valid) => { // 登录
            if (valid) {
              let date = new Date().getTime();
              let data={
                companyCode:this.loginInfo.companyCode,
                loginName:this.loginInfo.loginName,
                loginPass:this.encrypt( this.loginInfo.password + '|-|' + date, 'uusafeuusafeuusafeuusafe')
              };
              this.$store.dispatch('post',{url:'uusafe/ucp/auth/rest/authByLoginName',data:data}).then((res)=>{
                if (res) {
                  if (Number(res.code) === 1000 || Number(res.code) === 33 || Number(res.code) === 31 ) {
                    //this.companyCodeError = res.msg;
                      this.$Notice.error({
                          title: '企业标识码/用户名/密码错误！'
                      });
                    return
                  } else if (Number(res.code) === 32) {
                      this.$Notice.error({
                          title: '您的账号已被停用，请联系管理员!'
                      });
                  }
                  else if (Number(res.code) === 0) {
                    sessionStorage.clear();
                    sessionStorage.setItem('loginName',this.loginInfo.loginName);
                    sessionStorage.setItem('companyCode',this.loginInfo.companyCode);
                    if (this.rememberCheck) { // 勾选记住标识符 存储信息到localstorage
                      localStorage.setItem('companycode',this.loginInfo.companyCode);
                      localStorage.setItem('loginname',this.loginInfo.loginName);
                    }else {
                      localStorage.clear();// 清空localstorage
                    }
                    let loginInfo ={
                      loginName:res.loginName,
                      staffId:res.staffId,
                      userId:res.userId,
                      userName:res.userName,
                      companyCode:this.loginInfo.companyCode
                    };
                    this.$store.commit('setLoginInfo',loginInfo);
                      this.$Spin.show({
                          render: (h) => {
                              return h('div', [
                                  h('Icon', {
                                      'class': 'demo-spin-icon-load',
                                      props: {
                                          type: 'ios-loading',
                                          size: 18
                                      }
                                  }),
                                  h('div', 'Loading')
                              ])
                          }
                      });
                      setTimeout(() => {
                          this.$Spin.hide();
                          this.$router.push({
                              name: "chatList"
                          });
                      },0);

                  }else {
                    this.$Notice.error({
                      title: '服务器异常！',
                    });
                  }


                }
              });
            } else {
            }
          });
        }
      },
      mounted () {
          if (localStorage.getItem('companycode')) {// 记住标识和用户名
            this.loginInfo.companyCode = localStorage.getItem('companycode');
            this.loginInfo.loginName = localStorage.getItem('loginname');
            this.rememberCheck = true;
          };
          this.$nextTick(function () {
            if ($(".ivu-notice .ivu-notice-notice").length>1) {// 限制提醒只弹一次
              $(".ivu-notice").html($(".ivu-notice .ivu-notice-notice")[0]);
            }
          })

      }
    }
</script>

<style lang="less">
  .login {
    height: 100%;
    width: 100%;
    background: #e7ebee url("../assets/images/login_bg.png") no-repeat;
    -webkit-background-size: 100% 50%;
    background-size: 100% 58%;
    min-height: 700px;
    .ivu-form-item-error-notice {
      position: absolute;
      top: 100%;
      left: 0;
      line-height: 1;
      padding-top: 6px;
      color: #ed4014;
    }
    .loginBox {
      width: 100%;
      padding-top: 8vh;
      .login_text {
        font-size: 26px;
        color: rgb(96, 98, 102);
        line-height: 36px;
        letter-spacing: 0px;
        margin-bottom: 30px;
      }
      .logo_title {
        width: 568px;
        margin: 0 auto 15px;
        text-align: center;

      }
      .login_part {
        width: 400px;
        background: #fff;
        margin: auto;
        box-shadow: 0 0 1px 2px rgba(75,88,157,.1);
        padding: 30px;
        .ivu-input {
          height: 40px;
          padding: 0 15px;
          font-size: 14px;
        }
        .ivu-btn {
          height: 40px;
          width: 100%;
          font-size: 14px;
          padding: 0;
        }
        .ivu-checkbox {
          padding-right: 8px;
        }
        .ivu-checkbox-wrapper {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .company_msg {
      padding-top: 14vh;
      width: 100%;
      font-size: 12px;
      opacity: .76;
      color: #2d2c2f;
      letter-spacing: 1.8px;
      text-align: center;
      a {
        color: #606266;
      }
    }
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .ivu-icon-ios-close-circle {
    font-size: 24px;
  }
  .ivu-notice .ivu-notice-with-icon .ivu-notice-title {
    margin-left: 30px;
    line-height: 18px;
  }
</style>
