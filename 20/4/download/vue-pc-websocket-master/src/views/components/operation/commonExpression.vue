<template>
    <div class="commonExpression">
      <div class="search">
        <Input prefix="ios-search" v-model="searchObj.value" @on-change="handleSearch" placeholder="搜索常用语" />
        </Input>
      </div>
      <div class="common-content" v-show="!searchObj.value">
        <Collapse v-for="(item,key) in expressionList" :key="key" @on-change="getExpressionTitleList(item)">
          <Panel name="1">
            <span>{{ item.name }}</span>
            <div slot="content">
              <ul class="expressionUl">
                <li  v-for="child in item.expression"  @click="handleClick(child,$event)">{{ child.title }}</li>
                <li v-if="item.expression && !item.expression.length" style="text-align: center;color: #999;">暂无常用语~</li>
              </ul>
            </div>
          </Panel>
        </Collapse>
      </div>
      <div class="common-content" v-show="searchObj.value">
        <ul class="searchUl expressionUl">
          <li class="searchli" v-for="item in searchExpressionList"  @click="handleClick(item,$event)">{{ item.title }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
  import jQ from 'jquery'
    export default {
        name: "commonExpression",
      data () {
          return {
            searchObj:{
              value:'',
              name:"key",
              operation:"LIKE",
              type:"string"
            },
            expressionList:[],
            searchExpressionList:[]
          }
      },
      computed :{
        userInfo () {
          return this.$store.state.userInfo
        },
        loginInfo () {
          return this.$store.state.loginInfo;
        },
        detailInfo () {
          return this.$store.state.detailInfo
        },
        selfDetail () {
          return this.$store.state.selfDetail
        }
      },
      methods:{// 点击发送常用语
          handleClick (item,event) {
            let uls = document.getElementsByClassName('expressionUl');
            for (let i=0; i<uls.length;i++) {
              if (uls[i].children.length) {
                for(let j = 0;j<uls[i].children.length;j++) {
                  uls[i].children[j].style.background='#F1F2F7';
                  uls[i].children[j].style.color='#434349';
                }
              }
            }
            event.target.style.background='#FDBE32';
            event.target.style.color='#fff';
            this.$store.dispatch('get',{url:'phrasebook/'+item.book_id}).then(res=>{// 获取公共语内容
              if (res.content_type ==1 || res.content_type ==5) {
                let messageObj ={
                  contentType:res.content_type,
                  chatContent:res.book_content,
                };
                this.$store.commit('setExpressionContent',messageObj);


              }else {
                let date = new Date().getTime();
                let messageObj ={
                  reqId:date+'_'+this.loginInfo.staffId,
                  direction:'0',
                  contentType:res.content_type,
                  chatContent:res.book_content,
                  deviceId:this.userInfo.deviceId,
                  staffIdInApp:this.userInfo.staffIdInApp,
                  targetheadImage:this.selfDetail.header_image,
                  staffId:this.userInfo.staffId
                };
                if (this.detailInfo.contactImIdInApp) {
                  messageObj.targetImAppId = this.detailInfo.contactImIdInApp;
                  messageObj.targetType =1;
                }else  {
                  messageObj.targetImAppId = this.detailInfo.groupImIdInApp;
                  messageObj.targetType =0;
                };
                this.$store.commit('websocketsend',messageObj);
                this.$store.commit('updateMessage',messageObj);
              }
            });


          },
          // 查询常用语
          handleSearch () {
            let params={
              condition: '',
            };
            let arr=[
              {name:"type",operation:"EQ",type:"string",value:1}
            ];
            if (this.searchObj.value) {
              arr.push(this.searchObj);
            }
            params.condition = JSON.stringify(arr);
            this.$store.dispatch('get',{url:'phrasebook/list',params}).then(res=>{
              if (res) {
               this.searchExpressionList = res.result;
              }
            });
          },
          getComExpressionList () {// 获得常用语分组
            let params={
              condition: '',
            };
            let arr=[
              {name:"type",operation:"EQ",type:"string",value:1}
            ];
            if (this.searchObj.value) {
              arr.push(this.searchObj);
            }
            params.condition = JSON.stringify(arr);
            new Promise(resolve => {
              this.$store.dispatch('get',{url:'phrasebook/getPhrasebookGroup',params}).then(res=>{
                if (res.result) {
                  this.expressionList = res.result
                }
              });

            })
          },
        // 获得常用语标题列表
        getExpressionTitleList (row) {
            let params= {
              condition: JSON.stringify(
                [
                  {name:"type",operation:"EQ",type:"string",value:1},
                  {name:"group_id",operation:"EQ",type:"numeric",value:row.group_id}]
              ),
            };
            this.$store.dispatch('get',{url:'phrasebook/list',params}).then(obj=>{// 根据分组id获得该组下的所有常用语
              if (obj) {
                this.$forceUpdate();//强制Vue更新数据; 解决v-for不能渲染
                row.expression = obj.result;
              }
            });
        }
      },
      watch:{
        expressionList () {
          this.$nextTick(function () {
            let str = `<img src="${this.icon.sanjiao}" alt=""/>`;
            jQ('.common-content .ivu-icon').append(str);
          })
        }
      },
      mounted () {
          this.getComExpressionList();

      }
    }
</script>

<style lang="less">
.commonExpression {
  height: 100%;
  .common-content {
    height: calc(100% - 52px);
    overflow-y: auto;
    .searchUl {
      .searchli {
        font-size: 11px;
        color: #434349;
        padding: 8px 0 8px 10px;
        background: #F1F2F7;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: #FDBE32;
        }
      }
    }
    .ivu-collapse > .ivu-collapse-item.ivu-collapse-item-active > .ivu-collapse-header {
      border-bottom: 0;
    }
    .ivu-collapse {
      border: 0;
      background: #fff;
      .ivu-collapse-header {
        padding:10px 10px;
        color: #959CB6;
        .ivu-icon {
          font-size: 24px;
          color: #959CB6;
          float: left;
        }
        span {
          display: inline-block;
          width: 230px;
          height: 24px;
          float: left;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        font-size: 13px;
      }
      .ivu-collapse-content {
        .ivu-collapse-content-box {
          padding-top: 5px;
          padding-bottom: 0px;
        }
        padding-left: 10px;
        ul {
          li {
            font-size: 11px;
            color: #434349;
            padding: 8px 0 8px 10px;
            background: #F1F2F7;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover {
              color: #fff;
              background: #FDBE32;
            }
            .active {
              color: #fff;
              background: #FDBE32;
            }
          }
        }
      }
    }
    .expression-btn {
      float: right;
      margin-right: 20px;
      display: inline-block;
      height: 38px;
      line-height: 38px;
      .ivu-icon {
        font-size: 26px;
        cursor: pointer;

      }
    }
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background:#C3C6D6;
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px #F7F8FA;
      border-radius: 5px;
      background: #fff;
    }
  }
}
</style>
