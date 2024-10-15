<template>
  <header class="music_header d-flex justify-content-center">
    <h1 class="text-center">播放清單</h1>
  </header>
  <main class="d-flex flex-column justify-content-between">
    <!-- 播放清單 -->
    <section class="playlist">
      <ul class="list-group">
        <template v-for=" (song, index) in songs" :key="song.src">
          <h5 @click="clickList(song, index)"
            :data-name="song.title"
            :data-num="index"
            :class="(song.src == current.src) ? 'py-2 list-group-item active' : 'py-2 list-group-item'">
          {{ song.title }}
          </h5>
        </template>
      </ul>
    </section>
    <!-- 音樂控制器 -->
    <section class="player pb-2">
      <h2 class="song_title d-flex justify-content-center text-white bg-primary py-3">{{ current.title }}</h2>
      <div class="progress" style="background: darkgray; height: 5px;">
        <div class="progress-bar bg-secondary"
          role="progressbar"
          style="height: 5px;"
          :style="{width: CurrentTimePercentage}"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"></div>
      </div>
      <div class="time my-2 text-center">
        <span class="h6">{{ musicCurrentTime }} / </span>
        <span class="h6">{{ musicLength }}</span>
      </div>
      <div class="control d-flex justify-content-center">
        <button class="prev" @click="prev">
          <span style="color: #1c595a">
            <font-awesome-icon icon="fa-solid fa-backward" size="2x"/>
          </span>
        </button>
        <button class="play p-3 bg-dark" v-if="!isPlaying" @click="play(current.title)">
          <span style="color: #eee">
            <font-awesome-icon icon="fa-solid fa-play" size="3x" />
          </span>
        </button>
        <button class="pause p-3 bg-dark" v-else @click="pause">
          <span style="color: #eee">
            <font-awesome-icon icon="fa-solid fa-pause" size="3x"/>
          </span>
        </button>
        <button class="next" @click="next">
          <span style="color: #1c595a">
            <font-awesome-icon icon="fa-solid fa-forward" size="2x"/>
          </span>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
/* eslint-disable */
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'

const player = new Audio()
const current = reactive({
  title: '',
  src: ''
})
const index = ref(0)
const isPlaying = ref(false)
let isTempPause = false
const musicCurrentTime = ref('00:00')
const CurrentTimePercentage = ref('0%')
const musicLength = ref('00:00')
const songs = reactive([
  {
    title: 'The Gensokyo the Gods Loved',
    src: '/The_Gensokyo_the_Gods_Loved.mp3'
  },
  {
    title: 'The Waters Cleansed',
    src: '/The_Waters_Cleansed.mp3'
  },
  {
    title: 'Lullaby of Deserted Hell',
    src: '/Lullaby_of_Deserted_Hell.mp3'
  }
])

const play = () => {
  isPlaying.value = true
  if (isTempPause === false) {
    player.src = current.src
  }
  isTempPause = false
  clearInterval(window.time)
  window.time = setInterval(() => {
    musicCurrentTime.value = Math.floor(player.currentTime)
    let min = Math.floor(player.currentTime / 60)
    let sec = Math.floor(player.currentTime % 60)
    if (min < 10) {
      min = '0' + min
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    musicCurrentTime.value = min + ':' + sec
    CurrentTimePercentage.value = player.currentTime / player.duration * 100 + '%'
  }, 300)
  player.play()
  player.onended = () => {
    next()
  }
}
const pause = () => {
  player.pause()
  isPlaying.value = false
  isTempPause = true
  clearInterval(window.time)
}
const next = () => {
  isTempPause = false
  index.value += 1
  if (index.value > songs.length -1) {
    index.value = 0
  }
  current.title = songs[index.value].title
  current.src = songs[index.value].src
  play() // 呼叫自己寫的play函式
}
const prev = () => {
  isTempPause = false
  index.value -= 1
  if (index.value < 0) {
    index.value = songs.length - 1
  }
  current.title = songs[index.value].title
  current.src = songs[index.value].src
  play() // 呼叫自己寫的play函式
}
const clickList = (song, i) => {
  isTempPause = false
  current.title = song.title
  current.src = song.src
  index.value = i
  play() // 呼叫自己寫的play函式
}
watch(
  current,
  () => {
    player.oncanplay = () => {
      musicLength.value = Math.floor(player.duration)
      let min = Math.floor(player.duration / 60)
      let sec = Math.floor(player.duration % 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      musicLength.value = min + ':' + sec
    }
  }
)
onMounted(() => {
  if (current.title === '') {
    current.title = songs[index.value].title
    current.src = songs[index.value].src
    player.src = current.src
  }
})
onBeforeUnmount(() => {
  player.pause() // 離開路由，關閉音樂
})
</script>

<style scoped lang="scss">
  header.music_header{
    height: 7vh;
  }
  .player{
    background: #eee;
  }
  .control>*{
    margin-left: 10px;
    margin-right: 10px;
    border: none;
  }
  .play, .pause{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .prev, .next{
    background: none;
  }
  .music_view{
    position: relative;
    height: 100vh;
  }
  main{
    height: 93vh
  }
</style>
