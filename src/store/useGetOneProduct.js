import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGetOneProduct = defineStore('oneProduct', () => {
  const oneProduct = ref({})

  return { oneProduct }
})
