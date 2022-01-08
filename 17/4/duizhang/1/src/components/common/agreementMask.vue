<template>
    <div class="agreementMask">
        <div class="mask" @click="popHiden"></div>
        <div class="word">
           <h2 v-if="layer.poupTitle" v-text="layer.poupTitle"></h2>
           <div class="wordContent" v-html="layer.poupContent">
           </div>
           <a v-if="layer.btnTxt" class="wordbtn" href="javascript:void(0);"  @click="mask" v-text="layer.btnTxt"></a>
        </div>
    </div>
</template>

<script>
    export default {
      methods:{
          mask(){ 
              this.$dispatch('protocolLayer',false);
          },
          popHiden(){
              this.$dispatch('hideLayer',false);
          }
      },
      props:{
        layer:{
          type:Object
        }
      }
    }
</script>