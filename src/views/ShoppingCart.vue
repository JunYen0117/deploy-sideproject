<template>
  <table v-if="cartProducts.length !== 0" class="w-100 mt-5 table table-striped">
  <tbody>
    <tr v-for=" item in cartProducts" :key="item.product_name" class="row justify-content-between mb-2">
      <td class="col-2">
        <span @click="store.delProduct(item.id)"
        style="color: #ccc" class="trash fa-2x d-flex justify-content-center mx-auto">
          <font-awesome-icon class="align-self-center" icon="fa-solid fa-trash" />
        </span>
      </td>
      <td class="col-2">
        <figure class="cart_img_frame">
          <img :src="item.imgUrl" alt="">
        </figure>
      </td>
      <td class="col-5 col-md-6 ps-2">
        <div class="h5 md-h3">{{ item.name }}</div>
        <div class="d-flex mt-md-3">
          <div @click="store.minusProduct(item.newId)" class="num_minus bg-dark">
            <span class="text-center" style="color: white;">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </span>
          </div>
          <input :value="item.count" class="num_input text-center" type="text" min="1" readonly>
          <div @click="store.plusProduct(item.newId)" class="num_plus bg-dark">
            <span class="text-center" style="color: white;">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </span>
          </div>
        </div>
      </td>
      <td class="col-3 col-md-2">
        <h5 class="price d-flex justify-content-center">
          <span class="align-self-center">
            ${{ item.subtotal }}
          </span>
        </h5>
      </td>
    </tr>
  </tbody>
  <tfoot class="bg-light row">
    <td class="col-9 col-md-10">
      <h5 class="text-end">總額：</h5>
    </td>
    <td class="col-3 col-md-2">
      <h5 class="text-md-center">${{ store.total }}</h5>
    </td>
  </tfoot>
  </table>
  <!-- 沒物品時顯示 -->
  <div v-if="cartProducts.length === 0" class="no_item">
    <figure class="cart_no_img_frame mt-5">
      <img src="@/assets/no_item_cart.png" alt="">
    </figure>
    <h3 class="text-center mt-4">Oops! 您尚未選購商品</h3>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePurchaseItemStore } from '@/store/usePurchaseItemStore'

const store = usePurchaseItemStore()
const { cartProducts } = storeToRefs(store)
</script>

<style scoped lang="scss">
span{
  display: block;
}
.trash, .price{
  height: 100%;
}
.trash{
  width: 50%;
  cursor: pointer;
}
.num_minus, .num_plus{
  width: 50px;
  cursor: pointer;
}
.num_input{
  width: 50px;
}
.cart_img_frame{
  margin: 0;
  width: 100%;
  height: 100px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.cart_no_img_frame{
  width: 100%;
  img{
    display: block;
    width: 60%;
    margin: 0 auto
  }
}
</style>
