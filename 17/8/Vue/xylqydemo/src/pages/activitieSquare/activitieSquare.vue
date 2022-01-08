<template>
  <div class="test">
  {{msg}}
  </div>
</template>

<script>
export default {
  name: 'activiteSquare',
  data () {
    return {
      msg: 'activiteSquare'
    }
  },
  create(){

  },
  mounted(){

  },
  method(){

  }
  //, component:""
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url('../../assets/style/ximin.scss');
  @function torem($px){
  @return $px / 75px * 1rem;
  }

  .test {font-size: torem(32px);}
</style>
