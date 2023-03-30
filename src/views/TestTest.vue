<script setup>
// CRUD C
import { dataBase } from '@/composables/db.js'
import { collection, addDoc } from 'firebase/firestore'
import { ref, reactive } from 'vue'

const { db } = dataBase()

const id = ref('')
const name = ref('')
const price = ref('')
const category = ref('')
const description = ref('')
const imgUrl = ref([])

const data = reactive({
  id,
  name,
  price,
  category,
  description,
  imgUrl
})

const writeData = async () => {
  try {
    const docRef = await addDoc(collection(db, 'products'), data)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

</script>

<template>
  <form>
    <label class="form-label">id</label>
    <input v-model="data.id" type="text" class="form-control">
    <label class="form-label">名稱</label>
    <input v-model="data.name" type="text" class="form-control">
    <label class="form-label">價格</label>
    <input v-model="data.price" type="text" class="form-control">
    <label class="form-label">種類</label>
    <input v-model="data.category" type="text" class="form-control">
    <label class="form-label">詳情</label>
    <input v-model="data.description" type="text" class="form-control">
    <label class="form-label">上傳圖片</label>

    <!-- 上傳圖片要改，怎麼上傳陣列呢？ -->
    <input v-model="data.imgUrl" type="text" class="form-control">
  </form>
  <div>
    <button @click="writeData">writeData</button>
  </div>
</template>
