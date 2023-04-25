import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePurchaseItemStore = defineStore('purchaseItem', () => {
  const cartProducts = reactive([])

  // 加入購物車
  const addCartStore = (item, count, subtotal) => {
    console.log(count, subtotal)
    const product = JSON.parse(JSON.stringify(item))
    // 增加產品數量、小計的屬性
    product.count = count
    product.subtotal = subtotal

    // 有無重覆購買的行為：isPurchased === -1才是新增的商品，才可以加入購物車
    const isPurchased = cartProducts.findIndex(value => value.newId === product.newId)
    if (isPurchased === -1) {
      cartProducts.push(product)
    }
  }

  // 增加數量
  const plusProduct = (newId) => {
    const i = cartProducts.findIndex(value => value.newId === newId)
    cartProducts[i].count++
    cartProducts[i].subtotal = cartProducts[i].price * cartProducts[i].count
  }

  // 減少數量
  const minusProduct = (newId) => {
    const i = cartProducts.findIndex(value => value.newId === newId)
    if (cartProducts[i].count >= 2) {
      cartProducts[i].count--
      cartProducts[i].subtotal = cartProducts[i].price * cartProducts[i].count
    }
  }

  // 刪除單一商品
  const delProduct = (newId) => {
    const i = cartProducts.findIndex(value => value.newId === newId)
    cartProducts.splice(i, 1)
  }

  // 全部數量（提醒用途）
  const allCount = computed(() => {
    const result = cartProducts.reduce((acc, curr) => acc + Number(curr.count), 0)
    return result
  })

  const total = computed(() => {
    const result = cartProducts.reduce((acc, curr) => acc + Number(curr.subtotal), 0)
    return result
  })

  return { cartProducts, allCount, total, addCartStore, plusProduct, minusProduct, delProduct }
})
