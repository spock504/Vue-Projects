<template>
<p>商品页面</p>
</template>

<script>
import {getGoodsList, ERR_OK} from 'api/goods'

export default {
  created() {
    this._getGoodsList()
  },
  methods: {
    _getGoodsList() {
      getGoodsList().then((res) => {
        console.log(res)
      })
    }
  }
}

</script>
<style type="text/css">

</style>
