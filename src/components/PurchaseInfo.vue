<template>
  <div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'

export default {
  data () {
    return {
      myCarts: [],
      myCartsLength: 0
    }
  },
  watch: {
    myCarts: {
      handler () {
        emitter.emit('purchaseLength', this.myCartsLength)
        // 傳給父元件App.vue
        this.$emit('purchaseLength', this.myCartsLength)
        this.$emit('carts', this.myCarts)
      },
      deep: true
    }
  },
  mounted () {
    emitter.on('purchaseItem', (purchaseItem) => {
      // ShoppingMall.vue傳過來的purchaseItem參數有沒有已經存在於myCarts？
      const isPurchased = this.myCarts.findIndex(value => value.id === purchaseItem.id)
      // 如果沒有，就是新選擇的商品，加到購物車裡
      if (isPurchased === -1) {
        this.myCarts.push(purchaseItem)
        this.myCartsLength = this.myCarts.length
      }
    })
    emitter.on('cartToInfo', (data) => {
      this.myCarts = data.myCarts
      this.myCartsLength = data.myCartsLength
    })
  }
}
export function length () {
  const myCartsLength = this.myCartsLength
  return myCartsLength
}
</script>
