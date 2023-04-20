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
  <div>
    <button @click="getData">getdata</button>
  </div>
</template>
