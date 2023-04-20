<script setup>

import { dataBase } from '@/composables/db.js'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { ref, reactive, computed, onMounted } from 'vue'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const { db, storage } = dataBase()

// 變數常數：處理圖片--------------------------------------------
// <input>欄位
let inputFile = ''
// const imgSrc = ref('')
// 要上傳的檔案名稱
const imgName = ref('')
// sotrage路徑 = 指定資料夾路徑 + id + 檔案名稱
const storagePath = computed(() => {
  return `products_img/${newId.value}/${imgName.value}`
})
// --------------------------------------------------------

// 變數常數、處理資料----------------------------------------------
const latestId = ref('')
const newId = ref('001')
const name = ref('')
const price = ref('')
const category = ref('')
const description = ref('')
const imgUrl = ref('')
const data = reactive({
  newId,
  name,
  price,
  category,
  description,
  imgUrl
})
// ---------------------------------------------------

// 函式-----------------------------------------------
async function getLatestId () {
  const allId = []
  try {
    const allData = await getDocs(collection(db, 'products'))
    allData.forEach((doc) => {
      console.log(doc.data())
      allId.push(doc.id)
    })
  } catch (error) {
    console.log('取不到id')
  } finally {
    // 如果allId等於0，代表資料庫裡都沒資料
    // 下方if程式碼全都不執行
    // newId就是初始預設值 '001'
    if (allId.length !== 0) {
      latestId.value = allId.reduce((max, curr) => {
        return curr > max ? curr : max
      }, 0)

      // 把 latestId + 1
      newId.value = (parseInt(latestId.value) + 1).toString().padStart(latestId.value.length, '0')
    }
  }
}

// 執行upload() -> getURL() -> writeData()
function upload () {
  imgName.value = inputFile.files[0].name
  const storageRef = firebaseRef(storage, storagePath.value)

  uploadBytes(storageRef, inputFile.files[0])
    .then(() => {
      console.log('上傳圖片成功')
    })
    .catch(() => {
      console.log('上傳圖片失敗了：')
    })
    .then(() => {
      getURL(storageRef)
    })
}

function getURL (ref) {
  const storageRef = ref
  getDownloadURL(storageRef)
    .then((url) => {
      imgUrl.value = url
      console.log('取得圖片路徑成功')
    })
    .catch(() => {
      console.log('取得圖片路徑失敗')
    })
    .then(() => {
      writeData()
    })
}

async function writeData () {
  try {
    await setDoc(doc(db, 'products', newId.value), data)
    console.log('上傳資料成功')

    // 上傳成功就清空<input>欄位
    clearInputValue()

    // 取得新Id
    getLatestId()
  } catch (e) {
    console.log('上傳資料失敗')
    imgUrl.value = ''
  }
}

function clearInputValue () {
  name.value = ''
  price.value = ''
  category.value = ''
  description.value = ''
  imgUrl.value = '' // getURL()取得的圖片路徑
  inputFile.value = ''
}
// ---------------------------------------

onMounted(() => {
  inputFile = document.querySelector('.file')
  // textArea = document.querySelector('.text_area')
  getLatestId()
})
//
</script>

<template>
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9">
      <form>
        <label class="form-label">id</label>
        <input :value="data.newId" type="text" class="form-control" disabled>
        <label class="form-label">名稱</label>
        <input v-model="data.name" type="text" class="form-control">
        <label class="form-label">價格</label>
        <input v-model="data.price" type="text" class="form-control">
        <label class="form-label">種類</label>
        <input v-model="data.category" type="text" class="form-control">
        <label class="form-label">詳情</label>
        <textarea v-model="data.description" class="form-control text_area" style="height: 100px"></textarea>
        <label class="form-label">上傳圖片</label>
        <input type="file" class="form-control file">
      </form>
      <div>
        <button @click="upload" class="btn btn-dark d-block mt-3 fw-bold">上傳</button>
      </div>
    </div>
  </div>
</template>
