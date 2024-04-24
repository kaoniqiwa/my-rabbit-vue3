# my-rabbit-vue3

## 导入 .vue 文件

env.d.ts

```ts
declare module '*.vue' {
  import { type ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions

  export default componentOptions
}
```

## 路径别名

`import HelloWorld from '@/components/HelloWorld.vue'`

tsconfig.app.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

该配置项仅作为代码提示，不参与打包结果路径的转换.

vite.config.ts

```ts
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

构建工具 vite 负责将路径别名转成实际的绝对路径。

## ElementPlus

全局导入:

main.ts

```ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

局部导入:

main.ts

~~import ElementPlus from 'element-plus'~~  
~~import 'element-plus/dist/index.css'~~  
~~app.use(ElementPlus)~~

安装插件:`npm i --save-dev unplugin-auto-import unplugin-vue-components`

vite.config.ts

```ts
export default DefineComponent(() => {
  return {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
```

Element 暗黑主题:

全局导入的形式

main.ts

```ts
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
```

ElementPlus 组件类型提示:

tsconfig.app.json

```json
{
  "compilerOptions": {
    "types": ["element-plus/global"]
  }
}
```

## 自定义主题

style/element/index.scss

```scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      // 主色
      'base': #27ba9b
    ),
    'success': (
      // 成功色
      'base': #1dc779
    ),
    'warning': (
      // 警告色
      'base': #ffb302
    ),
    'danger': (
      // 危险色
      'base': #e26237
    ),
    'error': (
      // 错误色
      'base': #cf4444
    )
  )
);
```

原理:覆盖 var.scss 中的 $colors 这个 map 对象

在局部导入的基础上配置自定义主题

vite.config.ts

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        // 自定义主题相关
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" ;
        `
      }
    }
  }
})
```

## 图片懒加载

`npm i @vueuse/core`

```vue
<img v-img-lazy="item.picture" />
```

```ts
import { useIntersectionObserver } from '@vueuse/core'

// 注册全局指令
app.directive<HTMLImageElement, string>('img-lazy', {
  mounted(el, binding, vnode) {
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // 图片进入视口后， src 为真正URL地址
      if (isIntersecting) {
        el.setAttribute('src', binding.value)
      }
    })
  }
})
```

## ts 类型运算

```ts
import type { IHomeGood } from '@/types'

interface IGood {
  good: IHomeGood['goods'][number]
}
defineProps<IGood>()
```

不能将 IHomeGood['goods'][number] 直接作为 defineProps 的泛型，需要本地声明接口
