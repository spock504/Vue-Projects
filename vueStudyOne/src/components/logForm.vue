<template>
  <div class="login-form">
    <div class="g-form">

      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <!-- 绑定用户的输入值，并且跟条件去匹配 -->
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>

      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>

      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      // 定义两个变量，显示错误消息和判断输入的状态
      let errorText, status
      if (!/@/g.test(this.usernameModel)) {
        // 不匹配则状态错误，并且显示错误消息
        status = false
        errorText = '不包含@'
      }
      else {
        status = true
        errorText = ''
      }
      // 新建个变量来控制刚进来的时候值为空，之后一直存在值
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      // 判断两者的输入状态
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      }
      else {
        this.errorText = ''
        // 向db.json请求数据
        this.$http.get('api/login')
        .then((res) => {
          // 请求成功后把数据发送给父组件
          this.$emit('has-log', res.data)
          console.log(res)
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
};
</script>

<style scoped>
.g-form-line{
  width:500px;
  overflow:hidden;
  margin-bottom:20px;
}
.g-form-label {
  width:80px;
  float:left;
}
.g-form-input {
  width:200px;
  float:left;
}
.g-form-error {
  float:left;
  color:#red;
}
.g-form-btn{
    width:50px;
    height:30px;
    line-height:30px;
    text-align:center;
    color:#fff;
    background-color:#4fc08d;
    cursor:pointer;
}
</style>
