<script>
 	import {Toast} from 'mint-ui';
	import urlServer from 'base/ajaxurl';

	const $ = require('jquery');
	export default{
		name:'caseDetails',
		components:{
			Toast
        },
		data(){
			return{
				caseInfo:'',//案例详情信息
				caseTitle:'',//title
			}
		},
  	    route:{
  			data(transition){
				this.getData();
  			}
  	    },
		methods: {
			getData(){
				$.ajax({
	                url:urlServer.ApiCase + '/index.php?c=agency_lgd&a=stock_cases_info',
	                data:{
	                    'id':this.$route.query.caseId,
	                },
					type:"get",
					dataType:"jsonp",
					success:(data) =>{
	                    if(data.code == 1){
							this.caseInfo = data.data; 
							$('.summ_content').html(this.caseInfo.stock_summarize);
							this.caseTitle=data.data.stock_name+"("+data.data.stock_code+")";
							this.titleSet();
							this.setImageUrl();
	                    }else{
	                    	Toast({message:data.message});
	                    }
					},
					error:function(err){
						Toast({message:err});
                    }
				});
			},
			titleSet(){
			    setTimeout(()=>{
			        //利用iframe的onload事件刷新页面
			        document.title = this.caseTitle;
			        var iframe = document.createElement('iframe');
			        iframe.style.visibility = 'hidden';
			        iframe.style.width = '1px';
			        iframe.style.height = '1px';
			        iframe.onload = function () {
			            setTimeout(function () {
			                document.body.removeChild(iframe);
			            }, 0);
			        };
			        document.body.appendChild(iframe);
			    },0);
			},
			setImageUrl(){
			    $('.summ_content').find('img').each(function (){
			        let merchants_url = "http://static.guxiansheng.cn/";
			        if($(this).attr("src").indexOf("uploads")>=0){
			       	 	$(this).attr("src",merchants_url+$(this).attr("src"));
			        }
				});
			},
		},
		events:{

		}
	}
</script>

<template>
	<div class="class-transition-content">
		<div class="mui-content">
			<div class="reg_info detail_tit">
				<span class="detail_tit_name">{{caseInfo.stock_name}}({{caseInfo.stock_code}})</span>
				<span class="detail_tit_num" :class="caseInfo.stock_rose > 0?'detail_tit_num_rise':(caseInfo.stock_rose == 0 ?'':'detail_tit_num_drop')">
					{{caseInfo.stock_rose}}%
				</span>
			</div>
			<div class="reg_box summ_box">
				<h2 class="box_tit">
					<span class="box_tit_icon summ_tit_icon"></span>评估总结
					<span class="summ_time">推荐时间：{{caseInfo.recommend_time}}</span>
				</h2>
				<div class="summ_content">
					
				</div>
			</div>
			<p class="summ_tips">风险提示：股市有风险，入市需谨慎！仅凭此文推荐买入后果自负！</p>
		</div>
	</div>
</template>
<style scoped>
	@import "../../css/regCenter.css";
</style>
</style>