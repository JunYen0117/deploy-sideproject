<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePurchaseItemStore } from '@/store/usePurchaseItemStore.js'
import { dataBase } from '@/composables/db.js'
import { doc, getDoc } from 'firebase/firestore'

const route = useRoute()
const id = route.params.id
const count = ref(1)

// pinia
const store = usePurchaseItemStore()
const { addCartStore } = store

// firebase
const { db } = dataBase()
const docRef = doc(db, 'products', `${id}`)
const product = ref('')

const subtotal = computed(() => {
  return product.value.price * count.value
});

// IIFE 立即執行：從firebase取得資料
(async function () {
  const getContent = await getDoc(docRef)
  if (getContent.exists()) {
    product.value = getContent.data()
    console.log(product.value)
  }
})()

const minusProduct = () => {
  if (count.value >= 2) {
    count.value--
  }
}
const plusProduct = () => {
  count.value++
}

function a () {}
a()
</script>

<template>
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9">
      <div class="d-flex flex-column flex-md-row">
        <figure class="product_detail_img_frame">
          <img :src="product.imgUrl">
        </figure>
        <div class="product_detail_right_info">
          <div class="h4">{{ product.name }}</div>
          <div class="h4">NT$<span class="product_detail_price text-secondary">&emsp;{{ product.price }}</span></div>
          <div class="d-flex my-3">
              <div @click="minusProduct()" class="num_minus bg-dark">
                <span class="text-center" style="color: white;">
                  <font-awesome-icon icon="fa-solid fa-minus" />
                </span>
              </div>
              <input :value="count" class="num_input text-center" type="text" min="1" readonly>
              <div @click="plusProduct()" class="num_plus bg-dark">
                <span class="text-center" style="color: white;">
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </span>
              </div>
            </div>
          <button
            @click="addCartStore(product, count, subtotal)"
            type="button"
            class="addCart_btn btn btn-secondary d-block">
            加入購物車
          </button>
        </div>
      </div>
      <hr>
      <div class="product_description mx-auto p-1 p-md-2 mb-2">{{ product.description }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  span{
    display: block;
  }
  .product_detail_img_frame{
    width: 50%;
    img{
      display: block;
      width: 75%;
    }
  }
  @media screen and (max-width: 768px) {
    .product_detail_img_frame{
    width: 100%;
      img{
        width: 90%;
        margin: 0 auto;
      }
    }
  }
  .product_detail_right_info{
    width: 50%;
    .product_detail_price{
      display: inline;
    }
    .addCart_btn{
      display: block;
      width: 70%;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 768px){
    .product_detail_right_info{
    width: 90%;
    padding-left: 20px;
      .product_detail_price{
        display: inline;
      }
      .addCart_btn{
        width: 100%;
        margin: 0 auto;
      }
    }
  }
  .product_description {
    width: 95%;
    white-space: pre-wrap;
    box-shadow: 0 2px 10px lightgray;
  }
  .num_minus, .num_plus{
    width: 50px;
  }
  .num_input{
    width: 50px;
  }
</style>
