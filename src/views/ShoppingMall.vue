<!-- 備份商品列表 -->
<template class="body">
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9 shopping_mall">
      <SearchArea
        :child_allProducts="this.allProducts"
        @search="getData"
        @filter="getData"
      />
      <div ref="productsArea" class="productsArea">
        <div class="row w-100 mt-5">
          <!-- <div class="product_card col-4 p-2">
            <figure>
              <img class="w-100" src="https://picsum.photos/200" alt="">
            </figure>
            <h4 class="text-center">商品標題</h4>
            <div>種類</div>
            <div class="d-flex justify-content-between">
              <h5>NT$</h5>
              <h5>100</h5>
            </div>
            <button type="button" class="btn btn-secondary d-block w-75 mx-auto">加入購物車</button>
          </div> -->
          <!--  -->
          <div v-for=" (productsList) in renderProducts" :key="productsList" class="row w-100">
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
                @click="goProductDetail(item.newId)">商品詳情</button>
              <!-- <button type="button" class="btn btn-dark d-block w-75 mx-auto"
                @click="store.addCartStore(item)">加入購物車</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchArea from '@/components/SearchArea.vue'
import { storeToRefs } from 'pinia'
import { useGetAllProducts } from '@/store/useGetAllProducts.js'
import { usePurchaseItemStore } from '@/store/usePurchaseItemStore.js'

export default {
  setup () {
    const getProductStore = useGetAllProducts()
    const { allProducts } = storeToRefs(getProductStore)

    // allProducts是資料庫來的原始資料
    return { allProducts }
  },
  components: {
    SearchArea
  },
  data () {
    return {
      store: usePurchaseItemStore(),
      originalProducts: [], // json陣列： [200多筆全筆資料]
      temp: [], // json陣列：篩選originalProducts陣列： [40筆資料]
      renderProducts: [], // 陣列包json陣列： [[40筆資料],[40筆資料],[40筆資料]...]
      renderIndex: 0,
      loadingItems: false,
      itemIndexStarter: 0,
      itemIndexEnding: 39
    }
  },
  methods: {
    // 何種情境會觸發getData函式：
    // 1. 進入商品列表畫面：mount() -> setTimeout()
    // 2. 搜尋功能：子元件SearchArea.vue -> searchProducts()
    // 3. 篩選功能：子元件SearchArea.vue -> filterProducts()
    getData (data, clearScreen) {
      // console.log(data)

      // 搜尋功能、篩選功能，帶有第2個參數「clearScreen」
      // 會先清空HTML的渲染畫面
      if (clearScreen) {
        this.renderProducts.length = 0
      }

      this.originalProducts = data
      this.temp = this.originalProducts.filter((v, i) => {
        return i >= this.itemIndexStarter && i <= this.itemIndexEnding
      })
      this.renderProducts.push(this.temp)
    },
    goProductDetail (id) {
      this.$router.push(`/productdetail/${id}`)
    }
  },
  watch: {
    // 深層監聽allProducts（從資料庫來的資料）
    // allProducts一開始為空proxy
    // 等資料庫送來內容後，偵測改變，執行getData()，渲染畫面
    allProducts: {
      handler () {
        this.getData(this.allProducts)
      },
      deep: true
    },
    originalProducts () {
      this.itemIndexStarter = 0
      this.itemIndexEnding = 39
      this.renderIndex = 0
      this.renderProducts.length = 1
      window.scrollTo(0, 0)
    },
    itemIndexStarter (n) {
      this.temp = this.originalProducts.filter((v, i) => {
        return i >= this.itemIndexStarter && i <= this.itemIndexEnding
      })
    },
    temp () {
      this.renderProducts[this.renderIndex] = this.temp
    }
  },
  created () {
    window.addEventListener('scroll', () => {
      const x = document.documentElement.scrollHeight
      const y = window.scrollY
      const z = this.$refs.productsArea.clientHeight
      // console.log(x, y, z)
      if (x - y - z <= 50 && this.loadingItems !== true) {
        this.loadingItems = true
        this.itemIndexStarter += 40
        this.itemIndexEnding += 40
        this.renderIndex += 1
        setTimeout(() => {
          this.loadingItems = false
        }, 1000)
      }
    })
  },
  mounted () {
    this.getData(this.allProducts)
  }
}
</script>

<style scoped lang="scss">
/* .shopping_mall{
 } */
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
