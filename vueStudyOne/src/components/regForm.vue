<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line" >
        <div class="g-form-input">
          <input type="text" 
           placeholder="请输入用户名">
        </div>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'isShow': 'boolean'
  },
  data () {
    return {
      
    }
  },
  computed: {
    userErrors () {
      let status, errorText
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '必须包含@'
      }
      else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let status, errorText
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '必须包含@'
      }
      else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    background-color:#4fc08d;
    color:#fff;
    cursor:pointer;
}
</style>
