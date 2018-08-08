<template>
  <div>
<p>购物车页面</p>
</div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.getCarList()
  },
  methods: {
    getCarList() {
      axios.get('users/carList').then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style type="text/css">

</style>
