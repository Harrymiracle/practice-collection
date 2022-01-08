// 暂时没想到好的方法封装 2020-07-22

let config = {
  input: {
    label: '名称',                    // 表单标签
    type: 'input',                   // 表单类型
    validator: function () {},    // 表单验证规
    rules: '必填，长度为4-16个字符',    // 填写规则提示
    success: '格式正确',              // 验证通过提示
    fail: '名称不能为空'               // 验证失败提示
  }
}