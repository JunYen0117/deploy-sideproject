<script setup>
// firebase storage 上傳圖片
import { ref, onMounted, computed } from 'vue'
import { dataBase } from '@/composables/db.js'
import { ref as firebaseRef, uploadBytes } from 'firebase/storage'

const { storage } = dataBase()

// doc == <input>欄位
let doc = ''
// firebase資料夾路徑
const storageFolder = ref('products_img/001/')
// 要上傳的檔案名稱
const docName = ref('')
// 資料夾路徑 + 檔案名稱
const storagePath = computed(() => {
  return storageFolder.value + docName.value
})

function checkFile () {
  docName.value = doc.files[0].name
  console.log(storagePath.value)
}

function upload () {
  const storageRef = firebaseRef(storage, storagePath.value)

  uploadBytes(storageRef, doc.files[0])
    .then((snapshot) => {
      console.log('Uploaded a blob or file!')
    })
    .catch((error) => {
      console.log('上傳失敗了：')
      console.log(error)
    })
}

onMounted(() => {
  doc = document.querySelector('.file')
})
</script>

<template>
  <div>
    <label for="formFileMultiple" class="form-label">Multiple files input example</label>
    <input class="form-control file" type="file" id="formFile">
    <button @click="checkFile">check</button>
    <button @click="upload">upload</button>
  </div>
</template>
