<script setup>
import { dataBase } from '@/composables/db.js'
import { collection, onSnapshot } from 'firebase/firestore'
import { reactive, onMounted } from 'vue'

const { db } = dataBase()

const allProducts = reactive([])

async function getProducts () {
  await onSnapshot(
    collection(db, 'products'),
    (res) => {
      allProducts.length = 0
      res.forEach(v => {
        allProducts.push(v.data())
      })
      // console.log(allProducts)
    })
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <div>
  </div>
</template>
