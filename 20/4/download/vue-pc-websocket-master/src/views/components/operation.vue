<template>
    <div class="operation">
      <template v-if="routeName === 'chatList'">
        <Tabs name="tab" value="b">
          <TabPane label="常用语" name="a" tab="tab" icon="icomoon i-icon-expression">
            <expression></expression></TabPane>
          <TabPane label="资料" name="b" tab="tab" icon="icomoon i-icon-information">
            <information></information></TabPane>
        </Tabs>
      </template>
      <template v-else>
        <div class="informationOnly">
          <Tabs name="tab" value="b">
            <TabPane label="资料" name="b" tab="tab" icon="icomoon i-icon-information">
              <information></information></TabPane>
          </Tabs>
        </div>
      </template>
    </div>
</template>

<script>
  import Information from './operation/information'
  import Expression from  './operation/expression'
      export default {
          name: "operation",
          props:{
              routeName:String
          },
          components:{
            Information,
            Expression
          }
      }
</script>

<style lang="less">
  @font-face {
    font-family: "icomoon";
    src:  url('../../assets/fonts/icomoon.eot?yfsbtw');
    src:  url('../../assets/fonts/icomoon.eot?yfsbtw#iefix') format('embedded-opentype'),
    url('../../assets/fonts/icomoon.ttf?yfsbtw') format('truetype'),
    url('../../assets/fonts/icomoon.woff?yfsbtw') format('woff'),
    url('../../assets/fonts/icomoon.svg?yfsbtw#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
    color: #959cb6;
  }
  .i-icon-expression:before {
    content: "\e900";

  }
  .i-icon-information:before {
    content: "\e901";
  }

  .operation {
    width: 100%;
    height: 100%;
    float: left;
    .informationOnly {
      width: 100%;
      height: 100%;
      .ivu-tabs-tab {
        width: 100% !important;
      }
    }
    .ivu-tabs {
      height: 100%;
      .ivu-tabs-bar {
        margin-bottom: 0;
        background: #F7F8FA;
        height: 60px;
        border-bottom: 0px solid #F0F2F5;
        .ivu-tabs-nav {
          width: 100%;
          .ivu-tabs-ink-bar {
            display: none;
          }
          .ivu-tabs-tab {
            width: 50%;
            margin: 0;
            padding: 0;
            text-align: center;
            font-size: 16px;
            line-height: 60px;
            color: #959CB6;
            background: #fff;

            img {
              margin-bottom: -3px;
            }
            .i-icon-expression,.i-icon-information {
              font-family: 'icomoon' !important;
              margin-top: -4px;
            }
          }
          .ivu-tabs-tab-active {
            color: #f5a623;
          }
          .ivu-tabs-tab:hover {
            color: #f5a623;
          }
        }
      }
      .ivu-tabs-content {
        height: calc(100% - 60px);
      }
    }

  }

</style>
