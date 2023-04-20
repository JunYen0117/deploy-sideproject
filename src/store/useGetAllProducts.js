import { defineStore } from 'pinia'
import { dataBase } from '@/composables/db.js'
import { collection, onSnapshot } from 'firebase/firestore'
import { reactive } from 'vue'

export const useGetAllProducts = defineStore('allProducts', () => {
  const { db } = dataBase()
  const allProducts = reactive([]);

  // IIFE 立即執行：從firebase取得資料
  (async function () {
    await onSnapshot(
      collection(db, 'products'),
      (res) => {
        allProducts.length = 0
        res.forEach(v => {
          allProducts.push(v.data())
        })
      }
    )
  })()

  return { allProducts }
})
