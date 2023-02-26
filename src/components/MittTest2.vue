<template>
  <div class="mitt2">
    MittTest2
    <input type="text" v-model="info">
  </div>
  <MittTest1></MittTest1>
</template>

<script>
import emitter from '@/methods/emitter.js'
import MittTest1 from '@/components/MittTest1.vue'

export default {
  components: { MittTest1 },
  data () {
    return {
      info: ''
    }
  },
  watch: {
    info () {
      emitter.emit('mitt2to1', this.info)
    }
  },
  created () {
    emitter.on('mitt1to2', (data) => {
      this.info = data
    })
  }
}
</script>

<style lang="scss">
  .mitt2{
    width: 200px;
    height: 200px;
    border: 1px dotted black;
  }
</style>
