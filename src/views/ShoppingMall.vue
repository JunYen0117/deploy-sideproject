<template class="body">
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9 shopping_mall">
      <SearchArea></SearchArea>
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
            <div v-for="item in productsList" :key="item.product_name" class="product_card col-4 p-2">
              <figure class="product_img_frame">
                <img class="w-100 product_img" :src=" item.url[0]==='' ? `https://picsum.photos/200` : `${item.url[0]}` " alt="">
              </figure>
              <h4 class="text-center text-truncate">{{ item.product_name }}</h4>
              <div>{{ item.category }}</div>
              <div class="d-flex justify-content-between">
                <h5>NT$</h5>
                <h5>{{ item.price }}</h5>
              </div>
              <button type="button" class="btn btn-dark d-block w-75 mx-auto"
                @click="addCart(item)">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AllProducts @products="getData"></AllProducts>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SearchArea from '@/components/SearchArea.vue'
import AllProducts from '@/components/AllProducts'
import emitter from '@/methods/emitter'

export default {
  components: {
    NavBar,
    SearchArea,
    AllProducts
  },
  data () {
    return {
      originalProducts: [],
      temp: [],
      renderProducts: [],
      renderIndex: 0,
      loadingItems: false,
      itemIndexStarter: 0,
      itemIndexEnding: 39
    }
  },
  methods: {
    getData (data) {
      data = JSON.parse(JSON.stringify(data))
      // console.log(data)
      this.originalProducts = data
      this.temp = this.originalProducts.filter((v, i) => {
        return i >= this.itemIndexStarter && i <= this.itemIndexEnding
      })
      this.renderProducts.push(this.temp)
    },
    addCart (item) {
      const purchaseItem = JSON.parse(JSON.stringify(item))
      purchaseItem.count = 1
      purchaseItem.subtotal = purchaseItem.price
      emitter.emit('purchaseItem', purchaseItem)
    }
  },
  watch: {
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
      const y = window.pageYOffset
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
  }
}
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
