<template>
  <main class="resume">
    <header class="profile_header">
      <div class="left_profile">
        <div class="avatar d-flex" ref="avatar" @click="moveAvatar">
          <!-- 大頭貼*2 -->
          <figure class="real_avatar_frame move_default" ref="realAvatar">
            <img src="@/assets/real_avatar.jpg" alt="">
          </figure>
          <figure class="comic_avatar_frame move_default">
            <img src="@/assets/comic_avatar3.jpg" ref="comicAvatar">
          </figure>
        </div>
        <div class="basic_info">
          <address class="address">
            <span class="text-white">
              <font-awesome-icon icon="fa-solid fa-location-dot" />
            </span>
            桃園市
          </address>
          <div class="tel">
            <span class="text-white">
              <font-awesome-icon icon="fa-solid fa-mobile" />
            </span>
            0972029732
          </div>
          <div class="email">
            <span class="text-white">
              <font-awesome-icon icon="fa-solid fa-envelope" />
            </span>
            relife12345@gmail.com
          </div>
        </div>
        <div class="other_info mb-3">
          <a href="https://www.facebook.com/blackrelife" target="_blank">
            <span class="fa-xl">
              <font-awesome-icon icon="fa-brands fa-facebook" />
              <!-- <i class="fa-brands fa-facebook fa-xl"></i> -->
            </span>
          </a>
          <a href="https://github.com/JunYen0117" target="_blank">
            <span class="fa-xl">
              <font-awesome-icon icon="fa-brands fa-github" />
            </span>
          </a>
        </div>
      </div>
      <div class="right_profile">
        <div class="intro_background">
          <h3 class="">李俊彥 Li-Jun-yen</h3>
          <ul>
            <h4>近況經歷：</h4>
            <li>任職於</li>
            <li>前端設計（切版） | 壹一壹一科技股份有限公司</li>
            <li>熟練掌握能力</li>
            <li>SCSS全瀏覽器樣式統一：autoprefix</li>
            <li>RWD：畫面由大至小max-width、畫面由小至大min-width。2種模式的嚮應式</li>
          </ul>
          <ul>
            <h4>個性描述：</h4>
            <li>MBTI人格測驗屬於ISTJ人格</li>
            <li>個性屬於文靜、細心。對於有一定程序的工作流程，熟悉了以後，就不容易犯錯</li>
          </ul>
          <p>Hello，我是俊彥。目前正在尋找，前端工程師的工作機會</p>
        </div>
      </div>
    </header>
    <section class="main_skill">
      <h2 class="title text-secondary">技能</h2>
      <div class="card_area">
        <ul class="card">
          <h3>排版</h3>
          <li>HTML | CSS</li>
          <li>SCSS</li>
          <li>RWD</li>
          <li>Bootstrap | Tailwind</li>
        </ul>
        <ul class="card">
          <h3>語言、框架</h3>
          <li>Javascript</li>
          <li>Vue3</li>
        </ul>
        <ul class="card">
          <h3>其他</h3>
          <li>Git</li>
          <li>Firebase</li>
        </ul>
        <ul class="card">
          <h3>其他專業</h3>
          <li>TQC中打：55字/分鐘<br>（嘸蝦米）</li>
          <li>TQC英打：34字/分鐘</li>
          <li>英文 TOEIC-695</li>
        </ul>
      </div>
    </section>
    <section class="timeline">
      <h2 class="title text-secondary">經歷</h2>
      <div class="timeline_area">
        <div>
          <div class="circle"></div>
          <div class="time first_item">
            工作 2023－2024
          </div>
        </div>
        <article>
          <h3>前端設計（切版）<br>壹一壹一科技股份有限公司</h3>
        </article>
        <div>
          <div class="circle"></div>
          <div class="time first_item">
            學習 2022－2023
          </div>
        </div>
        <article>
          <h3>六角學院學員<br>2022中壢資策會就業班</h3>
        </article>
        <div>
          <div class="circle"></div>
          <div class="time">
            工作 2021－2021
          </div>
        </div>
        <article>
          <h3>台灣銀行 行政助理</h3>
        </article>
        <div>
          <div class="circle"></div>
          <div class="time">
            就學 2014－2020
          </div>
        </div>
        <article>
          <h3>政治大學 歷史學系 碩士 肄業</h3>
        </article>
        <div>
          <div class="circle"></div>
          <div class="time">
            就學 2009－2013
          </div>
        </div>
        <article>
          <h3>嘉義大學 應用歷史系 學士 畢業</h3>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const avatar = ref(null)
const realAvatar = ref(null)
const comicAvatar = ref(null)

function moveAvatar () {
  const realAvatarClass = realAvatar.value.classList
  const comicAvatarClass = comicAvatar.value.classList

  // className開關：顯示move，或者move_default
  // 這個開關改變動畫效果，請參考scss區域的move, move_default
  if (realAvatarClass.contains('move')) {
    realAvatarClass.remove('move')
    comicAvatarClass.remove('move')
    realAvatarClass.add('move_default')
    comicAvatarClass.add('move_default')
  } else if (realAvatarClass.contains('move_default')) {
    realAvatarClass.add('move')
    comicAvatarClass.add('move')
    realAvatarClass.remove('move_default')
    comicAvatarClass.remove('move_default')
  }
}
</script>

