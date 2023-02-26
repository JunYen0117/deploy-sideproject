<template>
  <div class="container-fluid row">
    <div class="col-md-3">
      <NavBar></NavBar>
    </div>
    <div class="col-12 col-md-9 music_view">
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
          <!--  -->
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
          <!-- <button @click="getDuration">hi</button> -->
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: 50 + 'px',
      current: {
        title: '',
        src: ''
      },
      index: 0,
      isPlaying: false,
      isTempPause: false,
      musicCurrentTime: '00:00',
      CurrentTimePercentage: 0 + '%',
      musicLength: '00:00',
      countTime: false,
      songs: [
        {
          title: 'The Gensokyo the Gods Loved',
          src: require('@/assets/The_Gensokyo_the_Gods_Loved.mp3')
        },
        {
          title: 'The Waters Cleansed',
          src: require('@/assets/The_Waters_Cleansed.mp3')
        },
        {
          title: 'Lullaby of Deserted Hell',
          src: require('@/assets/Lullaby_of_Deserted_Hell.mp3')
        }
      ],
      player: new Audio()
    }
  },
  methods: {
    //
    getDuration () {
      this.player.currentTime = 50
    },
    play () {
      this.isPlaying = true
      if (this.isTempPause === false) {
        this.player.src = this.current.src
      }
      this.isTempPause = false
      // 開始計時
      clearInterval(window.time)
      window.time = setInterval(() => {
        // console.log(this.player.currentTime)
        this.musicCurrentTime = Math.floor(this.player.currentTime)
        let min = Math.floor(this.player.currentTime / 60)
        let sec = Math.floor(this.player.currentTime % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.musicCurrentTime = min + ':' + sec
        this.CurrentTimePercentage = this.player.currentTime / this.player.duration * 100 + '%'
      }, 300)
      this.player.play() // 開始播放
      this.player.onended = () => {
        this.next()
      }
    },
    pause () {
      this.player.pause()
      this.isPlaying = false
      this.isTempPause = true
      clearInterval(window.time)
    },
    next () {
      this.isTempPause = false
      this.index++
      if (this.index > this.songs.length - 1) {
        this.index = 0
      }

      this.current = this.songs[this.index]
      this.play() // 呼叫自己寫的play函式
    },
    prev () {
      this.isTempPause = false
      this.index--
      if (this.index < 0) {
        this.index = this.songs.length - 1
      }

      this.current = this.songs[this.index]
      this.play()
    },
    clickList (song, index) {
      this.isTempPause = false
      this.current = song
      this.index = index
      this.play()
    }
  },
  watch: {
    current () {
      this.player.oncanplay = () => {
        this.musicLength = Math.floor(this.player.duration)
        let min = Math.floor(this.player.duration / 60)
        let sec = Math.floor(this.player.duration % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        this.musicLength = min + ':' + sec
        // min < 10 ? '0' + min : min
        // sec < 10 ? '0' + sec : sec
      }
    }
  },
  beforeRouteLeave () {
    this.player.load() // 離開路由，關閉音樂
    // clearInterval(window.time)
    // console.log('clear')
  },
  mounted () {
    if (this.current.title === '') {
      this.current = this.songs[this.index]
      this.player.src = this.current.src
    }
  }
}
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
