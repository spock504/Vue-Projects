<template>
  <div id="app">
    <div class="content-wrap">
      <div class="content">
        <m-header></m-header>
        <tab></tab>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from 'components/m-header'
import Tab from 'components/tab'
import Footer from 'components/footer'

export default {
  components: {
    MHeader,
    Tab,
    MFooter:Footer,
  }
}
</script>

<style>
#app {
  height: 100%;
}
.content-wrap {
  min-height: 100%;
}
.content {
  padding-bottom: 100px;
}
</style>
