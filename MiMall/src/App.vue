<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
</style>
