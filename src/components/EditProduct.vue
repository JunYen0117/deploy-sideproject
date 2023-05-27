<script setup>
import { dataBase } from '@/composables/db.js'
import { doc, updateDoc } from 'firebase/firestore'
import { onMounted, defineExpose } from 'vue'
import { storeToRefs } from 'pinia'
import { useGetOneProduct } from '@/store/useGetOneProduct'
import Modal from 'bootstrap/js/dist/modal.js'

const { db } = dataBase()

const getOneProduct = useGetOneProduct()
const { oneProduct } = storeToRefs(getOneProduct)
let modal = ''

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
    description: document.querySelector('.inputDescription').value
  }
  await updateDoc(doc(db, 'products', data.newId), data)
  await modal.hide()
}

onMounted(() => {
  modal = new Modal(document.querySelector('#exampleModal'))
})

function a () {
}
a()
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
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"
            @click="saveEdit">儲存更改</button>
        </div>
      </div>
    </div>
  </div>
</template>
