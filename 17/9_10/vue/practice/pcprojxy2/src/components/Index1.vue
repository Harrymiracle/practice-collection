<template>
  <div class="index1">
  <div class="bg" v-if='hide'></div>
  <form class='userForm' v-if='hide'>
     <p>{{msg}}</p>
     <section>
       <label  for='user'>姓名：</label>
       <input type='text' id='user' name='user' v-model='user' placeholder='请输入用户名' />
     </section>
     <section>
       <label  for='user'>密码：</label>
       <input type='password' id='pwd' name='pwd' v-model='pwd' placeholder='请输入用户名' />
     </section>
     <p><a href='javascript:;' class='addSucceed' @click='addSucceed'>提交</a></p>
    </form>
  <p class='addUser'><a href='javascript:;' @click='addUser'>增加</a></p>
    <div class='tabUser'>
      <table>
        <thead>
          <tr>
            <th>用户名</th>
            <th>密码</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>贾小燕</td>
            <td>122</td>
            <td><a href='javascript:;'>修改</a><a href='javascript:;'>删除</a></td>
          </tr>
          <tr>
            <td>贾小燕</td>
            <td>122</td>
            <td><a href='javascript:;'>修改</a><a href='javascript:;'>删除</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'index1',
  data () {
    return {
      hide: false,
      user: '',
      pwd: '',
      msg: ''
    }
  },
  methods: {
    addUser: function () {
      this.hide = true
      this.msg = '添加用户'
    },
    addSucceed: function () {
      this.hide = false
      console.log(this.user)
    }
  }
}
</script>
<style>
@import "../../static/index1.css";
</style>