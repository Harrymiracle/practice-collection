<template>
	<div class="searcher">
		<input class="n-input" placeholder="搜索笔记" @keyup.enter="search($event)" />
	</div>
</template>

<script>
	export default {
		name: 'searcher',
		methods: {
			search(e){
				alert(e.target.value);
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
  .searcher {
  	margin-bottom: 4px;
  	.n-input {
		width: 100%;
		height: 30px;
		background: #eee;
		border-radius: 15px;
		padding: 5px 26px;
        &:focus {
            outline: none;
        }
	}
  }
	
</style>
