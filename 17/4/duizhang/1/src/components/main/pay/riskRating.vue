<script>
    const promptmask = resolve => require(['./Subcomponent/promptMask.vue'],resolve);
    const agreementmask = resolve => require(['../../common/agreementMask.vue'],resolve);
    import {Toast} from 'mint-ui';  
    import urlServer from 'js/ajaxurl';
    export default{
        name : 'riskRating',
        data(){
            return {
                snaq:{
                    problem1: '',
                    problem2: '',
                    problem3: '',
                    problem4: '',
                    problem5: '',
                    problem6: '',
                    problem7: '',
                    problem8: '',
                    problem9: '',
                    problem10: '',
                    problem11: '',
                    problem12: ''
                },
                prompttxt:'',
                bool:false,
                Pbool:false,
                title:true,
                btntxt:'确认',
                layer:{
                    poupTitle:'',
                    poupContent:'',
                    btnTxt:''
                },
                openid:'',
                nikename:'',
            }
        },
        components:{
            promptmask,
            agreementmask
        },
        route:{
            data(transition){
                require.ensure([],()=>{
                    let tool = require('js/tools');
                    if (tool.islocalStorage && tool.getStore('user_info')) {
                        this.openid = tool.getStore('user_info').openid;
                        this.nikename = tool.getStore('user_info').nikename;
                    }
                    this.getDoc();
                    transition.next();
                })
            }
        },
        methods:{
            /**
             * [testResault description]展示评估结果
             * @param  {[type]} type    [description]
             * @param  {[type]} content [description]
             * @return {[type]}         [description]
             */
            testResault(type,content){
                this.bool = true;
                this.prompttxt = "<p>评估结果：</p>" + "<p>您的风险承受能力评级属于："+ type +"</p>" +"<p>"+ content +"</p>";
                this.title = false;
                this.btntxt = "我知道了";
            },
            /**
             * [submitval description]提交问卷答案
             * @param  {[type]} event [description]
             * @return {[type]}       [description]
             */
            submitval(event){
                if(!event.target.disabled){
                    event.target.disabled = true;
                    for(let e in this.snaq){
                        if(this.snaq[e]== ''){
                            Toast('股客大人，请完成所有问题后再提交');
                            event.target.disabled = false;
                            return false;
                        }
                    }
                    let snaqData = {
                        "open_id": this.openid,
                        "nikename": this.nikename,
                        "json":[
                            this.snaq.problem1,
                            this.snaq.problem2,
                            this.snaq.problem3,
                            this.snaq.problem4,
                            this.snaq.problem5,
                            this.snaq.problem6,
                            this.snaq.problem7,
                            this.snaq.problem8,
                            this.snaq.problem9,
                            this.snaq.problem10,
                            this.snaq.problem11,
                            this.snaq.problem12
                        ]
                    };
                    $.ajax({
                        url:urlServer.ApiContent+'/index.php?c=risk_wechat&a=addRiskWechat',
                        type:"get",
                        data:snaqData,
                        dataType:"jsonp",
                        success:(data)=>{
                           if(data.code == 1){
                                this.testResault(data.data.type,data.data.content);
                                event.target.disabled = false;
                            }else{
                                Toast(data.message);
                                event.target.disabled = false;
                            }
                        },
                        error:(xrh)=>{
                            Toast('服务器繁忙！');
                            event.target.disabled = false;
                        }
                    })                     
                }
            },
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
                            this.layer={
                                poupTitle:data.data.doc_title,
                                poupContent:data.data.doc_content,
                                btnTxt:'我已阅读该协议'
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
            /**
             * [getRisk description]阅读风险提示
             * @return {[type]} [description]
             */
            getRisk(){
                $.ajax({
                    url:urlServer.ApiContent + '/index.php?c=risk_wechat&a=updateRisk',
                    type:"get",
                    dataType:"jsonp",
                    data:{
                        open_id: this.openid
                    },
                    success:(data)=>{
                        if(data.code == 1){
                            this.Pbool=false;
                            window.history.back(-1);
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
            }
        },
        events:{
            "hidep":function(data){  //隐藏promptmask弹窗
                this.bool = data;
                this.Pbool = true;
            },
            "protocolLayer":function(data){
                this.getRisk();
            },
        }
    }
</script>

<template>
    <div class="snaq-wrap">
        <agreementmask v-show="Pbool" :layer="layer" transition="fade"></agreementmask>
        <promptmask :prompttxt="prompttxt" :title="title" :btntxt="btntxt" v-show="bool" transition="fade"></promptmask>
        <div class="top"></div>
        <div class="content">
            <div class="item">
                <h3>1.请问您的年龄处于：</h3>
                <label><input type="radio" name="problem1" value="1" v-model="snaq.problem1"><span>30岁以下</span></label>
                <label><input type="radio" name="problem1" value="2" v-model="snaq.problem1"><span>31-40岁</span></label>
                <label><input type="radio" name="problem1" value="3" v-model="snaq.problem1"><span>41-50岁</span></label>
                <label><input type="radio" name="problem1" value="4" v-model="snaq.problem1"><span>51-60岁</span></label>
                <label><input type="radio" name="problem1" value="5" v-model="snaq.problem1"><span>60岁以上</span></label>
            </div>
            <div class="item">
                <h3>2.您家庭预计进行证券投资的资金占家庭现有总资产（不含自住、自用房产及汽车等固定资产）的比例是：</h3>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="1"><span>70%以上</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="2"><span>50%-70%</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="3"><span>30%-50%</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="4"><span>10%-30%</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="5"><span>10%以下</span></label>
            </div>
            <div class="item">
                <h3>3.进行一项重大投资后，您通常会觉得：</h3>
                <label><input type="radio" name="problem3" value="1" v-model="snaq.problem3"><span>很高兴，对自己的决定很有信心</span></label>
                <label><input type="radio" name="problem3" value="2" v-model="snaq.problem3"><span>轻松，基本持乐观态度</span></label>
                <label><input type="radio" name="problem3" value="3" v-model="snaq.problem3"><span>基本没什么影响</span></label>
                <label><input type="radio" name="problem3" value="4" v-model="snaq.problem3"><span>比较担心投资结果</span></label>
                <label><input type="radio" name="problem3" value="5" v-model="snaq.problem3"><span>非常担心投资结果</span></label>
            </div>
            <div class="item">
                <h3>4.如果您需要把大量现金整天携带在身的话，您是否会感到：</h3>
                <label><input type="radio" name="problem4" value="1" v-model="snaq.problem4"><span>非常焦虑</span></label>
                <label><input type="radio" name="problem4" value="2" v-model="snaq.problem4"><span>有点焦虑</span></label>
                <label><input type="radio" name="problem4" value="3" v-model="snaq.problem4"><span>完全不会焦虑</span></label>
            </div>
            <div class="item">
                <h3>5.当您独自到外地游玩，遇到三岔路口，您会选择：</h3>
                <label><input type="radio" name="problem5" value="1" v-model="snaq.problem5"><span>仔细研究地图和路标</span></label>
                <label><input type="radio" name="problem5" value="2" v-model="snaq.problem5"><span>找别人问路</span></label>
                <label><input type="radio" name="problem5" value="3" v-model="snaq.problem5"><span>大致判断一下方向</span></label>
                <label><input type="radio" name="problem5" value="4" v-model="snaq.problem5"><span>也许会用掷骰子的方式来做决定</span></label>
            </div>
            <div class="item">
                <h3>6.假设有两种不同的投资：投资A预期获得5%的收益，有可能承担非常小的损失；投资B预期获得20%的收益，但有可能面临25%甚至更高的亏损。您将您的投资资产分配为：</h3>
                <label><input type="radio" name="problem6" value="1" v-model="snaq.problem6"><span>全部投资</span></label>
                <label><input type="radio" name="problem6" value="2" v-model="snaq.problem6"><span>大部分投资</span></label>
                <label><input type="radio" name="problem6" value="3" v-model="snaq.problem6"><span>两种投资各一半</span></label>
            </div>
            <div class="item">
                <h3>7.假如您前期用25元购入一只股票，该股现在升到30元，而根据预测该股近期有一半机会升到35元，另一半机会跌到25元，
                您现在会：</h3>
                <label><input type="radio" name="problem7" value="1" v-model="snaq.problem7"><span>立刻卖出</span></label>
                <label><input type="radio" name="problem7" value="2" v-model="snaq.problem7"><span>部分卖出</span></label>
                <label><input type="radio" name="problem7" value="3" v-model="snaq.problem7"><span>继续持有</span></label>
                <label><input type="radio" name="problem7" value="4" v-model="snaq.problem7"><span>继续买入</span></label>
            </div>
            <div class="item">
                <h3>8.同上题情况，该股现在已经跌到20元，而您估计该股近期有一半机会继续下跌到15元，您现在会：</h3>
                <label><input type="radio" name="problem8" value="1" v-model="snaq.problem8"><span>立刻卖出</span></label>
                <label><input type="radio" name="problem8" value="2" v-model="snaq.problem8"><span>部分卖出</span></label>
                <label><input type="radio" name="problem8" value="3" v-model="snaq.problem8"><span>继续持有</span></label>
                <label><input type="radio" name="problem8" value="4" v-model="snaq.problem8"><span>继续买入</span></label>
            </div>
            <div class="item">
                <h3>9.当您进行投资时，您的首要目标是：</h3>
                <label><input type="radio" name="problem9" value="1" v-model="snaq.problem9"><span>
                资产保值，我不愿意承担任何投资风险</span></label>
                <label><input type="radio" name="problem9" value="2" v-model="snaq.problem9"><span>尽可能保证本金安全，不在乎收益率比较低</span></label>
                <label><input type="radio" name="problem9" value="3" v-model="snaq.problem9"><span>产生较多的收益，可以承担一定的投资风险</span></label>
                <label><input type="radio" name="problem9" value="4" v-model="snaq.problem9"><span>实现资产大幅增长，愿意承担很大的投资风险</span></label>
            </div>
            <div class="item">
                <h3>10.您的投资经验可以被概括为：</h3>
                <label><input type="radio" name="problem10" value="1" v-model="snaq.problem10"><span>
                有限：除银行活期账户和定期存款外，我基本没有其他投资经验</span></label>
                <label><input type="radio" name="problem10" value="2" v-model="snaq.problem10"><span>一般：除银行活期账户和定期存款外，我购买过基金、保险等理财产品，但还需要进一步的指导</span></label>
                <label><input type="radio" name="problem10" value="3" v-model="snaq.problem10"><span>丰富：我是一位有经验的投资者，参与过股票、基金等产品的交易，并倾向于自己做出投资决策</span></label>
                <label><input type="radio" name="problem10" value="4" v-model="snaq.problem10"><span>非常丰富:我是一位非常有经验的投资者，参与过权证、期货或创业板等高风险产品的交易</span></label>
            </div>
            <div class="item">
                <h3>11.您是否了解证券市场的相关知识：</h3>
                <label><input type="radio" name="problem11" value="1" v-model="snaq.problem11"><span>
                从来没有参与过证券交易，对投资知识完全不了解</span></label>
                <label><input type="radio" name="problem11" value="2" v-model="snaq.problem11"><span>学习过证券投资知识，但没有实际操作经验，不懂投资技巧</span></label>
                <label><input type="radio" name="problem11" value="3" v-model="snaq.problem11"><span>了解证券市场的投资知识，并且有过实际操作经验，懂得一些投资技巧</span></label>
                <label><input type="radio" name="problem11" value="4" v-model="snaq.problem11"><span>参与过多年的证券交易，投资知识丰富，具有一定的专业水平</span></label>
            </div>
            <div class="item">
                <h3>12.您用于证券投资的资金不会用作其他用途的时间段为：</h3>
                <label><input type="radio" name="problem12" value="1" v-model="snaq.problem12"><span>短期——1年以下</span></label>
                <label><input type="radio" name="problem12" value="2" v-model="snaq.problem12"><span>中期——1年到5年</span></label>
                <label><input type="radio" name="problem12" value="3" v-model="snaq.problem12"><span>长期——5年以上</span></label>
            </div>
            <a href="javascript:void(0);" class="submit" @click="submitval($event)">提交问卷</a>
        </div>
    </div>
</template>
<style scoped>
    @import "../../../css/pay.css";
</style>