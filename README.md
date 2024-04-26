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

## 路由缓存问题

```ts
{
  path: '/user/:id'
}
```

/use/foo 和 /user/bar 切换时，复用 User 组件，路由参数发生变化，需要根据新的参数发起请求

1. 禁止路由复用

```vue
<RouterView :key="$route.fullPath" />
```

2. 组件守卫

```ts
onBeforeRouteUpdate(async (to, from) => {
  fetch('something')
})
```

## tab 切换发送数据

```ts
export function useTemporary(temporaryParams: Ref<ITemporaryGoodParams>) {
  const temporaryGoodList = ref<ITemporaryGood['items']>()
  const getTemporaryGoodList = async () => {
    const {
      data: { result }
    } = await getTemporaryGoodsAPI(temporaryParams.value)
    temporaryGoodList.value = result.items
  }

  watchEffect(() => {
    getTemporaryGoodList()
  })
  return {
    temporaryGoodList
  }
}
```

通过 watchEffect 收集请求参数，自动发送请求,不需要 onMounted(),watch(),tabChangeCallback()

```vue
<script setup lang="ts">
const temporaryParams = ref<ITemporaryGoodParams>({
  categoryId: route.params.id as string,
  page: 1,
  pageSize: 20,
  sortField: SortField.PUBLISHTIME
})
const { temporaryGoodList } = useTemporary(temporaryParams)
</script>
<template>
  <el-tabs v-model="temporaryParams.sortField" @tab-change="temporaryParams.page = 1">
    <el-tab-pane label="最新商品" :name="SortField.PUBLISHTIME"></el-tab-pane>
    <el-tab-pane label="最高人气" :name="SortField.ORDERNUM"></el-tab-pane>
    <el-tab-pane label="评论最多" :name="SortField.EVALUATENUM"></el-tab-pane>
  </el-tabs>
</template>
```
