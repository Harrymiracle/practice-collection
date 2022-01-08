<template>
	<div id="el_History">
		<nav>
			<span>
				<router-link to="/login/index1" class="el_back"><img src="../assets/left.png"></router-link>
				<span>历史任务</span>
				<router-link to="/login/index1/SerchPage" class="el_choose">筛选</router-link>
			</span>
		</nav>
		<div class="el_user">
			<div class="el_Statistics">
				<div v-for="(item,index) in Statistics" :key="item.id">
					<span>{{ item.times }}，</span>
					<span>已送装</span>
					<span class="el_number">{{ item.numbers1 }}&nbsp;<span>单，</span></span>
					<span>已售后</span>
					<span class="el_number">{{ item.numbers2 }}&nbsp;<span>单。</span></span>
				</div>
			</div>
			<router-link to='/login/index1/SerchPage/allotList/userinfor' class="el_userinfor" v-for='(item,index) in infrom' :key="item.id">
				<div class="el_inform">
					<span>{{ item.numbers }}</span>
					<span>{{ item.state }}</span>
				</div>
				<div class="el_userinform">
					<p>
						<img src="../assets/pepole.png"/>
						{{ item.username }}
						{{ item.phone }}
					</p>
					<p>
						<img src="../assets/Location.png"/>
						{{ item.address }}
					</p>
				</div>
				<div class="el_bank"></div>
			</router-link>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				infrom : [{
					id : '1',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003'
				},{
					id : '2',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003'
				},{
					id : '3',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003'
				},{
					id : '4',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003'
				}],
				Statistics : [{
					id : '5',
					times : '2017/03',
					numbers1 : 88,
					numbers2 : 99
				}]
			}
		}
	}
</script>

<style>
	#el_History>nav{
		width: 750px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
	}
	#el_History>nav>span{
		display: inline-block;
		width: 750px;
		height: 80px;
		margin: 0 auto;
		line-height: 80px;
		background: #00916c;
		text-align: center;
		font-size: 32px;
		color: #fff;
		position: relative;
	}
	#el_History>nav>span>.el_back{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	#el_History>nav>span>.el_choose{
		position: absolute;
		display: block;
		right: 50px;
		top: 0;
		color: #fff;
	}
	.el_Statistics{
		height: 100px;
		line-height: 100px;
		font-size: 32px;
		color: #999;
		border-bottom: 1px solid #ccc;
	}
	.el_Statistics>div{
		margin-left: 20px;
	}
	.el_Statistics>div>.el_number{
		color: red;
	}
	.el_Statistics>div>.el_number>span{
		color: #999;
	}
	.el_inform{
		height: 80px;
		border-bottom: 1px solid #e7e7e7;
		font-size: 28px;
		line-height: 80px;
	}
	.el_inform>span:nth-child(1){
		color: red;
		margin-left: 20px;
	}
	.el_inform>span:nth-child(2){
		float: right;
		margin-right: 40px;
	}
	.el_userinform{
		height: 160px;
		border-bottom: 1px solid #e7e7e7;
		box-sizing: border-box;
	}
	.el_userinform>p{
		font-size: 28px;
		margin-left: 20px;
		margin-top: 60px;
	}
	.el_userinform>p:nth-child(1)>span:nth-child(3){
		margin-left: 40px;
	}
	.el_userinform>p>img{
		width: 40px;
		height: 40px;
		vertical-align: middle;
	}
	.el_bank{
		width: 100%;
		height: 20px;
		background: #f2f2f2;
	}
	.el_user{
		height: calc(100% - 80px);
		overflow-y: auto;
		margin-top: 80px;
	}
	.el_userinfor{
		color: #000;
	}
</style>