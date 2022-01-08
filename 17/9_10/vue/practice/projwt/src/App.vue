<template>  
  <div id="app">  
  	<!--<div id="nav">
	  	<router-link to="/come">Come</router-link>
  	</div>-->
    <transition :name="transitionName">  
      <router-view class="child-view"></router-view>  
    </transition>  
  	
  </div>  
</template>  
  
<script>  
  
export default {  
  name: 'app',  
  data () {  
    return {  
      transitionName: 'slide-left'  
    }  
  },  
  mounted () {  
  },  
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {
	  '$route' (to, from) {
//	  	console.log('现在路由:',to.path.split('/')[1],'来自路由:',from.path.split('/')[1],'现在的动画:',this.transitionName)
	    const toDepth = to.path.split('/').length
	    const fromDepth = from.path.split('/').length
	    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
	  }
	}  
}  
</script>  
  
<style> 
*{
	margin: 0;
	padding: 0;
} 
a{
	text-decoration: none;
}
#nav{
  margin: 80px auto;
}
.child-view { 
	position: absolute;
	left: 0;
	top: 0;
  width: 100%;  
  height: 100%;  
  transition: all .4s cubic-bezier(.55,0,.1,1);  
}  
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  
</style> 