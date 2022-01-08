<template>
  <div class="item-container">
	<n-searcher></n-searcher>
	<ul>
	  <li class="item-list">
		<div>{{todos.content}}</div>
		<p>{{todos.time}}</p>
		<a class="green tags"><span class="rect"></span><span class="triangle"></span></a>
	  </li>
	</ul>
  </div>
</template>

<script>
	import nSearcher from './searcher'

	export default {
	  data(){
	  	return{
  		  todos: {
  		  	id: 0,
			content: '事项一',
			type: 1,
			time: '2017-09-27'
  		  }
	  	}
	  },
	  components: {
	  	nSearcher,
	  }
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.item-container {
	  padding: 10px 16px 0;
	  .item-list {
	  	position: relative;
	  	margin-left: 26px;
	  	padding: 8px 0;
	  	border-bottom: 1px solid #e0e0e0;
	  }
	}
</style>
