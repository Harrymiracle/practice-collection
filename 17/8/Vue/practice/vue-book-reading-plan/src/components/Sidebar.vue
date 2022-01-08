<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="text-center">书名</h3>
		</div>

		<div class="panel-body">
			<P v-if="!gotBooks.length"><strong>暂无,请添加!</strong></P>

			<ul class="list-group">
				<router-link tag="li" to="/detail" v-for="(gotBook,index) in gotBooks" :key="index" class="list-group-item list-group-item-info">
					<a>{{gotBook.bookName}}</a>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import store from '../store';

	export default {
		props: ['gotBooks']
	};
</script>

<style>
	a:hover{
		text-decoration: none;
	}
</style>