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
            <router-link to="/dashboard" class="list-group-item">商品總覽</router-link>
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
            <router-link to="/dashboard" class="list-group-item">商品總覽</router-link>
            <router-link to="/addproduct" class="list-group-item">新增商品</router-link>
          </div>
        </div>
      </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import { usePurchaseItemStore } from '@/store/usePurchaseItemStore'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = usePurchaseItemStore()
const router = useRouter()
const myoffcanvas = ref(null)
let firstVisit = true

router.beforeEach((to, from) => {
  if (myoffcanvas.value === null) return
  // 首次進入網站，不執行下列1. 2.
  if (firstVisit) {
    firstVisit = false
    return
  }

  // 1. 如果路由不是下列的位置，把accordion收合
  if (to.path !== '/dashboard' && to.path !== '/addproduct') {
    const accordionBtns = document.querySelectorAll('.accordion-button')
    const accordionDetails = document.querySelectorAll('.accordion-collapse')

    accordionBtns.forEach(btn => {
      btn.classList.add('collapsed')
      btn.setAttribute('aria-expanded', 'false')
    })
    accordionDetails.forEach(detail => {
      detail.classList.remove('show')
    })
  }

  // 2. 手機版，改變路由時，收合offcanvas
  myoffcanvas.value.toggle()
})

onMounted(() => {
  myoffcanvas.value = new Offcanvas('#offcanvasExample')
})
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
