<script setup>
import { onMounted, inject, reactive, ref, watch } from 'vue'
import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'

const axios = inject('axios')

let data = reactive([])
const selectedCounty = ref('F-D0047-005')
const county = reactive([{
  name: '台北市',
  code: 'F-D0047-061'
}, {
  name: '新北市',
  code: 'F-D0047-069'
}, {
  name: '桃園市',
  code: 'F-D0047-005'
}])
const allDistricts = reactive({
  台北市:
  ['松山區', '信義區', '大安區', '中山區', '中正區', '大同區', '萬華區', '文山區', '南港區', '內湖區', '士林區', '北投區'],
  新北市:
  ['板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '樹林區', '鶯歌區', '三峽區', '淡水區', '汐止區', '瑞芳區', '土城區', '蘆洲區', '五股區', '泰山區', '林口區', '深坑區', '石碇區', '坪林區', '三芝區', '石門區', '八里區', '平溪區', '雙溪區', '貢寮區', '金山區', '萬里區', '烏來區'],
  桃園市:
  ['桃園區', '中壢區', '大溪區', '楊梅區', '蘆竹區', '大園區', '龜山區', '八德區', '龍潭區', '平鎮區', '新屋區', '觀音區', '復興區']
})
const districts = reactive(['桃園區', '中壢區', '大溪區', '楊梅區', '蘆竹區', '大園區', '龜山區', '八德區', '龍潭區', '平鎮區', '新屋區', '觀音區', '復興區'])
const selectedDistrict = ref('觀音區')
const newWeather = reactive([])
const newPop6h = reactive([])

watch(
  () => selectedCounty.value,
  (code) => {
    // 變成空陣列
    districts.length = 0
    const index = county.findIndex(v => v.code === code)
    // county[index].name -> 台北市、新北市、桃園市
    allDistricts[county[index].name].forEach(v => districts.push(v))
  }
)
watch(
  () => selectedDistrict.value,
  () => {
    getData()
  }
)

const getData = () => {
  axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/${selectedCounty.value}?Authorization=CWB-9509B8D9-DFD6-4AA0-B576-3617F0F4A4F5`)
    .then((res) => {
      data = res.data.records.locations[0].location
      // selected 是用 selectedDistrict 變數，去找是哪個鄉鎮？
      const selected = data.find(v => v.locationName === selectedDistrict.value).weatherElement

      // 用selected陣列，再篩選出3個陣列
      const weather = selected.find(v => v.description === '天氣現象').time
      const temperature = selected.find(v => v.description === '溫度').time
      const pop6h = selected.find(v => v.description === '6小時降雨機率').time

      // 3個陣列，最後得到2個新陣列：newWeather, newPop6h
      newWeather.length = 0
      weather.forEach(v => {
        newWeather.push({
          時間: v.startTime.slice(8, 13).replace(' ', '日 ').replace('-', '/') + '點',
          天氣: v.elementValue[0].value
        })
      })
      temperature.forEach((v, i) => {
        newWeather[i]['溫度'] = v.elementValue[0].value + '°C'
      })
      console.log(newWeather)

      newPop6h.length = 0
      pop6h.forEach(v => {
        newPop6h.push({
          時間: v.startTime.slice(8, 13).replace(' ', '日 ').replace('-', '/') + '點',
          機率: v.elementValue[0].value
        })
      })
      console.log(newPop6h)
    })
}
onMounted(() => {
  getData()
})
</script>

<template>
<div class="container-fluid row">
  <div class="col-md-3">
    <NavBar></NavBar>
  </div>
  <div class="col-12 col-md-9 weather_prediction">
    <section class="choose_area container d-flex mt-5">
      <select v-model="selectedCounty" class="form-select mx-2">
        <option value="" disabled>請選擇縣市</option>
        <option v-for="(v, i) in county" :key="`選擇縣市${i}`"
                :value="v.code">{{ v.name }}</option>
      </select>
      <select v-model="selectedDistrict" class="form-select mx-2">
        <option value="" disabled>請選擇區域</option>
        <option v-for="(v, i) in districts" :key="`選擇區域${i}`"
                :value="v">{{ v }}</option>
      </select>
    </section>
    <section class="container my-5">
      <h2 class="title text-secondary">溫度</h2>
      <div class="container">
        <ul class="d-flex weather_list p-0">
          <li v-for="(v, i) in newWeather" :key="`天氣array${i}`" class="weather_item p-2">
            <div class="h3 text-center text-dark">{{ v['溫度'] }}</div>
            <div class="text-center">{{ v['天氣'] }}</div>
            <div class="text-center">{{ v['時間'] }}</div>
          </li>
        </ul>
      </div>
    </section>
    <section class="container">
      <h2 class="title text-secondary">降雨機率</h2>
      <div class="container">
        <ul class="d-flex pop6h_list p-0">
          <li v-for="(v, i) in newPop6h" :key="`降雨機率array${i}`" class="pop6h_item p-2">
            <circle-progress
              class="h4"
              :size="100"
              :border-width="5"
              :border-bg-width="5"
              :is-gradient="true"
              :gradient="{
                angle: 90,
                startColor: 'skyblue',
                stopColor: 'blue'
              }"
              :percent="Number(v['機率'])"
              :show-percent="true"
            />
            <div class="text-center">{{ v['時間'] }}</div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</div>
</template>

<style scoped lang="scss">
li {
  list-style-type: none;
}
h2 {
  font-weight: bold;
}
.weather_list {
  overflow: auto;
  box-shadow: 0 2px 10px lightgray;
  .weather_item {
    flex-shrink: 0;
  }
}
.pop6h_list {
  overflow: auto;
  box-shadow: 0 2px 10px lightgray;
  .pop6h_item {
    flex-shrink: 0;
  }
}
.rain_circle_progress {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}
</style>
