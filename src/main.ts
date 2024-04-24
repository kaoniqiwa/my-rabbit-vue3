import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'
const app = createApp(App)

app.directive<HTMLImageElement, string>('img-lazy', {
  mounted(el, binding, vnode) {
    console.log(el)
    console.log(binding.value)
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      console.log(isIntersecting)
      if (isIntersecting) {
        el.setAttribute('src', binding.value)
      }
    })
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
