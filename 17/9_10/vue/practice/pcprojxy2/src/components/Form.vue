<template>
<form class='userForm'>
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
</template>
</template>
<script>
export default {
  name: 'userForm',
  props: ['msg']
}
</script>
<style>
@import "../../static/index1.css";
</style>