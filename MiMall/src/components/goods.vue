<template>
<p>商品页面</p>
</template>

<script>
import {getGoodsList} from 'api/goods'

export default {
  data() {
    return {
      goods : {}
    }
  },
  created() {
    this._getGoodsList()
  },
  methods: {
    _getGoodsList() {
      getGoodsList().then((res) => {
        this.goods = JSON.stringify(res.data)
        console.log(this.goods)
      })
    }
  }
}

</script>
<style type="text/css">

</style>
