import './styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyLoadPlugin } from '@/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyLoadPlugin)

app.mount('#app')
