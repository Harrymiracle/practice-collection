<template>
  <div id="app">
  	<h1>书籍记录单</h1>
  	<ul>
  		<router-link tag="li" to="/"><a>主页</a></router-link>
			<router-link tag="li" to="/Detail"><a>列表详情</a></router-link>
			<router-link tag="li" to="/Add"><a>增加书名</a></router-link>
  	</ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
	html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
		margin: 0; padding: 0;
	}


	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 20px;
	  margin-bottom: 10px;
	}
	h1 {
		color: #222;
		font-size: .6rem;
	}
	ul {
	  	list-style-type: none;
	  	padding: 0;
	}
	li {
	  	display: inline-block;
	 	margin: 0 .1rem;
	 	font-size: .32rem;
	 	padding: .1rem;
	 	font-weight: bold;
	}
	a {
	  	color: tomato;
	  	text-decoration: none;
	}
	.left {float:left;}
	.right {float:right;}
	.both {clear:both;}
	.clearfix:after {content:''; clear:both; display:block; height:0; overflow:hidden; visibility:hidden;}
</style>
