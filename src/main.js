import { createApp } from 'vue'
import router from "@/router/router"
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faTruck, faHandshake } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faTruck, faHandshake)

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')
