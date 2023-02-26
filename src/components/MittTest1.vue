<template>
  <div class="mitt1">
    MittTest1
    <input type="text" v-model="info">
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'

export default {
  data () {
    return {
      info: '原本在mitt1的內容'
    }
  },
  watch: {
    info () {
      emitter.emit('mitt1to2', this.info)
    }
  },
  created () {
    emitter.emit('mitt1to2', this.info)
    emitter.on('mitt2to1', (data) => {
      this.info = data
    })
  }
}
</script>

<style lang="scss">
  .mitt1{
    width: 200px;
    height: 200px;
    border: 1px dotted black;
  }
</style>
