<script setup>
import { ref } from 'vue'
// pinia
import { storeToRefs } from 'pinia'
import { useGetAllProducts } from '@/store/useGetAllProducts.js'
import { useGetOneProduct } from '@/store/useGetOneProduct'
// firebase
import { dataBase } from '@/composables/db.js'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref as firebaseRef, deleteObject } from 'firebase/storage'
// myComponent
import EditProduct from '@/components/EditProduct.vue'

const { db, storage } = dataBase()

const getProductStore = useGetAllProducts()
const { allProducts } = storeToRefs(getProductStore)

const getOneProduct = useGetOneProduct()
const { oneProduct } = storeToRefs(getOneProduct)

const editProduct = ref(null)

const sendProduct = (item) => {
  oneProduct.value = item
  console.log(item)
}

const deleteProduct = (item) => {
  console.log(item.newId)
  deleteDoc(doc(db, 'products', item.newId))
    .then(() => {
      console.log('刪除資料庫文件成功')
    })

  const deleteFileDir = firebaseRef(storage, `products_img/${item.newId}/`)
  deleteObject(deleteFileDir)
    .then(() => {
      console.log('刪除檔案資料夾成功')
    })
}
function a () {
}
a()
</script>

<template>
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9">
      <table class="dashboard_productList_tableA">
        <tr class="dashboard_productList_title row">
          <th class="col-5">名稱</th>
          <th class="col-2">單價</th>
          <th class="col-2">種類</th>
          <th class="col-1">編輯</th>
          <th class="col-1">刪除</th>
        </tr>
      </table>
      <table class="dashboard_productList_tableB">
        <tr class="dashboard_productList_product row"
          v-for="(value, index) in allProducts"
          :key="index">
          <td class="col-5">{{ value.name }}</td>
          <td class="col-2 td_product_price">{{ value.price }}</td>
          <td class="col-2 td_product_category">{{ value.category }}</td>
          <td class="col-1 td_product_btn"><button class="btn btn-dark" @click="editProduct.showModal(); sendProduct(value)">修改</button></td>
          <td class="col-1 td_product_btn"><button class="btn btn-danger" @click="deleteProduct(value)">刪除</button></td>
        </tr>
      </table>
    </div>
  </div>
  <EditProduct ref="editProduct" />
</template>

<style lang="scss">
.dashboard_productList_tableA {
  width: 100%;
  min-width: 300px;
  position: sticky;
  top: 0px;
  .dashboard_productList_title {
    color: white;
    background-color: #1c595a;
    width: 100%;
    flex-wrap: nowrap;
    th {
      outline: 1px solid white;
      text-align: center;
    }
  }
}
.dashboard_productList_tableB {
  width: 100%;
  min-width: 300px;
  font-size: 16px;

  .dashboard_productList_product {
    min-width: 300px;
    .td_product_price,
    .td_product_category,
    .td_product_btn {
      text-align: center;
    }
    button {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 1000px) {
    button {
      padding: 5px;
    }
  }
  @media screen and (max-width: 500px) {
    button {
      padding: 1px;
    }
  }
}
</style>
