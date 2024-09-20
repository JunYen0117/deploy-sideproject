<template>
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9 shopping_mall">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route () {
      // 路由url改變，清除播放器的計時
      setTimeout(() => {
        clearInterval(window.time)
      }, 100)
    }
  }
}
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
