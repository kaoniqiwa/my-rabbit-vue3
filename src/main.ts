import './styles/common.scss'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyLoadPlugin } from '@/directives'
import { componentPlugin } from '@/components'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(lazyLoadPlugin)
app.use(componentPlugin)

app.mount('#app')
