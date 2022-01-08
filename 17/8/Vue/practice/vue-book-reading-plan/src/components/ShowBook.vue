<template>
	<div>
		<router-link v-if="$route.path !== '/show-book/add-book'" to="show-book/add-book" class="btn btn-primary">
			添加阅读计划 
		</router-link>
		<div v-if="$route.path === '/show-book/add-book'">
			<h3>阅读计划</h3>
		</div>

		<hr />
		<router-view></router-view>

		<div class="show-book">
			<p v-if="!plannedBooks.length"><strong>请添加计划阅读的书籍。</strong></p>

			<div class="list-group">
				<a class="list-group-item" v-for="plannedBook in plannedBooks">
					<div class="row">
						<div class="col-sm-2 book-details">
							<img :src="plannedBook.reader.image" class="avatar img-circle img-responsive" />
							<p class="text-center">
								<strong>
									{{plannedBook.reader.firstName}}
									{{ plannedBook.reader.lastName}}
									
								</strong>
							</p>
						</div>

						<div class="col-sm-2 text-center time-block">
							<h3 class="list-group-item-text total-time">
								<i class="glyphicon glyphicon-time"></i> {{plannedBook.useDay}}
							</h3>
							<p class="label label-primary text-center">
								<i class="glyphicon glyphicon-calendar"></i> {{ plannedBook.startTime }}
							</p>
							<p class="label label-primary text-center">
								<i class="glyphicon glyphicon-calendar"></i> {{ plannedBook.endTime }}
							</p>
						</div>

						<div class="col-sm-7">
							<p>{{plannedBook.intro}}</p>
						</div>

						<div class="col-sm-1">
							<button class="btn btn-xs btn-danger delete-button" @click="deleteBook(plannedBook)"> X </button>
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store'

	export default {
		methods: {
			deleteBook (plannedBook) {
				if(window.confirm('您确定要删除计划列表中该书籍的信息吗？')){
					store.commit('booksdelete',plannedBook);
				}
			}
		},
		computed: {
			plannedBooks(){
				return store.state.plannedBooks;
			}
		}
	};
</script>

<style>
	.avatar {
		height: 75px;
		margin: 0 auto;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.book-details {
		background-color: #f5f5f5;
		border-right: 1px solid #ddd;
		margin: -10px 0;
	}
	.time-block {
		padding: 10px;
	}
	.comment-section {
		padding: 20px;
	}
</style>