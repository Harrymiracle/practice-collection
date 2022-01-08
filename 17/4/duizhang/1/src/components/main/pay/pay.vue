<script>
	import {Toast,Indicator} from 'mint-ui';  
	import urlServer from 'js/ajaxurl';
	export default{
		name:'pay',
		data(){
			return{
				object_id :'',
				member_id:'',
				key:'',
				payInfo:[],
				banner:'',
				icon:'',
				title:'',
				tabDate:[],
				selected:0,
				hashkey:'',
				price:'',
				goods_id:'',
				jyDate:'',
				pay_sn:'',
				deadLine:'',
				openid:'',
			}
		},
		route:{
			data(transition){
				this.object_id = this.$route.query.object_id;
				require.ensure([],()=>{
					let tool = require('js/tools');
					if (tool.islocalStorage && tool.getStore('goods_info')) {
					    this.object_id = tool.getStore('goods_info').asc_id;
					    this.banner = tool.getStore('goods_info').asc_bigimg;
					    this.icon = tool.getStore('goods_info').asc_boximg;
					    this.title = tool.getStore('goods_info').asc_title;
					}
					if (tool.islocalStorage && tool.getStore('user_info')) {
					    this.openid = tool.getStore('user_info').openid;
					}
					this.is_bind();
					transition.next();
				});
			}
		},
		methods:{
			/**
			 * [getPayinfo description]获取商品信息
			 * @return {[type]} [description]
			 */
			getPayinfo(){
				$.ajax({
	                url:urlServer.ApiTrade + '/index.php?c=buy_h5&a=get&v=1.1',
					type:"get",
					dataType:"jsonp",
					data:{
						member_id:this.member_id,
						key:this.key,
						route_mark:'lgd',
						goods_type:4,
						object_id:this.object_id
					},
					success:(data) =>{
	                    if(data.code == 1){
	                    	this.tabDate = data.data.fms;
	                    	this.payInfo = data.data.list;
	                    	this.hashkey = data.data.hashkey;
	                    	this.price = data.data.list[this.selected].price;
	                    	this.goods_id = data.data.list[this.selected].goods_id;
	                    	this.jyDate = data.data.list[this.selected].fm_name;
	                    	this.getExpireDate();
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }	
				});
			},
			/**
			 * [is_login description]判断用户微信号是否绑定乐股道
			 * @return {Boolean} [description]
			 */
			is_bind(){
				$.ajax({
	                url:urlServer.ApiUrl + '/index.php?c=wechat_message&a=wechat_user_list&v=2.0',
					type:"get",
					dataType:"jsonp",
					data:{
						openid:this.openid,
						route_mark:'lgd',
					},
					success:(data) =>{
	                    if(data.code == 1){
	                    	// tool.setStore("member_info",data.data);
	                    	this.member_id = data.data.member_id;
	                    	this.key = data.data.token;
	                    	this.getPayinfo();
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }
				});
			},
			/**
			 * [getExpireDate description]计算服务到期天数
			 * @return {[type]} [description]
			 */
			getExpireDate(){
				Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                });
				$.ajax({
					url:urlServer.ApiUrl + '/index.php?c=plan&a=remaining_agency_days',
					type:"get",
					dataType:"jsonp",
					data:{
						member_id:this.member_id,
						key:this.key,
						route_mark:'lgd',
						asc_id:this.object_id,
						goods_type:4,
						days:this.jyDate
					},
					success:(data)=>{
						if(data.code == 1){
							this.deadLine = data.data.all_days;
						}else{
							Toast({
							  message: data.message,
							});
						}
					},
					error:(err)=>{
						Toast({message:err});
					},
					complete:()=>{
						Indicator.close();
					}
				});
			},
			/**
			 * [tabSelect description]切换交易日
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			tabSelect(index){
				this.selected = index;
				this.goods_id = this.payInfo[index].goods_id;
				this.price = this.payInfo[index].price;
				this.jyDate = this.payInfo[index].fm_name;
				this.getExpireDate();
			},
			/**
			 * [createOrder description]生成支付单号
			 * @return {[type]} [description]
			 */
			createOrder(target){
				$.ajax({      
					url:urlServer.ApiTrade + '/index.php?c=buy&a=step2_more&v=1.1',
					type:"get",
					dataType:"jsonp",
					data:{
						member_id:this.member_id,
						key:this.key,
						route_mark:'lgd',
						goods_id:this.goods_id,
						payment_code:'wxpay_gz',
						hashkey:this.hashkey,
						channel:'h5',
						openid:this.openid
					},
					success:(data)=>{
						if(data.code == 1){
							this.pay_sn = data.data.pay_sn;
							this.paySteptwo(target);
	                    	setTimeout(()=>{
		                    	target.disabled = false;
		                    },2000);
						}else{
							Toast({
							  message: data.message,
							});
							setTimeout(()=>{
		                    	target.disabled = false;
		                    },2000);
						}
					},
					error:(err)=>{
						Toast({message:err});
						setTimeout(()=>{
	                    	target.disabled = false;
	                    },2000);
					}
				})
			},
			/**
			 * [pay description]支付
			 * @param  {[type]} event [description]
			 * @return {[type]}       [description]
			 */
			pay(event){
				let target = event.target;
				this.pormpt(function(){
					this.createOrder(target);
				});
			},
			/**
			 * [paySteptwo description]调用支付接口
			 * @param  {[type]} target [description]
			 * @return {[type]}        [description]
			 */
			paySteptwo(target){
				$.ajax({                //获取微信签名信息
					url:urlServer.ApiTrade + '/index.php?c=payment_h5&a=pay&v=1.1',
					type:"get",
					dataType:"jsonp",
					data:{
						member_id:this.member_id,
						key:this.key,
						route_mark:'lgd',
						pay_sn:this.pay_sn
					},
					success:(data)=>{
						if(data.code == 1){
							let config = data.data;
							//配置微信接口
			                if (config != undefined && config != null) {
								wx.config({
							        debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							        appId :  config.appId, // 必填，appID公众号的唯一标识
							        timestamp : config.timeStamp, // 必填，生成签名的时间戳
							        nonceStr : config.nonceStr, // 必填，生成签名的随机串
							        signature : config.paySign,// 必填，签名，见附录1
							        jsApiList : [ 'chooseWXPay' ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2，如果出现permiss deline错误，就是因为这里没有配置相关接口原因
						        });
						        wx.ready(function(){
						          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
						          //console.log(config.paySign)
						        	wx.chooseWXPay({
							            timestamp:config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							            nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
							            package: config.package,
							            // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							            paySign: config.paySign, // 支付签名
							            signType:'MD5',
							            success: function (data) {
							                // 支付成功后的回调函数
							              	setTimeout(()=>{
						                    	target.disabled = false;
						                    },2000);
						                    that.$route.router.go({name:'download'}); //跳转到支付成功后的页面
							            },
							            cancel:function(){
							              	setTimeout(()=>{
							                	target.disabled = false;
							                },2000);
							            }
						        	});
						        });  	
				            }
						}else{
							Toast({
							  message: data.message,
							});
							setTimeout(()=>{
		                    	target.disabled = false;
		                    },2000);
						}
					},
					complete:()=>{
						// Indicator.close();
					},
					error:(err)=>{
						Toast({message:err});
						setTimeout(()=>{
	                    	target.disabled = false;
	                    },2000);
					}
				})
			},
			/**
			 * [pormpt description]风险提示
			 * @param  {Function} callback [description]
			 * @return {[type]}            [description]
			 */
			pormpt(callback){
				$.ajax({
					url:urlServer.ApiContent + '/index.php?c=risk_wechat&a=isRisk',
					type:"get",
					dataType:"jsonp",
					data: {
						open_id:this.openid
					},
					success:(data)=>{
						if(data.code == 1){
							if(data.data == 0){    //未提交过风险评估
							  	this.$route.router.go({name:'riskRating'});
							}else{
								typeof callback === "function" && callback.call(this);
							}
						}else{
							Toast({
							  	message: data.message,
							});
						}
					},
					error:(err)=>{
						Toast({message:err});
					}
				})
			},
		}
	}
</script>
<template>
	<div class="class-transition-content">
		<div class="mui-content">
			<div class="pay">
				<div class="banner">
					<img :src="banner">
				</div>
				<div class="pay_wrap">
					<div class="info_item">
						<img :src="icon">
						<span class="info_name" v-text="title"></span>
					</div>
					<div class="info_item tab_date">
						<a href="javascript:void(0);" v-for="date in tabDate" class="time_item" :class="selected == $index ? 'selected' : '' " @click.prevent="tabSelect($index)" v-text="date"></a>
					</div>
					<div class="data_item">
						<span class="product_time pull-right">{{deadLine | sortTimeymd}}</span>
						购买后有效期至
					</div>
					<div class="data_item">
						<span class="price pull-right">{{price | currency '&yen;' 2}}</span>
						支付金额
					</div>
					<div class="agreement">
						点击支付即同意<a v-link="{name:'payAgreement'}">第三方风险揭示书及产品购买协议</a>
					</div>
					<button class="pay_btn" @click.prevent="pay($event)">微信支付</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import "../../../css/pay.css";
</style>