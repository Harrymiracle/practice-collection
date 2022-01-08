<template>
	<div id="el_upload">
		<nav>
			<span>
				<router-link to="/login/index1/SerchPage/allotList/Userinfor/complete"><img src="../assets/left.png"></router-link>
				<span>上传凭证</span>
			</span>
		</nav>
		<div class="el_bank21"></div>
		<div class="el_userinfrom">
			<ul>
				<li v-for="(item,index) in inform">
					<p>
						<span>排工单号：</span>
						<span>{{ item.numbers }}</span>
					</p>
					<p>
						<span>顾客信息：</span>
						<span>{{ item.username }}</span>
					</p>
					<p>
						<span>核销码：</span>
						<span>{{ item.code }}</span>
					</p>
				</li>
			</ul>
		</div>
		<div class="el_bank21"></div>
		<div class="el_uploadImg">
			<p>上传安装效果图</p>
	        <div class="el_imgs">  
	        	
	        </div>  
			<div class="el_uploadBtn">+
				<input type="file" name="file_head" id="file_head" v-on:change="setImagePreview" accept="image/*" capture/>
			</div>
		</div>
		<div class="el_bths">
			<router-link to="/login/index1/SerchPage/allotList/Userinfor/complete/upload/erweima">提交</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name:'el_upload',
		data (){
			return {
				inform: [{
					numbers:'A88888888888888888888',
					username:'18888888888(王先生)',
					code:123456,
				}]
			}
		},
		methods:{
			setImagePreview : function(){
				var file_head = document.getElementById("file_head"),
	            picture = file_head.value, html = '';  
	            if (!picture.match(/.jpg|.gif|.png|.bmp/i)) return alert("您上传的图片格式不正确，请重新选择！"),  
	            !1;  
	            if (file_head.files && file_head.files[0]){
	                var a = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
	        		console.log(!!(file_head.files && file_head.files[0]))
	        		html +='<div class="ex_imgs">'
	            	html += '<img src=' + a + ' class="Preview">';
	            	html += '<i class="el_close" onclick="removeThis(this)">X</i>'
	            	html += '</div>'
	            	$('.el_imgs').prepend(html)
	            }
	            //限制显示图片数量
	            if($('.el_imgs').find('img').length > 2){
	            	$('#file_head').prop('disabled','disabled')
	            }
			}
		}
	}
</script>

<style>
	#el_upload>nav{
		width: 750px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
	}
	#el_upload>nav>span{
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
	#el_upload>nav>span>a{
		font-size: 40px;
		color: #fff;
		position: absolute;
		left: 25px;
	}
	.el_bank21{
		width: 750px;
		height: 10px;
		background: #f2f2f2;
		margin-top: 80px;
		border-top: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;
	}
	.el_userinfrom{
		height: 240px;
	}
	.el_userinfrom>ul>li{
		list-style: none;
		width: 720px;
		height: 240px;
		margin-left: 15px;
	}
	.el_userinfrom>ul>li>p{
		height: 110px;
		line-height: 80px;
		font-size: 28px;
	}
	.el_userinfrom>ul>li>p>span:nth-child(1){
		color: #cccccc;
	}
	.el_userinfrom>ul>li>p>span:nth-child(2){
		float: right;
	}
	.el_uploadImg>p{
		font-size: 28px;
		margin: 30px 37.5px;
	}
	.el_uploadImg>.el_imgs{
		width: 700px;
    	margin-left: 14px;
	}
	.ex_imgs{
		position: relative;
	}
	.ex_imgs>.el_close{
		position: absolute;
	    right: -14px;
	    top: -12px;
	    width: 32px;
	    height: 32px;
	    background: red;
	    border-radius: 16px;
	    color: #fff;
	    text-align: center;
	    line-height: 32px;
	}
	.el_uploadImg>.el_imgs>div{
		display: inline-block;
	}
	.el_uploadImg>.el_imgs>div>img{
		width: 200px;
		height: 200px;
		margin-left: 30px;
	}
	.el_uploadImg>.el_imgs>img:nth-child(1){
		margin-left: 0;
	}
	.el_uploadImg>.el_uploadBtn{
		position: relative;
		width: 200px;
		height: 200px;
		font-size: 15rem;
		background: #f2f2f2;
		text-align: center;
		/*text-indent: -2px;*/
		line-height: 200px;
		color: #fff;
		margin-left: 37.5px;
		margin-top: 40px;
	}
	#file_head{
		height: 200px;
		width: 200px;
		opacity: 0;
		position: absolute;
		left: 0;
	    top: 0;
	}
	.el_close{
		
	}
	.el_bths{
	    width: 750px;
	    height: 200px;
	    background: #f2f2f2;
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    padding-top: 60px;
	}
	.el_bths>a{
		width: 580px;
		height: 80px;
		border-radius: 8px;
		display: block;
		text-align: center;
		line-height: 80px;
		color: #FFFFFF;
		background: #00916c;
		letter-spacing: 10px;
		margin: 0 auto;
		font-size: 28px;
	}
</style>