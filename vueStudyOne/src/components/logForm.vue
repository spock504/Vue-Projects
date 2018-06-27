<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
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
      let errorText, status
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      }
      else {
        status = true
        errorText = ''
      }
      // 刚进来的时候值为空，之后一直判断
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
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      }
      else {
        this.errorText = ''
        this.$http.get('api/login')
        .then((res) => {
          this.$emit('has-log', res.data)
          // console.log(res)
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
}
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
    background-color:#37a90c;
    color:#fff;
    cursor:pointer;
}
</style>
