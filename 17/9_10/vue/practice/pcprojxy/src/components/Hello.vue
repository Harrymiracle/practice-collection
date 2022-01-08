<template>
  <div class="hello">
    <div class='nav'>
      <ul>
         <li> <router-link to="/">首页1</router-link></li>
         <li> <router-link to="/index2">首页2</router-link></li>
        
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '首页'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav ul{overflow:hidden;background:#f8f8f8;}
.nav ul li{}
.nav ul li a{display:block; float:left;hieght:60px;width:100px;padding:10px;}
h1 {
  font-weight: normal;  
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;text-decoration:none;
}
.hello{height:100%;margin:30px;background:#fff;}
</style>
