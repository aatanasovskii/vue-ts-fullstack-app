import './assets/main.css'

import { createApp } from 'vue'
import Auth from './components/Auth.vue'
import router from './router'

const app = createApp(Auth)

app.use(router)

app.mount('#app')
