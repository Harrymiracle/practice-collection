<template>
  <div id="container">
    <div class='header'>
      <ul>
        <li> <router-link to="/home">注册</router-link></li>
        <li> <router-link to="/index">登录</router-link></li>
        <li> <router-link to="/">首页</router-link></li>
      
      </ul>
    </div>
    <div class='content'>
      <div class='rightContent'>
        <div class='inner'><router-view></router-view></div>
      </div>
      <div class='leftNav'>
        <ul>
          <li> <router-link to="/aboutme">关于我的</router-link></li>
          <li> <router-link to="/msg">账户信息</router-link></li>
          <li> <router-link to="/manage">工作中心</router-link></li>
        </ul>
      </div>
    </div>
    <div class='footer'>
      <p>蜀ICP备11007021号-1@贾小燕</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
.header{
  width:100%;
  height:80px;
  background:#95c4d1;
}
.header>ul{overflow:hidden}
.header>ul>li{float:right;padding:20px;}
.footer{
   width:100%;
  height:60px;
  background:#e3e3e3;
  line-height:60px;
}
.content{
width:100%;
background:#eee;
 height:100%;
 overflow:hidden;
}

.leftNav{
  width:160px;
  height:100%; 
  background:#dac1c1; 
  float:left;
  margin-left:-100%;
}
.leftNav ul{padding:20px;}

.leftNav ul li a{color:#487b89;text-align:left; width:160px;display:block;padding:20px 0;}
.rightContent{width:100%;height:100%;float:left;}
.inner{margin-left:160px;height:100%;}

ul li{list-style:none;}
a{text-decoration:none;color:#f8f8f8;font-size:24px;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
