import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import NavBar from './components/NavBar.vue'
import PurchaseInfo, { length } from './components/PurchaseInfo.vue'

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

const app = createApp(App)
app.config.globalProperties.$length = {
  length
}
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('NavBar', NavBar)
app.component('PurchaseInfo', PurchaseInfo)
app.mount('#app')
