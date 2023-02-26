<template>
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9">
    <table v-if="countCart.myCarts.length !== 0" class="w-100 mt-5 table table-striped">
      <tbody>
        <tr v-for=" item in countCart.myCarts" :key="item.product_name" class="row justify-content-between mb-2">
          <td class="col-2">
            <span @click="delItem(item.id)"
            style="color: #ccc" class="trash fa-2x d-flex justify-content-center mx-auto">
              <font-awesome-icon class="align-self-center" icon="fa-solid fa-trash" />
            </span>
          </td>
          <td class="col-2">
            <figure class="cart_img_frame">
              <img :src="item.url[0]==='' ? `https://picsum.photos/200` : `${item.url[0]}`" alt="">
            </figure>
          </td>
          <td class="col-6 ps-2">
            <div class="h5 md-h3">{{ item.product_name }}</div>
            <div class="d-flex mt-md-3">
              <div @click="changeNum(item.id, 'minus')" class="num_minus bg-dark">
                <span class="text-center" style="color: white;">
                  <font-awesome-icon icon="fa-solid fa-minus" />
                </span>
              </div>
              <input :value="item.count" class="num_input text-center" type="text" min="1" readonly>
              <div @click="changeNum(item.id, 'plus')" class="num_plus bg-dark">
                <span class="text-center" style="color: white;">
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </span>
              </div>
            </div>
          </td>
          <td class="col-2">
            <h5 class="price d-flex justify-content-center">
              <span class="align-self-center">
                ${{ item.subtotal }}
              </span>
            </h5>
          </td>
        </tr>
      </tbody>
      <tfoot class="bg-light row">
        <td class="col-10">
          <h5 class="text-end">總額：</h5>
        </td>
        <td class="col-2">
          <h5 class="text-md-center">${{ total }}</h5>
        </td>
      </tfoot>
    </table>
    <!-- 沒物品時顯示 -->
      <div v-if="countCart.myCarts.length === 0" class="no_item">
        <figure class="cart_no_img_frame mt-5">
          <img src="@/assets/no_item_cart.png" alt="">
        </figure>
        <h3 class="text-center mt-4">Oops! 您尚未選購商品</h3>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'

export default {
  inject: ['count'],
  data () {
    return {
      countCart: {
        myCartsLength: 0,
        myCarts: []
      }
    }
  },
  methods: {
    changeNum (id, state) {
      if (state === 'minus') {
        this.countCart.myCarts.forEach(v => {
          if (v.id === id && v.count >= 2) {
            v.count--
            v.subtotal = v.price * v.count
          }
        })
      } else if (state === 'plus') {
        this.countCart.myCarts.forEach(v => {
          if (v.id === id) {
            v.count++
            v.subtotal = v.price * v.count
          }
        })
      }
    },
    delItem (id) {
      const itemIndex = this.countCart.myCarts.findIndex(v => v.id === id)
      this.countCart.myCarts.splice(itemIndex, 1)
      this.countCart.myCartsLength = this.countCart.myCarts.length
      emitter.emit('cartToInfo', this.countCart)
    }
  },
  computed: {
    total () {
      const result = this.countCart.myCarts.reduce((acc, curr) => acc + Number(curr.subtotal), 0)
      return result
    }
  },
  created () {
    this.countCart.myCarts = this.count.myCarts
    this.countCart.myCartsLength = this.count.myCartsLength
  }
}
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
