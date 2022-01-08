<template>
	<div id="el_userinfor">
		<nav>
			<span>
				<router-link to="/login/index1/SerchPage/allotList"><img src="../assets/left.png"></router-link>
				<span>排工单详情</span>
			</span>
		</nav>
		<div class="el_content">
			<div class="el_order">
				<h1>排工单信息</h1>
				<ul>
					<li v-for="(item,index) in order">
						<span>{{ item.name }}：</span>
						<span>{{ item.numbers }}</span>
					</li>
				</ul>
			</div>
			<div class="el_bank"></div>
			<div class="el_customer">
				<ul>
					<li v-for="(item,index) in customer">
						<span>{{ item.name }}:</span>
						<span>{{ item.numbers }}</span>
					</li>
				</ul>
			</div>
			<div class="el_bank"></div>
			<div class="el_driver">
				<ul>
					<li v-for="(item,index) in driver">
						<span>{{ item.name }}:</span>
						<span>{{ item.numbers }}</span>
					</li>
				</ul>
			</div>
			<div class="el_bank20"></div>
			<div class="el_goodsList">
				<h1>商品订单</h1>
				<ul>
					<li v-for="(item,index) in goods">
						<div class="el_goodsinform">
							<p>
							<span>商品编码：{{ item.code }}</span>
							<span>x{{ item.numbers }}</span>
							</p>
							<p>{{ item.goodsName }}</p>
							<p class="el_goodsName2">{{ item.goodsName2 }}</p>
							<p>尺寸：{{ item.sizes }}</p>
						</div>
						<div class="el_bank21"></div>
					</li>
				</ul>
			</div>
			<router-link to="/login/index1/SerchPage/allotList/userinfor/retainage" class="el_retainage">
				<span>总金额：</span>
				<span>￥4300</span>
				<span>代收尾款</span>
				<div class="el_bank21"></div>
			</router-link>
		</div>
		<div class="el_btns">
			<router-link to="/login/index1/SerchPage/allotList/Userinfor/complete" class="el_complete">配送完成</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name : 'el_userinfor',
		data() {
			return {
				order : [{
					name:'排工单号',
					numbers: 'A888888888888888888'
				},{
					name:'销售订单号',
					numbers: 18888888888
				},{
					name:'制单人',
					numbers:18888888888
				},{
					name:'任务状态',
					numbers:'开始配送'
				},{
					name:'配送状态',
					numbers:'电商配送'
				}],
				customer : [{
					name:'顾客信息',
					numbers:'18888888888'
				},{
					name:'顾客地址',
					numbers:'时尚青年城3栋2单元2003'
				},{
					name:'配送日期',
					numbers:'2017年8月8日'
				}],
				driver : [{
					name:'拉货仓库',
					numbers:'A5仓库'
				},{
					name:'运输司机',
					numbers:'18888888888(王师傅)'
				},{
					name:'安装技师',
					numbers:'18888888888(李师傅)'
				}],
				goods : [{
					code:'88888888',
					numbers:'2',
					goodsName:'欧式双人皮艺床类现代新款小户',
					goodsName2:'欧式双人皮艺床类现代新款小户2',
					sizes:'2000*2500'
				},{
					code:'88888888',
					numbers:'1',
					goodsName:'欧式双人皮艺床类现代新款小户',
					sizes:'2000*2500'
				},{
					code:'88888888',
					numbers:'1',
					goodsName:'欧式双人皮艺床类现代新款小户',
					sizes:'2000*2500'
				},{
					code:'88888888',
					numbers:'1',
					goodsName:'欧式双人皮艺床类现代新款小户',
					sizes:'2000*2500'
				}],
			}
		},
		mounted(){
			setTimeout(function(){
				var ps = $('.el_goodsName2');
				for(var i = 0; i<ps.length;i++){
					if($(ps[i]).text()==''){
						$(ps[i]).remove()
					}
				}
			},1000)
		}
	}
</script>

<style>
	#el_userinfor>nav{
		width: 750px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		z-index: 9999;
	}
	#el_userinfor>nav>span{
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
	#el_userinfor>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	.el_bank20{
		height: 20px;
		background: #f2f2f2;
		border-top: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;
	}
	.el_bank21{
		margin-left: -15px;
		width: 750px;
		height: 10px;
		background: #f2f2f2;
		margin-top: 20px;
		border-top: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;
	}
	.el_content{
		height: calc(100% - 200px);
		overflow-y: auto;
	}
	.el_order{
		margin-top: 80px;
	}
	.el_order>h1,.el_goodsList>h1{
		width: 720px;
		height: 80px;
		margin-left: 15px;
		line-height: 80px;
		font-weight: normal;
		font-family: "微软雅黑";
	}
	.el_order>h1:after,.el_goodsList>h1:after{
		display: block;
		content: '';
		width: 750px;
		height: 1px;
		margin-left: -15px;
		background: #ccc;
	}
	.el_order>ul,.el_customer>ul,.el_driver>ul{
		font-size: 28px;
		width: 750px;
		list-style: none;
	}
	.el_order>ul>li,.el_customer>ul>li,.el_driver>ul>li{
		width: 720px;
		height: 30px;
		margin-left: 15px;
		margin-top: 30px;
	}
	.el_order>ul>li>span:nth-child(1),.el_customer>ul>li>span:nth-child(1),.el_driver>ul>li>span:nth-child(1){
		color: #CCCCCC;
	}
	.el_order>ul>li>span:nth-child(2),.el_customer>ul>li>span:nth-child(2),.el_driver>ul>li>span:nth-child(2){
		float: right;
	}
	.el_order>ul>li:last-child,.el_customer>ul>li:last-child,.el_driver>ul>li:last-child{
		margin-bottom: 20px;
	}
	.el_bank{
		width: 100%;
		height: 1px;
		background: #cccccc;
	}
	.el_btns{
		position: fixed;
		width: 750px;
		box-sizing: border-box;
		padding: 60px 75px;
		bottom: 0;
		left: 0;
		height: 200px;
	}
	.el_complete{
		display: block;
		width: 600px;
		height: 80px;
		border-radius: 8px;
		font-size: 28px;
		color: #fff;
		text-align: center;
		line-height: 80px;
		background: #00916c;
	}
	.el_goodsinform{
	    position: relative;
		top: 20px;
	}
	.el_goodsList>ul>li:first-child{
		margin-top: 0px;
	}
	.el_goodsList>ul>li{
		font-size: 28px;
		list-style: none;
		width: 720px;
	    line-height: 60px;
		margin-left: 15px;
	}
	.el_goodsinform>p>span:nth-child(1){
		color: #ccc;
	}
	.el_goodsinform>p>span:nth-child(2){
		float: right;
		color: red;
	}
	.el_goodsinform>p{
	    height: 30px;
	    margin-bottom: 20px;
	}
	.el_goodsinform> p:last-child{
		color: #cccccc;
		margin-bottom: 0;
	}
	.el_retainage{
		display: block;
		height: 100px;
		font-size: 28px;
		line-height: 100px;
	}
	.el_retainage>span:first-child{
		color: #999;
	}
	.el_retainage>span:nth-child(2){
		color: red;
		font-size: 42px;
	}
	.el_retainage>span:nth-child(3){
		display: inline-block;
		height: 100px;
		background: orangered;
		color: #FFFFFF;
		font-size: 42px;
		text-align: center;
		line-height: 100px;
		float: right;
		padding: 0 20px;
	}
	.el_retainage>.el_bank21{
		margin-left: 0;
		margin-top: 0;
		border-top: none;
	}
</style>