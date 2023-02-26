<template>
  <!-- 桌機版 -->
    <ul class="desktop_screen list-group me-2">
      <router-link to="/profile" class="list-group-item" aria-disabled="true">履歷</router-link>
      <router-link to="/shoppingmall" class="list-group-item">商品列表</router-link>
      <router-link to="/shoppingcart" class="list-group-item d-flex justify-content-between">
        <span>購物車</span>
        <span v-if="myCartsLength" class="badge bg-dark rounded-circle">{{ myCartsLength }}</span>
      </router-link>
      <!-- <router-link to="/" class="list-group-item">訂單列表</router-link> -->
      <router-link to="/music" class="list-group-item">音樂播放器</router-link>
    </ul>

  <!-- 手機版 -->
  <font-awesome-icon
   icon="fa-solid fa-bars"
   size="2x"
   border
   style="background: #eee;"
   class="mobile_screen_btn"
   data-bs-toggle="offcanvas"
   data-bs-target="#offcanvasExample"
   aria-controls="offcanvasExample" />

  <div class="mobile_screen offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h3 style="visibility: hidden;">選單</h3>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="list-group container-fluid">
        <router-link to="/profile" class="list-group-item" aria-disabled="true">履歷</router-link>
        <router-link to="/shoppingmall" class="list-group-item">商品列表</router-link>
        <router-link to="/shoppingcart" class="list-group-item d-flex justify-content-between">
          <span>購物車</span>
          <span v-if="myCartsLength" class="badge bg-dark rounded-circle">{{ myCartsLength }}</span>
        </router-link>
        <!-- <router-link to="/" class="list-group-item">訂單列表</router-link> -->
        <router-link to="/music" class="list-group-item">音樂播放器</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import emitter from '@/methods/emitter.js'

export default {
  inject: ['count'],
  data () {
    return {
      myoffcanvas: '',
      navSelected: '',
      myCartsLength: 0
    }
  },
  created () {
  },
  mounted () {
    this.myoffcanvas = new Offcanvas('#offcanvasExample')
    emitter.on('purchaseLength', (myCartsLength) => {
      this.myCartsLength = myCartsLength
    })
    this.myCartsLength = this.count.myCartsLength
  }
}
</script>

<style lang="scss">
.desktop_screen{
  display: block;
  position: fixed;
  width: 24vw;
}
@media screen and (min-width: 768px) {
  .desktop_screen{
    display: block;
  }
  .mobile_screen, .mobile_screen_btn{
    display: none;
  }
};
@media screen and (max-width: 768px) {
  .desktop_screen{
    display: none;
  }
  .mobile_screen, .mobile_screen_btn{
    display: block;
  }
};
.mobile_screen{
  width: 100vw !important;
}
.offcanvas-body{
  padding: 0;
  .list-group{
    padding: 0;
  }
}
.mobile_screen_btn{
  position: fixed;
  z-index: 10;
}
</style>
