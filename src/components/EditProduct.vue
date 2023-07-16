<script setup>
import { dataBase } from '@/composables/db.js'
import { doc, updateDoc } from 'firebase/firestore'
import { ref as firebaseRef, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage'
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGetOneProduct } from '@/store/useGetOneProduct'
import Modal from 'bootstrap/js/dist/modal.js'

const { db, storage } = dataBase()

const getOneProduct = useGetOneProduct()
const { oneProduct } = storeToRefs(getOneProduct)
let modal = ''
let inputFile = ''

const showModal = () => {
  modal.show()
}
const hideModal = () => {
  modal.hide()
}
defineExpose({
  showModal,
  hideModal
})

const saveEdit = async () => {
  const data = {
    newId: oneProduct.value.newId,
    name: document.querySelector('.inputName').value,
    price: document.querySelector('.inputPrice').value,
    category: document.querySelector('.inputCategory').value,
    description: document.querySelector('.inputDescription').value,
    imgUrl: oneProduct.value.imgUrl
  }

  if (!inputFile.files[0]) {
    console.log('沒有新圖片')
    updateDoc(doc(db, 'products', data.newId), data)
  } else {
    console.log('i have new img')

    // 列出原圖片路徑
    const oldPicName = ref('')
    const dirPath = computed(() => {
      return `products_img/${data.newId}`
    })
    const listRef = firebaseRef(storage, `${dirPath.value}`)
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          oldPicName.value = item.name
        })
      })
      .then(() => {
        deleteOldPic()
      })

    // 刪除原圖片
    function deleteOldPic () {
      const deletePic = firebaseRef(storage, `${dirPath.value}/${oldPicName.value}`)
      deleteObject(deletePic)
        .then(() => {
          console.log('刪除原圖片 成功')
        })
        .then(() => {
          uploadNewPic()
        })
    }

    // 上傳新圖片
    function uploadNewPic () {
      const imgName = inputFile.files[0].name
      const storagePath = computed(() => {
        return `products_img/${data.newId}/${imgName}`
      })
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

    // 新的圖片路徑
    function getURL (ref) {
      const storageRef = ref
      getDownloadURL(storageRef)
        .then((url) => {
          data.imgUrl = url
          console.log(data)
          console.log('取得圖片路徑成功')
        })
        .catch(() => {
          console.log('取得圖片路徑失敗')
        })
        .then(() => {
          writeData()
        })
    }

    function writeData () {
      updateDoc(doc(db, 'products', data.newId), data)
    }
  }
  await modal.hide()
}

onMounted(() => {
  modal = new Modal(document.querySelector('#exampleModal'))
  inputFile = document.querySelector('.file')
});

</script>

<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <label class="form-label">id</label>
            <input :value="oneProduct.newId" type="text" class="form-control" disabled>
            <label class="form-label">名稱</label>
            <input ref="itemName" :value="oneProduct.name" type="text" class="form-control inputName">
            <label class="form-label">價格</label>
            <input ref="itemPrice" :value="oneProduct.price" type="text" class="form-control inputPrice">
            <label class="form-label">種類</label>
            <input ref="itemCategory" :value="oneProduct.category" type="text" class="form-control inputCategory">
            <label class="form-label">詳情</label>
            <textarea ref="itemDescription" :value="oneProduct.description" class="form-control text_area inputDescription" style="height: 100px"></textarea>
            <label class="form-label">上傳圖片</label>
            <input type="file" class="form-control file">
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark d-block mt-3 fw-bold"
            @click="saveEdit">儲存更改</button>
        </div>
      </div>
    </div>
  </div>
</template>
