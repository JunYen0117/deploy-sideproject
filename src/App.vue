<template>
  <router-view></router-view>
  <PurchaseInfo
    @purchaseLength="purchaseLength"
    @carts="getCartsData"></PurchaseInfo>
</template>

<script>
// import emitter from '@/methods/emitter.js'

export default {
  data () {
    return {
      count: {
        myCartsLength: 0,
        myCarts: []
      }
    }
  },
  provide () {
    return {
      count: this.count
    }
  },
  methods: {
    purchaseLength (item) {
      this.count.myCartsLength = item
    },
    getCartsData (item) {
      this.count.myCarts = item
    }
  },
  watch: {
    $route () {
      // 路由url改變，清除播放器的計時
      setTimeout(() => {
        clearInterval(window.time)
      }, 100)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
@import './assets/all.scss'
</style>
