<template>
  <div>
    <nav class="navigate">
      <div class="search_area me-2 bg-primary">
        <span class="search_btn px-2"
          style="color: white; font-size: 2rem;"
          data-bs-toggle="modal" data-bs-target="#shopping_mall_modal">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </span>
        <div class="search_area_sm">
          <input ref="searchText" type="search" class="search_bar mt-2" placeholder="搜尋商品" value="">
        </div>
        <div @click="search" class="search_btn px-2" style="color:#16136f; font-size: 2rem;">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
      </div>
    </nav>
  </div>

  <div class="modal fade"
    id="shopping_mall_modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="shopping_mall_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="exampleModalLabel">排序</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="" class="row">
            <div class="col-6">
              <input type="radio" name="price_sort" id="price_lowToHigh" v-model="priceSort" value="lowToHigh">
              <label for="price_lowToHigh">價格由低到高</label>
            </div>
            <div class="col-6">
              <input type="radio" name="price_sort" id="price_highToLow" v-model="priceSort" value="highToLow">
              <label for="price_highToLow">價格由高到低</label>
            </div>
          </form>
        </div>
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="exampleModalLabel">篩選</h2>
        </div>
        <div class="modal-body">
          <select v-for="selectIndex in addSelectIndexArr" :key="`selectCategory${selectIndex}`"
            v-model="categorys[`selectCategory${selectIndex}`]"
            :name="`selectCategory${selectIndex}`"
            class="form-select form-select-sm mb-1"
            placeholder="a">
            <option value="none" selected>選擇種類</option>
            <option v-for="item in products_category" :key="item" :value="item">{{ item }}</option>
          </select>
          <div @click="addSelect">
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
            新增選項</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >關閉</button>
          <button type="button" class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="saveFilter">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import emitter from '@/methods/emitter.js'

export default {
  data () {
    return {
      modal: '',
      products_category: ['餐具', '抱枕', '夜燈', '擺飾', '衛浴用品', '便利小物', '沐浴用品', '精油與配件', '香水', '個人配件', '首飾', '髮飾', '3C產品', '家用電器', '書寫工具', '辦公用具', '玩偶', '玩具', '療癒小物', '日常包款', '錢包', '收納包', '旅行'],
      priceSort: '',
      addSelectIndexArr: [0],
      categorys: {
        selectCategory0: 'none'
      },
      selectCategoryArr: []
    }
  },
  methods: {
    search () {
      // 把搜尋的內容，發送給AllProducts.vue
      emitter.emit('search', this.$refs.searchText.value)
    },
    addSelect () {
      // 增加addSelectIndexArr陣列長度，越長，畫面上<select>標籤越多
      this.addSelectIndexArr.push(this.addSelectIndexArr.length)
    },
    saveFilter () {
      // 選好的<option>標籤資料，原本寫在categorys物件上，把物件轉換成陣列、刪除重複的值
      this.selectCategoryArr = [...new Set(Object.values(this.categorys))]
      emitter.emit('modal_filter', { sequence: this.priceSort, filter: this.selectCategoryArr })
    }
  },
  mounted () {
    this.modal = new Modal('#shopping_mall_modal')
  }
}
</script>

<style scoped lang="scss">
  .navigate{
    position: fixed;
    width: 74vw;
  }
  @media screen and (max-width: 768px) {
    .navigate{
      width: 100vw;
    }
  }
  .search_area{
    position: absolute;
    top: 5px;
    right: 0px;
    display: flex;
    width: 320px;
    background: #eee;
    border-radius: 10px;
  }
  .search_bar{
    width: 220px;
  }
  .search_btn{
    cursor: pointer;
  }
</style>