<style scoped lang="scss">
a{
    display: block;
}

.resume{
    background-image: url(@/assets/background.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
.profile_header{
    display: flex;
    align-items: stretch;
    background-size: 10%;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px lightgray;
}
.left_profile{
    width: 33.5%;
}
.avatar{
    width: 200px;
    height: 200px;
    position: relative;
    box-shadow: 0px 0px 4px skyblue;
    margin: 10px auto;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}
.real_avatar_frame{
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    // position: absolute;
    // z-index: 2;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.move{
  transition: 1s;
  transform: translateX(-100%);
}
.move_default{
  transition: 1s;
  transform: translateX(0%);
}
.comic_avatar_frame{
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    // background: url(@/assets/comic_avatar3.jpg) no-repeat 50% 5%;
    // background-size: cover;
    // position: absolute;
    // z-index: 1;
    img {
        width: 100%;
        object-fit: cover;
    }
}

.basic_info{
    width: 300px;
    margin: 20px auto;
}
.address, .tel, .email{
    color: lightgray;
    margin: 8px;
    font-weight: bold;
}
.other_info{
    width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.other_info a{
    width: 100%;
    border: 1px solid silver;
    padding: 0.25rem;
    margin: 5px;
    color: #1c595a;
    background: #ddd;
}

.other_info>a>span{
    display: block;
    width: 100%;
    text-align: center;
}
.right_profile{
    /* outline: 1px dotted black; */
    width: 66.5%;
}
.intro_background{
    width: 100%;
    height: 100%;
    background: #56b0aea8;
  }
  .intro_background h3{
    font-size: 2rem;
    font-weight: bold;
    padding: 20px;
  }
  .intro_background ul{
    /* font-size: 1.25rem; */
    list-style-type: none;
    padding: 0px 0px 20px 20px;
}
.intro_background h4{
    font-weight: bold;
}
.intro_background ul>li, .intro_background ul>h4{
    padding-bottom: 8px;
}
.intro_background p{
    font-weight: bold;
    padding: 0px 0px 20px 20px;
}
@media screen and (max-width: 1200px){
    header{
        flex-direction: column;
    }
    .left_profile{
        width: 100%;
    }
    .other_info{
        width: 90%;
    }
    .right_profile{
        width: 100%;
    }
    .intro_background{
      height: 100%;
    }
    .intro_background h3{
        text-align: center;
    }
    .intro_background ul li{
        font-size: 0.85rem;
    }
    .intro_background p{
        font-size: 0.85rem;
        margin-bottom: 0;
    }
}

.main_skill{
    background: rgba(255, 255, 255, 0.6);
    padding-bottom: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px lightgray;
}
.main_skill>.title{
    font-size: 2rem;
    font-weight: bold;
    padding: 20px;
}
.card_area{
    display: flex;
    justify-content: space-around;
}
.main_skill .card_area .card{
    width: 24%;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(128, 128, 128, 0.256);
    margin-bottom: 10px;
    padding: 10px;
}
.main_skill .card_area .card h3{
    width: 80%;
    margin: 10px auto;
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    border-bottom: 2px solid #1c595a;
    padding-bottom: 10px;
}
.main_skill .card_area .card li{
    width: 80%;
    margin: 6px auto;
    /* margin-left: 10%; */
    list-style: circle;
}
@media screen and (max-width: 1200px){
    .card_area{
        flex-wrap: wrap;
    }
    .main_skill .card_area .card{
    width: 48%;
    }
}

.timeline{
    background: rgba(255, 255, 255, 0.6);
    padding-bottom: 20px;
    margin-bottom: 20px;
    box-shadow: 0 0px 10px lightgray;
}
.timeline>.title{
    font-size: 2rem;
    font-weight: bold;
    padding: 20px;
}
.timeline_area{
    display: grid;
    grid-template-columns: 300px 1fr;
}
.timeline_area>div{
    position: relative;
    border-right: 8px solid #1c595a;
}
.timeline_area>div>.circle{
    width: 25px;
    height: 25px;
    position: absolute;
    top: calc(50% - 12.5px);
    right: -17px;
    background: #58a6a6;
    border-radius: 50%;
}
.timeline_area .time{
    width: 200px;
    position: absolute;
    top: calc(50% - 14px);
    font-size: 1.25rem;
    font-weight: bold;
    text-align: right;
}
.timeline_area>article>h3{
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
    background: #58a6a6;
    border-radius: 10px;
}
@media screen and (max-width: 1200px){
    .timeline_area{
        grid-template-columns: 47% 53%;
    }
    .timeline_area .time{
        width: 100%;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
    }
    .timeline_area article{
        margin: 0 12px;
    }
}

@media screen and (max-width: 1200px){
    .collection_area{
        grid-template-columns: 1fr;
    }
    .collection_area_left li {
        font-size: 0.85rem;
        list-style: circle;
    }
    .collection_area_right>.background{
        height: 50vw;
    }
}
</style>
