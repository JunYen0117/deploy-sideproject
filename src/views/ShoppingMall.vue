<template>
  <SearchArea
    :child_allProducts="allProducts"
    @search="GetData2"
    @filter="GetData2"
  />
  <div ref="productsArea" class="productsArea">
    <div class="row w-100 mt-5">
      <div v-for=" (productsList) in renderProducts" :key="productsList" class="hereloop row w-100">
        <div v-for="item in productsList" :key="item.name" class="product_card col-4 p-2">
          <figure class="product_img_frame">
            <img class="w-100 product_img" :src="item.imgUrl" alt="">
          </figure>
          <h4 class="text-center text-truncate">{{ item.name }}</h4>
          <div>{{ item.category }}</div>
          <div class="d-flex justify-content-between">
            <h5>NT$</h5>
            <h5>{{ item.price }}</h5>
          </div>
          <button type="button" class="btn btn-dark d-block w-75 mx-auto"
            @click="GoProductDetail2(item.newId)">商品詳情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import SearchArea from '@/components/SearchArea.vue'
import { storeToRefs } from 'pinia'
import { useGetAllProducts } from '@/store/useGetAllProducts.js'
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const getProductStore = useGetAllProducts()
const { allProducts } = storeToRefs(getProductStore) // json陣列： [200多筆全筆資料]
let loadingItems = ref(false)
let temp = [] // json陣列：篩選陣列： [40筆資料]
let reRender = ref(false)
const renderProducts = reactive([]) // 陣列包json陣列： [[40筆資料],[40筆資料],[40筆資料]...]
let renderIndex = 0
let itemIndexStarter = 0
let itemIndexEnding =39

const GetData2 = (data, clearScreen) => {
  loadingItems.value = true

  // console.log(data.value)
  // console.log(data.value.length)

  // 搜尋功能、篩選功能，帶有第2個參數「clearScreen」
  // 會先清空HTML的渲染畫面
  if (clearScreen) {
    renderProducts.length = 0
    reRender = true
  }
  
  temp = data.value.filter((v, i) => {
    return i >= itemIndexStarter && i <= itemIndexEnding
  })

  renderProducts.push(temp)

  loadingItems.value = false
  reRender = false
}

const GoProductDetail2 = (id) => {
  router.push(`/productdetail/${id}`)
}

watch(reRender, () => {
  window.scrollTo(0, 0)
})
onMounted(() => {
  GetData2(allProducts)
})
</script>

<style scoped lang="scss">
.productsArea{
  height: 100vh;
  .product_card{
    width: 25%;
  }
  @media screen and (max-width: 1200px ){
    .product_card{
    width: 50%;
    }
  }
}
.product_img_frame{
  height: 20vw;
}
@media screen and (max-width: 1200px){
  .product_img_frame{
    height: 35vw;
  }
}
.product_img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
