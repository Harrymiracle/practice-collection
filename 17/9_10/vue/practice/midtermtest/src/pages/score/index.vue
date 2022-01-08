<template>
    <div class="scorecontainer"> 
        <topHead></topHead>

        <section>
        	<div class="your_score_container">
        		<header class="your_scores"><span class="score_num">{{ score }}</span><span class="fenshu">分！</span></header>
        		<div class="result_tip">{{ scoreTip }}</div>
                <div class="result_tip">{{scoreTips}}</div>
        	</div>
        	<div class="share_button" @click="showCover"></div>
        	<div class="share_code">
        		<header class="share_header">关注葡萄之家，获取答案。</header>
            	<img src="../../images/4-4.png" height="212" width="212" class="code_img"> 
        	</div>
        	<div class="share_cover" v-show="showHide" @click="showCover">
        		<img src="../../images/5-2.png" class="share_img">
        	</div>
        </section>
    </div>
</template>

<script>
	import topHead from '../../components/Header'
	import { mapState } from 'vuex'

	export default {
	    name: 'score',
	    components: {
	    	topHead
	    },
	    data(){
            return {
                showHide: false,
	    		score: 0,
	    		scoreTip: '',
	    		rightAnswers: [3, 8, 11, 16, 18, 24, 26, 31, 33, 39],
	    		scoreTipsArr: ['你的智商有问题！', '你搞毛线', '你是个人才。', '你说，是不是把知识都还给小学老师了？', '上课没认真啊！', '还不错，但还需要继续加油哦！', '不要嘚瑟还有进步的空间！', '你也太聪明啦！', '智商离爆表只差一步了！', '你是个真人才！']
	    	}
	    },
	    computed: mapState(['answerid']),
	    created(){
			this.computedScore();
	        this.getScoreTip();		
	    },
	    methods: {
	    	computedScore(){
                this.answerid.forEach((item, index) => {
                    if(item === this.rightAnswers[index]){
                        this.score += 10;
                    }
                })
	    	},
	    	showCover(){
	    		this.showHide = !this.showHide;
	    	},
	    	getScoreTip: function (){
                switch(this.score){
                    case 0: this.scoreTips = this.scoreTipsArr[0];
                            return;
                    case 10: this.scoreTips = this.scoreTipsArr[0];
                            return;
                    case 20: this.scoreTips = this.scoreTipsArr[1];
                            return;
                    case 30: this.scoreTips = this.scoreTipsArr[2];
                            return;  
                    case 40: this.scoreTips = this.scoreTipsArr[3];
                            return;
                    case 50: this.scoreTips = this.scoreTipsArr[4];
                            return;
                    case 60: this.scoreTips = this.scoreTipsArr[5];
                            return;
                    case 70: this.scoreTips = this.scoreTipsArr[6];
                            return; 
                    case 80: this.scoreTips = this.scoreTipsArr[7];
                            return;
                    case 90: this.scoreTips = this.scoreTipsArr[8];
                            return;
                    case 100: this.scoreTips = this.scoreTipsArr[9];
                            return;                           
                }
            }
	    }
	}

</script>

<style lang="less">
    body{
        background-image: url(../../images/4-1.jpg);
    }
    #hd{
    	color: #a57c50;
    	background: rgba(53,66,83,0.1);
    }
    section{
    	margin-top: 1rem;
    }
    .your_score_container{
        width: 9.7rem;
        height: 9.1rem;
        background: url(../../images/4-2.png) no-repeat;
        background-size: 100% 100%;
        margin: 0 auto 0;
        position: relative;
        .your_scores{
            position: absolute;
            width: 100%;
            text-indent: 3.3rem;
            top: 4.7rem;
            font-size: 1.4rem;
            font-weight: 900;
            -webkit-text-stroke: 0.05rem #412318;
            font-family: 'Microsoft YaHei';
            .score_num{
                font-family: Tahoma,Helvetica,Arial;
                color: #a51d31;
            }
            .fenshu{
                color: #a51d31;
            }
        }
        .result_tip{
            position: absolute;
            top: 7rem;
            width: 9rem;
            left: 0.6rem;
            color: #3e2415;
            font-size: 0.65rem;
            text-align: center;
        }
    }
    .share_button{
        width: 6.025rem;
        height: 2.4rem;
        margin: 0.8rem auto 0;
        background: url(../../images/4-3.png) no-repeat 0.4rem 0;
        background-size: 5.825rem 100%;
    }
    .share_code{
        width: 5.3rem;
        margin: 1.5rem auto 0;
        .share_header{
            color: #664718;
            font-size: 0.475rem;
            font-family: 'Microsoft YaHei';
            width: 7rem;
            font-weight: 500;
        }
        .code_img{
            height: 5.3rem;
            width: 5.3rem;
            margin-top: 0.5rem;
        }
    }
    .share_cover{
        position: fixed;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background: url(../../images/5-1.png) no-repeat;
        background-size: 100% 100%;
        opacity: 0.92;
    }
    .share_img{
        height: 10.975rem;
        width: 11.95rem;
        position: fixed;
        top: 0.5rem;
        left: 50%;
        margin-left: -5.975rem;
    }
</style>
