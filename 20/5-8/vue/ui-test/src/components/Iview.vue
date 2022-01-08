<template>
  <div class="iview">
    <Button @click="modal12 = true">Open the first modal</Button>
    <Button @click="modal13 = true">Open the second modal</Button>
    <Modal v-model="modal12" draggable scrollable title="Modal 1">
        <div>This is the first modal</div>
    </Modal>
    <Modal v-model="modal13" draggable scrollable title="Modal 2">
        <div>This is the second modal</div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Element',
  data () {
    return {
      modal12: false,
      modal13: false
    }
  },
  methods: {
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
