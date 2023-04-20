<template>
  <!-- 桌機版 -->
    <ul class="desktop_screen list-group me-2">
      <router-link to="/" class="list-group-item" aria-disabled="true">履歷</router-link>
      <router-link to="/shoppingmall" class="list-group-item">商品列表</router-link>
      <router-link to="/shoppingcart" class="list-group-item d-flex justify-content-between">
        <span>購物車</span>
        <span v-if="store.allCount" class="badge bg-dark rounded-circle">{{ store.allCount }}</span>
      </router-link>
      <!-- <router-link to="/" class="list-group-item">訂單列表</router-link> -->
      <router-link to="/music" class="list-group-item">音樂播放器</router-link>
      <router-link to="/weather" class="list-group-item">氣象API</router-link>

      <!-- bootstrap accordion -->
      <div class="accordion accordion-flush" id="navbar_accordion">
        <div class="accordion-item ">
          <h2 class="accordion-header" id="navbar_accordion1">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_desktop" aria-expanded="false" aria-controls="collapse_desktop">
              後台系統
            </button>
          </h2>
          <div id="collapse_desktop" class="accordion-collapse collapse" aria-labelledby="nav1" data-bs-parent="#navbar_accordion">
            <router-link to="/addproduct" class="list-group-item">新增商品</router-link>
          </div>
        </div>
      </div>
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
        <router-link to="/" class="list-group-item" aria-disabled="true">履歷</router-link>
        <router-link to="/shoppingmall" class="list-group-item">商品列表</router-link>
        <router-link to="/shoppingcart" class="list-group-item d-flex justify-content-between">
          <span>購物車</span>
          <span v-if="store.allCount" class="badge bg-dark rounded-circle">{{ store.allCount }}</span>
        </router-link>
        <!-- <router-link to="/" class="list-group-item">訂單列表</router-link> -->
        <router-link to="/music" class="list-group-item">音樂播放器</router-link>
        <router-link to="/weather" class="list-group-item">氣象API</router-link>

        <!-- bootstrap accordion -->
        <div class="accordion" id="navbar_accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="navbar_accordion1">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_desktop" aria-expanded="false" aria-controls="collapse_desktop">
              後台系統
            </button>
          </h2>
          <div id="collapse_desktop" class="accordion-collapse collapse" aria-labelledby="nav1" data-bs-parent="#navbar_accordion">
            <router-link to="/addproduct" class="list-group-item">新增商品</router-link>
          </div>
        </div>
      </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import emitter from '@/methods/emitter.js'
import { usePurchaseItemStore } from '@/store/usePurchaseItemStore'

export default {
  data () {
    return {
      store: usePurchaseItemStore(),
      myoffcanvas: '',
      navSelected: '',
      myCartsLength: 1
    }
  },
  mounted () {
    this.myoffcanvas = new Offcanvas('#offcanvasExample')
    emitter.on('purchaseLength', (myCartsLength) => {
      this.myCartsLength = myCartsLength
    })

    // 根據路由的網址，使accordion套件，是收合起來？還是展開？
    if (this.$route.name === 'addproduct') {
      const accordionBtn = document.querySelectorAll('.accordion-button')
      const accordionArea = document.querySelectorAll('.accordion-collapse')

      accordionBtn[0].classList.remove('collapsed')
      accordionBtn[1].classList.remove('collapsed')

      accordionArea[0].classList.add('show')
      accordionArea[1].classList.add('show')
    }
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
.accordion-button{
  height: 50.9px;
  border: 1px solid rgb(0,0,0,0.125);
}
</style>
