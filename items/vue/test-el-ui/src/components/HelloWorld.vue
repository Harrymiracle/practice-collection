<template>
  <div class="hello">
    {{message}} <p><button @click="updateMessage()">按钮</button></p>
    <div v-if="update">更新前</div>
    <button @click="reload()">刷新</button>
    <button @click="addNewAttr()">增加新属性</button>
    <p>
      <!-- <input type="text" v-model.lazy="msg" placeholder="请输入…"> -->
      <input type="text" v-model.trim.lazy="msg" placeholder="请输入…">
      <span>{{msg}}</span>
    </p>  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: '未更新',
      update: true,
      msg: '',
    }
  },
  methods:{
    updateMessage: async function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      await this.$nextTick()
      console.log(this.$el.textContent) // => '已更新'
    },
    reload() {
      // 移除组件
      this.update = false
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    },
    addNewAttr() {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
