<template>
  <div class="hello">
    <button @click="goBack()">回退</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      
    }
  },
  methods: {
    goBack () {
      let vm = this
      vm.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
