<template>
    <div class="expression">
      <div class="trangle"></div>
      <Tabs name="tab-2a" value="2a2">
        <!--<TabPane label="个人常用语" name="2a1" tab="tab-2a">-->
          <!--<div class="search">-->
            <!--<Input prefix="ios-search" v-model="searchText" placeholder="搜索常用语" />-->
            <!--</Input>-->
          <!--</div>-->
          <!--<div class="content">-->
             <!--<span class="expression-btn">-->
                  <!--<Icon type="ios-add" @click="handleAdd" />-->
                  <!--<Icon type="ios-create-outline" />-->
                 <!--<Icon type="ios-trash-outline" />-->
                <!--</span>-->
            <!--<Collapse>-->
              <!--<Panel name="1">-->
                <!--<span>打招呼</span>-->
                <!--<div slot="content">-->

                <!--</div>-->
              <!--</Panel>-->
            <!--</Collapse>-->
          <!--</div>-->
        <!--</TabPane>-->
        <TabPane label="公共常用语" name="2a2" tab="tab-2a"><common-expression></common-expression></TabPane>
      </Tabs>
      <Modal
        v-model="personalModal"
        title="新建常用语（个人）"
        width=40>
       <div class="addExpression">
         <Form ref="personalForm" :model="personalForm" :rules="rulePersonalForm" :label-width="80">
           <FormItem label="分组" prop="group">
             <Select v-model="personalForm.group" placeholder="请选择分组" style="width:200px">
               <Option value="1">打招呼</Option>
               <Option value="2">未知组</Option>
             </Select>
           </FormItem>
           <FormItem label="标题" prop="title">
             <Input v-model="personalForm.title" placeholder="请输入标题名称（2-20个字符）..."></Input>
           </FormItem>
           <FormItem label="回复类型" prop="type">
             <Select v-model="personalForm.type" placeholder="请选择回复类型" style="width:200px">
               <Option value="0">选择类型</Option>
               <Option value="1">文字</Option>
               <Option value="2">图片</Option>
               <Option value="3">语音</Option>
               <Option value="4">视频</Option>
               <Option value="4">链接</Option>
             </Select>
           </FormItem>
           <FormItem label="回复内容" prop="content">
             <Input v-model="personalForm.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入回复内容..."></Input>
           </FormItem>
         </Form>
       </div>
        <div slot="footer">
          <Button type="text" size="large" @click="onCancle">取消</Button>
          <Button type="primary" size="large" @click="addExpression">确定</Button>
        </div>
      </Modal>
    </div>

</template>

<script>
  import CommonExpression from './commonExpression'
  const valideTitle = (rule,value,callBack) => {
    if (!value) {
      callBack(new Error('标题名称不能为空！'));
    }else if (value.length<2 || value.length >20) {
      callBack(new Error('标题名称长度在2-20个字符之间！'));
    } else {
      callBack ()
    }
  }
    export default {
        name: "expression",
      components:{
        CommonExpression
      },
      data () {
          return {
            searchText:'',
            personalModal:false,
            personalForm:{
              group:"",
              title:'',
              type:'',
              content:''
            },
            rulePersonalForm: {
              group: [
                { required: true, message: '请选择分组', trigger: 'change' }
              ],
              title: [
                { required: true,validator: valideTitle, trigger: 'blur' }
              ],
              type: [
                { required: true, message: '请选择回复类型', trigger: 'change' }
              ],
              content: [
                { required: true, message: '回复内容不能为空！', trigger: 'blur' }
              ],
            }
          }
      },
      methods:{
        handleAdd () {
          this.personalModal = true
        },
        onCancle () {
          this.personalModal =false;
          this.$refs['personalForm'].resetFields()
        },
        addExpression () {
          this.$refs['personalForm'].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {

            }
          })
        },
        cancelModal () {

        }
      }
    }
</script>

<style lang="less">
  .expression {
    height: 100%;
    position: relative;
    .trangle {
      width: 0;
      height: 0;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      border-bottom: 8px solid rgba(254,222,152,0.23);
      position: absolute;
      z-index: 2;
      top: -8px;
      left: 25%;

    }
    .ivu-tabs {
      height: 100%;
      .ivu-tabs-bar {
        margin-bottom: 0;
        background: #fff;
        height: 44px;

        border-bottom: 0px solid #F0F2F5;
        .ivu-tabs-nav {
          width: 100%;
          .ivu-tabs-ink-bar {
            display: none;
          }
          .ivu-tabs-tab {
            width: 100%;
            margin: 0;
            padding: 0;
            text-align: center;
            font-size: 14px;
            line-height: 44px;
            background:rgba(254,222,152,0.23);
          }
        }
      }
      .ivu-tabs-content {
        height: calc(100% - 44px);
      }
    }
    .search {
      padding: 10px;
      .ivu-input {
        background: #F1F2F7;
        border-radius:2px;
        border: none;
      }
    }
    .content {
      .ivu-collapse > .ivu-collapse-item.ivu-collapse-item-active > .ivu-collapse-header {
        border-bottom: 0;
      }
      position: relative;
      .ivu-collapse {
        border: 0;
        background: #fff;
        .ivu-collapse-header {
          padding-left: 10px;
          padding-top: 10px;
          color: #959CB6;
          .ivu-icon {
            margin-right: 0;
            font-size: 24px;
            color: #959CB6;
            float: left;
          }
          span {
            display: inline-block;
            width: 160px;
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
          padding-left: 10px;
          ul {
            li {
              font-size: 11px;
              color: #434349;
              padding: 8px 0 8px 10px;
              background: #F1F2F7;
            }
          }
        }
      }
      .expression-btn {
        position: absolute;
        right: 0;
        margin-right: 20px;
        display: inline-block;
        height: 38px;
        line-height: 38px;
        z-index: 3;
        .ivu-icon {
          font-size: 26px;
          cursor: pointer;

        }
      }
    }
  }
  .addExpression {
    padding: 20px 50px;
  }

</style>
