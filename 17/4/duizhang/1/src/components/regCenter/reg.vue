<script>
 	import {Swipe,SwipeItem,Toast} from 'mint-ui';
 	import { videoPlayer } from 'vue-video-player';
	import urlServer from 'base/ajaxurl';
	const agreementmask = resolve => require(['../../components/common/agreementMask.vue'],resolve);
	const RegProtocol = resolve => require(['../../components/main/user/regProtocol'], resolve);             //注册协议

	const $ = require('jquery');
	export default{
		name:'reg',
		components:{
            Swipe,
            SwipeItem,
            'video-player':videoPlayer,
            agreementmask,
            RegProtocol,
        },
		data(){
			return{
				videoOptions:{
					source:{
						type:"video/mp4",
						src:" ",
					},
					poster:" ",
					height:'100%',
					autoplay:false,
				},
				topAdvert:{
					isShow:false,
					ad_img:'',
					ad_url:'',
				},//顶部广告位	
				bannerShow:false,
				myBannerTop:[],//banner列表
				caseList:[],//案例列表
			    regval:{
					phone:'',
					verifycode:'',
					openid:'',
				},
				codebth:'获取验证码', //获取验证码文字
				bthstate:0,			  //获取验证码按钮状态
				seconds: 60,		  //秒数
				disableds: false,	  //获取验证码按钮是否可点击
				timer: null,		  //倒计时timer
				checkAgree:true,		  //是否选中“我已阅读”
				backUrl:'',			  //注册成功回跳地址
				userState:false,
				Pbool:false,
				layer:{
					poupTitle:'',
					poupContent:'',
					btnTxt:''
				},
				isVideoShow:true,	//视频是否显示
			}
		},
  	    route:{
  			data(transition){
				this.codebth = '获取验证码';
				this.disableds = false;
				clearInterval(this.timer);
				this.getVideo();
  				this.getTopAdvert();
				this.getBanner();
				this.getCaseList();
				require.ensure([],()=>{
					let tool = require('base/tools');
					if(!tool.getStore("user_info")){//没有用户信息
					 	if(tool.getString("openid")){
							let userInfo= {
								headimgurl:tool.getString("headimgurl"),
								nickname:tool.getString("nickname"),
								openid:tool.getString("openid"),
							}
							tool.setStore("user_info",userInfo);
						}
					}else{//有用户信息
						if(tool.getString("openid")){
							if(tool.getStore("user_info").openid!=tool.getString("openid")){//判断缓存中的用户是否是当前用户
								let userInfo= {
									headimgurl:tool.getString("headimgurl"),
									nickname:tool.getString("nickname"),
									openid:tool.getString("openid"),
								}
								tool.setStore("user_info",userInfo);
								tool.delStore('member_info');
							}
						}
					}
					this.regval.openid = tool.getString("openid");
					if(!tool.getStore('member_info')) {
				        this.is_bind();
				    }
	  				transition.next();
				});
  			}
  	    },
		methods: {
			/*获取banner*/
			getBanner(){
				$.ajax({
	                url:urlServer.ApiCase + '/index.php?c=agency_lgd&a=stock_adsense_list',
	                data:{
	                    'is_type':1,
	                },
					type:"get",
					dataType:"jsonp",
					success:(data) =>{
	                    if(data.code == 1){
	                    	if(JSON.stringify(data.data.list)!="[]"){
                    			this.myBannerTop = data.data;
                    			this.bannerShow=true;
	                    	}
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }
				});
			},
			/*获取顶部广告位图片*/
			getTopAdvert(){
				$.ajax({
	                url:urlServer.ApiCase + '/index.php?c=agency_lgd&a=stock_adsense_list',
	                data:{
	                    'is_type':2,
	                },
					type:"get",
					dataType:"jsonp",
					success:(data) =>{
	                    if(data.code == 1){
	                    	if(data.data.list!=""){
		                    	this.topAdvert.ad_img = data.data[0].ad_img;
		                    	this.topAdvert.ad_url = data.data[0].ad_url;
		                    	this.topAdvert.isShow = true;
	                    	}
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }
				});
			},
			/*获取案例列表*/
			getCaseList(){
				$.ajax({
	                url:urlServer.ApiCase + '/index.php?c=agency_lgd&a=stock_cases_list',
					type:"get",
					dataType:"jsonp",
					success:(data) =>{
	                    if(data.code == 1){
	                    	if(data.data.length>0){
	                    		for(let item in data.data){
	                    			let strTime = data.data[item].created_at;
									let timestamp2 = Date.parse(new Date(strTime.replace(/-/g, "/")));
									timestamp2 = timestamp2 / 1000;
	                    			data.data[item].created_at = timestamp2;
	                    		}
	                    		this.caseList = data.data;
	                    	}
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }
				});
			},
			/*获取视频*/
			getVideo(){
				$.ajax({
	                url:urlServer.ApiCase + '/index.php?c=agency_lgd&a=stock_video_list',
	                data:{
	                    'id':1,
	                },
					type:"get",
					dataType:"jsonp",
					success:(data) =>{
	                    if(data.code == 1){
	                    	if(data.data.is_show == 2){
	                    		this.isVideoShow=false;
	                    	}else{
		                    	this.videoOptions.source.src = data.data.video_url;
		                    	$(".vjs-poster").css("backgroundImage","url("+data.data.video_img+")");
	                    	}
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }
				});
			},
			/*判断用户是否已经绑定*/
			is_bind(){
				require.ensure([],()=>{
					let tool = require('base/tools');
					if(this.regval.openid){
						$.ajax({
			                url:urlServer.ApiUrl + '/index.php?c=wechat_message&a=wechat_user_list&v=2.0',
							type:"get",
							data:{
		                    	openid:this.regval.openid,
								route_mark:'lgd',
							},
							dataType:"jsonp",
							success:(data) =>{
			                    if(data.code == 1){					
			                    	this.userState = false;
			                    	tool.setStore("member_info",data.data);
			                    }else{
			                    	this.userState = true;
			                    	tool.delStore('member_info');
			                    }
							},
							error:function(err){
								Toast({message:err});
		                    }
						});
					}
				});
			},
			/*判断是否是电话号码*/
			isPhone(no){
        		if(no){
        			return /^1[3|4|5|7|8]\d{9}$/.test(no);
        		}
        	},
			regInfo(event){
				let target = event.target;
				if(this.regval.phone==''){
					Toast({message: '请输入手机号'});
					return;
				}else if(!this.isPhone(this.regval.phone)){
					Toast({message: '手机号无效',});
					return;
				}
				if(this.regval.verifycode === ''){
					Toast({message:'请输入验证码'});
					return;
				}
				if(!this.checkAgree){
					Toast({message:'请阅读<<用户注册协议及风险揭示书>>'});
					return;
				}
				require.ensure([],()=>{
					let tool = require('base/tools');
					$.ajax({
		                url:urlServer.ApiUrl + '/index.php?c=wechat_message&a=binding_mobile&v=2.0',
						type:"get",
						data:{
							mobile:this.regval.phone,
	                    	yzm_code:this.regval.verifycode,
	                    	openid:this.regval.openid,
							route_mark:'lgd',
						},
						dataType:"jsonp",
						beforeSend:()=>{
							target.disabled = true;
						},
						success:(data) =>{
		                    if(data.code == 1){					
		                    	Toast({message:'注册成功',duration:1000});
		                    	tool.setStore("member_info",data.data);
		                    	window.location.reload();
		                    }else{
		                    	setTimeout(()=>{
			                    	target.disabled = false;
			                    },2000);
		                    	Toast({message:data.message});
		                    }
						},
						error:function(err){
							Toast({message:err});
							setTimeout(()=>{
								target.disabled = false;
							},2000);
	                    }
					}); 
				});

			},
			/*获取短信验证码*/
        	getCode(event){
				let target = event.target;
				if(this.regval.phone==''){
					Toast({message: '请输入手机号',});
					return;
				}else if(!this.isPhone(this.regval.phone)){
					Toast({message: '手机号无效',});
					return;
				}
				$.ajax({
	                url:urlServer.ApiUrl + '/index.php?c=verification_code&a=send&v=2.0',
					type:"get",
					data:{
						mobile:this.regval.phone,
                    	type:1
					},
					dataType:"jsonp",
					beforeSend:()=>{
						target.disabled = true;
					},
					success:(data) =>{
	                    if(data.code == 1){
	                    	this.countdown(event);
	                    	Toast({message:'短信验证码发送成功，请注意查收'});
	                    }else{
	                    	setTimeout(()=>{
								target.disabled = false;
							},2000);
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
						setTimeout(()=>{
							target.disabled = false;
						},2000);
                    }
				})
			},
			countdown(event){
			   let target = event.target;
			   let seconds = this.seconds;
	           this.timer = setInterval(function(){
	               if(seconds > 0){
	               		this.bthstate=1;
						seconds--;
						this.codebth='重新获取(' + seconds+')';
						target.disabled = true; //不能点击
	               }else{
	                  seconds = 3;
	                  this.bthstate=0;
	                  this.codebth='获取验证码';
	                  target.disabled = false;  //可以点击
	                   clearInterval(this.timer);
	               }
	           }.bind(this),1000);
	        },
	        /*banner图片页面跳转*/
	        goPage(url){
	        	if(url!=""){
	        		window.location.href = url; 
	        	}
	        },
	        agreement(){
	        	this.layer = {
	        		poupTitle:'用户注册协议及风险揭示书',
					poupContent:$('#regText .mui-content').html(),
					btnTxt:'我知道了'
				}
	        	this.Pbool = true;
				$('body').css("overflow","hidden");
	        }
		},
		events:{
            "protocolLayer":function(data){
            	this.Pbool = data;
				$('body').css("overflow","inherit");
            }
        },
	}
</script>

<template>
	<div class="class-transition-content">
		<div class="mui-content">
			<agreementmask v-show="Pbool" :layer="layer" transition="fade"></agreementmask>
			<reg-protocol id="regText" v-show="false"></reg-protocol>
			<div class="reg_banner reg_banner_ad" v-show="topAdvert.isShow">
				<a :href="topAdvert.ad_url == '' ? 'javascript:void(0)': topAdvert.ad_url"><img :src="topAdvert.ad_img"/></a>
			</div>
			<div class="reg_info" v-show="userState">
				<input id="myPhone" type="tel" placeholder="请输入手机号" class="reg_input" v-model="regval.phone" :maxlength="11"/>
				<div class="reg_code">
					<input id="verifycode" type="text" placeholder="请输入6位数字验证码" class="reg_input"  v-model="regval.verifycode" :maxlength="6" />
					<input type="button" v-model="codebth" class="verify_code" :class="bthstate ==1 ? 'verify_active' : ''" @click.prevent="getCode($event)" />
				</div>
				<div class="agreement">
					<label class="agree_check" :class="checkAgree ==true ? 'active' : ''"  @click="checkAgree=!checkAgree"></label>我已阅读<a href="" class="agree_link" @click.prevent="agreement">&lt;&lt;用户注册协议及风险揭示书&gt;&gt;</a>
				</div>
				<input type="button" class="reg_btn" value="注册" @click.prevent="regInfo($event)"/>
			</div>
			<!-- slider start -->
			<div class="reg_banner" v-show="bannerShow">
				<swipe :auto="2500" :continuous="true"  :show-indicators="myBannerTop.length <=1 ? false : true">
					<swipe-item v-for="item in myBannerTop">
						<a @click="goPage(item.ad_url)" :style="{backgroundImage: 'url(' + item.ad_img + ')'}"></a>
					</swipe-item>
				</swipe>
			</div>
			 <!--slider end-->
			<div class="reg_video">
				<h2 class="box_tit"><span class="box_tit_icon fun_tit_icon"></span>功能说明</h2>
				<div class="techn_video_content">
					<span class="techn_video_temp" v-show="!isVideoShow"></span>
					<video-player :options="videoOptions" v-show="isVideoShow"></video-player>
				</div>
			</div>
			<div class="reg_box list_box">
				<h2 class="box_tit"><span class="box_tit_icon case_tit_icon"></span>实战案例</h2>
				<ul class="case_list" >
					<li class="case_list_li" v-for="item in caseList" v-link="{name:'caseDetails',query:{caseId:item.id}}">
						<span>{{item.created_at | sortTimeMD}}</span>
						<span>{{item.stock_name}}</span>
						<span :class="item.stock_rose > 0?'case_rise':(item.stock_rose == 0 ?'':'case_drop')">
							涨幅：<i class="case_list_plus" v-if="item.stock_rose > 0">+</i>{{item.stock_rose}}%
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped>
	@import "../../css/regCenter.css";
</style>