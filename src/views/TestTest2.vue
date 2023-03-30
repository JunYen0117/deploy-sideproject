<script setup>
// CRUD R
import { dataBase } from '@/composables/db.js'
import { collection, getDocs } from 'firebase/firestore'

const { db } = dataBase()

const ref = collection(db, 'products')
console.log(ref)
async function getData () {
  const docSnap = await getDocs(ref)
  console.log(docSnap)
  docSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, '=>', doc.data())
  })
}

</script>

<template>
  <form>
    <!-- <label class="form-label">id</label>
    <input v-model="data.id" type="text" class="form-control">
    <label class="form-label">名稱</label>
    <input v-model="data.name" type="text" class="form-control">
    <label class="form-label">價格</label>
    <input v-model="data.price" type="text" class="form-control">
    <label class="form-label">種類</label>
    <input v-model="data.category" type="text" class="form-control">
    <label class="form-label">詳情</label>
    <input v-model="data.description" type="text" class="form-control">
    <label class="form-label">上傳圖片</label> -->

    <!-- 上傳圖片要改，怎麼上傳陣列呢？ -->
    <!-- <input v-model="data.imgUrl" type="text" class="form-control"> -->
  </form>
  <div>
    <button @click="getData">getdata</button>
  </div>
</template>
