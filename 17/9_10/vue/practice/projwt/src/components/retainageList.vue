<template>
	<div id="el_retainageList">
		<nav>
			<span>
				<router-link to="/login/index1"><img src="../assets/left.png"></router-link>
				<span>收尾款列表</span>
			</span>
		</nav>
		<div class="el_user">
			<router-link to='/login/index1/SerchPage/allotList/userinfor' class="el_userinfor" v-for='(item,index) in infrom' :key="item.id">
				<div class="el_inform">
					<span>{{ item.numbers }}</span>
					<span>{{ item.state }}</span>
				</div>
				<div class="el_userinform2">
					<p>
						<img src="../assets/pepole.png"/>
						{{ item.username }}
						{{ item.phone }}
					</p>
					<p>
						<img src="../assets/Location.png"/>
						{{ item.address }}
					</p>
					<p>
						<img src="../assets/money2.png"/>
						<span>尾款金额</span>
						{{ item.retainge }}
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
					address:'成都市青羊区时尚青年城3栋2单元2003',
					retainge:'￥8888.00'
				},{
					id : '2',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003',
					retainge:'￥8888.00'
				},{
					id : '3',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003',
					retainge:'￥8888.00'
				},{
					id : '4',
					numbers:'A8888888888888888888',
					state:'送装任务-销售',
					username:'张先生',
					phone:'1888888888',
					address:'成都市青羊区时尚青年城3栋2单元2003',
					retainge:'￥8888.00'
				}]
			}
		}
	}
</script>

<style>
	#el_retainageList>nav{
		width: 750px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
	}
	#el_retainageList>nav>span{
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
	#el_retainageList>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
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
	.el_userinform2{
		border-bottom: 1px solid #e7e7e7;
		box-sizing: border-box;
	    box-sizing: border-box;
    	padding-bottom: 20px;
	}
	.el_userinform2>p{
		font-size: 28px;
		margin-left: 20px;
		margin-top: 60px;
		display: inline-block;
	}
	.el_userinform2>p:nth-child(1)>span:nth-child(3){
		margin-left: 40px;
	}
	.el_userinform2>p:last-child{
		color: red;
	}
	.el_userinform2>p>img{
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