<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#"> 
          <i class="glyphicon glyphicon-calendar"></i>
          阅读计划
        </a>
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/"><a>首页</a></router-link>
          <router-link tag="li" to="/show-book"><a>书籍列表</a></router-link>
          <router-link tag="li" to="/detail"><a>书本详情</a></router-link>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <sidebar :gotBooks="plannedBooks"></sidebar>
        </div>
        <div class="col-sm-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import store from './store'

  export default {
    components: {'sidebar': Sidebar},
    computed: {
      plannedBooks(){
        return store.state.plannedBooks;
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
