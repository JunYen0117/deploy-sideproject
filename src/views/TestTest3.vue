<script setup>
// firebase storage 上傳圖片
import { ref, onMounted, computed } from 'vue'
import { dataBase } from '@/composables/db.js'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const { storage } = dataBase()

// doc == <input>欄位
let doc = ''
const imgSrc = ref('')
// firebase資料夾路徑
const storageFolder = ref('products_img/test/')
// 要上傳的檔案名稱
const imgName = ref('')
// sotrage路徑 = 資料夾路徑 + 檔案名稱
const storagePath = computed(() => {
  return storageFolder.value + imgName.value
})

function upload () {
  imgName.value = doc.files[0].name
  const storageRef = firebaseRef(storage, storagePath.value)

  uploadBytes(storageRef, doc.files[0])
    .then(() => {
      console.log('上傳檔案成功')
    })
    .catch((error) => {
      console.log('上傳檔案失敗了：')
      console.log(error)
    })
    .then(() => {
      getURL(storageRef)
    })
}

function getURL (ref) {
  const storageRef = ref
  getDownloadURL(storageRef)
    .then((url) => {
      imgSrc.value = url
      console.log('取得圖片路徑成功')
    })
    .catch(() => {
      console.log('取得圖片路徑失敗')
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
    <img :src="imgSrc" alt="">
  </div>
</template>
