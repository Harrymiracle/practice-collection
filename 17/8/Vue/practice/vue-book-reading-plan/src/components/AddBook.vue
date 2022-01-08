<template>
	<div class="form-horizontal">
		<div class="form-group">
			<div class="col-sm-6">
				<label>书名</label>
				<input type="text" class="form-control" v-model="plannedBook.bookName" placeholder="输入书名" />
			</div>
			<div class="col-sm-6">
				<label>使用时间</label>
				<input type="number" class="form-control" v-model="plannedBook.useDay" placeholder="预计天数" />
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-6">
				<label>开始时间</label>
				<input type="date" class="form-control" v-model="plannedBook.startTime" placeholder="Date" />
			</div>
			<div class="col-sm-6">
				<label>结束时间</label>
				<input type="date" class="form-control" v-model="plannedBook.endTime" placeholder="Date" />
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-12">
				<label>书籍、计划</label>
				<input type="text" class="form-control" v-model="plannedBook.intro" placeholder="书籍简介及计划简要" />
			</div>
		</div>
		<button class="btn btn-primary" @click="save()">保存</button>
		<router-link :to="'/show-book'">
			<a class="btn btn-primary">取消</a>
		</router-link>

		<hr />
	</div>
</template>

<script>
	import store from '../store'

	export default {
		data () {
			return {
				plannedBook: {
					reader: {
						firstName: 'Elon',
						lastName: 'Musk',
						image: 'https://1.gravatar.com/avatar/7f4ec37467f2f7db6fffc7b4d2cc8dc2?s=250&d=retro&r=g'
					}
				}
			}
		},
		methods: {
			save () {
				let plannedBook = this.plannedBook;
				if(Object.keys(plannedBook).length > 1){
					store.commit('booksupdate',plannedBook);
				}

				this.plannedBook = {
					reader: {
						firstName: 'Harry',
						lastName: 'Potter',
						image: 'https://s.gravatar.com/avatar/3f3d05f6b2a7b5136104223ad87ffe47?s=80'
					}
				}
			}
		}
	};
</script>

<style>
</style>