<template>
  <div>
    <nav class="navigate">
      <!-- 搜尋功能 -->
      <div class="search_area me-2 bg-primary">
        <span class="search_btn px-2"
          style="color: white; font-size: 2rem;"
          data-bs-toggle="modal" data-bs-target="#shopping_mall_modal">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </span>
        <div class="search_area_sm">
          <input ref="searchText" type="search" class="search_bar mt-2" placeholder="搜尋商品" value="">
        </div>
        <div @click="searchProducts(child_allProducts)" class="search_btn px-2" style="color:#16136f; font-size: 2rem;">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
      </div>
    </nav>
  </div>

  <!-- bootstrap modal 排序功能和篩選功能 -->
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
          <select v-for="(item, index) in selectTagArr" :key="`selectCategory${item}`"
            v-model="selectTagArr[index]"
            class="form-select form-select-sm mb-1"
            placeholder="a">
            <option value="none">選擇種類</option>
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
            @click="filterProducts(child_allProducts)">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    child_allProducts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['search', 'filter'],
  data () {
    return {
      modal: '',
      priceSort: '',
      // ['餐具', '抱枕', '夜燈', '擺飾', '衛浴用品', '便利小物', '沐浴用品', '精油與配件', '香水', '個人配件', '首飾', '髮飾', '3C產品', '家用電器', '書寫工具', '辦公用具', '玩偶', '玩具', '療癒小物', '日常包款', '錢包', '收納包', '旅行']
      products_category: ['餐具', '抱枕', '夜燈'],
      selectTagArr: ['none']
    }
  },
  methods: {
    searchProducts (products) {
      const inputVal = this.$refs.searchText.value
      const result = products.filter(v => v.name.match(inputVal))
      // 送emit資料給商品列表頁面的getData()函式
      // result是資料內容、true是getData()第二個參數，會清空畫面
      this.$emit('search', result, true)
    },
    addSelect () {
      // 增加selectTagArr陣列長度，越長，畫面上<select>標籤越多
      this.selectTagArr.push('none')
    },
    filterProducts (products) {
      // result是排序功能用途
      const result = JSON.parse(JSON.stringify(products))
      // categoryArr、newArr是篩選功能用途
      // 將<select>HTML標籤所得的selectTagArr陣列
      // 刪除'none'、刪除重覆的值，就會得到categoryArr
      const deleteNone = this.selectTagArr.filter(v => v !== 'none')
      const categoryArr = [...new Set(deleteNone)]
      const newArr = []

      // 排序功能
      if (this.priceSort !== '') {
        this.sequenceProducts(result)
        // 送emit資料給商品列表頁面的getData()函式
        // result是排序資料內容、true會賦予getData()第二個參數，會清空畫面
        this.$emit('filter', result, true)
      }

      // 篩選功能
      if (categoryArr.length !== 0) {
        this.selectProducts(result, categoryArr, newArr)
        // 送emit資料給商品列表頁面的getData()函式
        // newArr是由result陣列跑迴圈後，篩選而得出來，請參照selectProducts()函式
        this.$emit('filter', newArr, true)
      }
    },
    sequenceProducts (result) {
      // if判斷排列方式，價格由低到高？還是價格由高到低？
      if (this.priceSort === 'lowToHigh') {
        result.sort((a, b) => {
          return a.price - b.price
        })
      } else if (this.priceSort === 'highToLow') {
        result.sort((a, b) => {
          return b.price - a.price
        })
      }
    },
    selectProducts (result, categoryArr, newArr) {
      for (let i = 0; i <= result.length - 1; i++) {
        for (let j = 0; j <= categoryArr.length - 1; j++) {
          if (result[i].category === categoryArr[j]) {
            newArr.push(result[i])
          }
        }
      }
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
