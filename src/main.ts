import '@/assets/styles/common.less'
import 'normalize.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import XtxUI from './components'
import router from './router'
const pinia = createPinia()
const app = createApp(App)

app.use(XtxUI)
app.use(router)
app.use(pinia)
app.mount('#app')
