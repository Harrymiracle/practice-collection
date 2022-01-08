<template>
  <div class="promptLayer">
    <div class="mask"></div>
    <div class="contentBox">
      <div class="title" v-if="title">提示</div>
      <div class="content" v-html="prompttxt"></div>
      <button class="submit" @click="ok" v-text="btntxt"></button>
    </div>
  </div>
</template>

<script>

  export default {
    props:{
      prompttxt:{
        type:String
      },
      title:{
        type:Boolean,
        default:true
      },
      btntxt:{
        type:String,
        default:"确认"
      }
    },
    methods:{
      ok:function(){
        this.$dispatch('hidep',false);
      }
    }
  }
</script>