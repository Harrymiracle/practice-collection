<script>
	import {Toast} from 'mint-ui';  
	import urlServer from 'js/ajaxurl';
	
	export default{
		name:'payAgreement',
		data(){
			return {
				doc_title: '',
				doc_content: '',
			}
		},
		route:{
			data(transition){
				this.getDoc();
				transition.next();
			}
		},
		methods:{
			/**
			 * [getDoc description]获取风险提示书
			 * @return {[type]} [description]
			 */
			getDoc(){
				$.ajax({
					url:urlServer.ApiContent + '/index.php?c=document&a=one&code=goumai',
					type:"get",
					dataType:"jsonp",
					success:(data)=>{
						if(data.code == 1){
							this.doc_title = data.data.doc_title;
							this.doc_content = data.data.doc_content;
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
	<div class="stock-transition-content">
		<div class="mui-content userAgreement-content">
			<div class="userAgreement">
				<h2 v-text="doc_title"></h2>
				<section v-html="doc_content"></section>
			</div>
		</div>
	</div>
</template>
<style scoped>
	 @import "../../../css/pay.css";
</style>