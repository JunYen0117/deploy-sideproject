<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGetAllProducts } from '@/store/useGetAllProducts.js'
import { useGetOneProduct } from '@/store/useGetOneProduct'
import EditProduct from '@/components/EditProduct.vue'

const getProductStore = useGetAllProducts()
const { allProducts } = storeToRefs(getProductStore)

const getOneProduct = useGetOneProduct()
const { oneProduct } = storeToRefs(getOneProduct)

const editProduct = ref(null)

const sendProduct = (item) => {
  oneProduct.value = item
  console.log(item)
}

onMounted(() => {
  // console.log(editProduct)
})

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
      <table>
        <tr>
          <th>名稱</th>
          <th>單價</th>
          <th>種類</th>
          <th>編輯</th>
          <th>刪除</th>
        </tr>
        <tr v-for="(value, index) in allProducts"
          :key="index">
          <td>{{ value.name }}</td>
          <td>{{ value.price }}</td>
          <td>{{ value.category }}</td>
          <td><button class="btn btn-dark" @click="editProduct.showModal(); sendProduct(value)">修改</button></td>
        </tr>
      </table>
    </div>
  </div>
  <EditProduct ref="editProduct" />
</template>
