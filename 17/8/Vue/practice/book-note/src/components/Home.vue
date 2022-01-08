<template>
	<div >
		<h3>这是一个记录书籍的清单列表</h3>
		<img src="./../assets/book_bg.jpg">
	</div>
	
</template>

<script>
	export default {
	  
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	ul {
	  	list-style-type: none;
	  	padding: 0;
	}
	li {
	  	display: inline-block;
	 	margin: 0 10px;
	}
	a {
	  	color: tomato;
	  	text-decoration: none;
	}
	h3{
		padding: 0.1rem 0; 
		font-size: .4rem;
	}
	img{
		width: 80%;
	}

</style>
