<template>
  <div class="ly-emotion" >
    <slot></slot>
  </div>
</template>

<script>
  import list from '../../../commons/emojiList'
  export default {
    name: 'ly-emotion',
    mounted () {
      const name = this.$el.innerHTML
      let index = list.indexOf(name)
        let imgHTML
        if (index >= 0) {
             imgHTML = `<img src="https://btsstatic.oss-cn-shanghai.aliyuncs.com/admin/emoji/${index}.gif">`
        }
      this.$nextTick(() => {
        this.$el.innerHTML = imgHTML
      })
    },
  }
</script>
<style scoped>
  .ly-emotion {
    display: inline-block
  }
  .ly-static-emotion {
    width: 24px;
    height: 24px;
    display: inline-block;
  }
</style>
