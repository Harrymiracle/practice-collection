<template>

  <div id="app">
    <div class='header'>
      <ul>
         <li> <router-link to="/home">注册</router-link></li>
        <li> <router-link to="/index">登录</router-link></li>
        <li> <router-link to="/index1">首页</router-link></li>
      
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
  background:#84dac5;
}
.header>ul{overflow:hidden}
.header>ul>li{float:right;padding:20px;}

.content{
width:100%;
background:#eee;
 height:100%;
 overflow:hidden;
}

.leftNav{
  width:160px;
  height:100%; 
  background:#f8f8f8; 
  float:left;
  margin-left:-100%;
}
.leftNav ul{padding:20px;}

.leftNav ul li a{color:#487b89;text-align:left; display:block;padding:20px 0;}
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
