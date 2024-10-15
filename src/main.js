import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import * as bootstrap from 'bootstrap'

import NavBar from './components/NavBar.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars, faBackward, faPlay,
  faPause, faForward, faLocationDot, faMobile, faEnvelope,
  faMagnifyingGlass, faGear, faCirclePlus, faTrash, faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faBars, faBackward, faPlay,
  faPause, faForward, faLocationDot, faMobile, faEnvelope,
  faFacebook, faGithub, faMagnifyingGlass, faGear, faCirclePlus,
  faTrash, faPlus, faMinus
)

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(pinia)
app.use(bootstrap)
app.provide('axios', app.config.globalProperties.axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('NavBar', NavBar)
app.mount('#app')
