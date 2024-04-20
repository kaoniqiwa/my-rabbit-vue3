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

```ts
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
app.use(ElementPlus)
```

局部导入:

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

Element 自定义主题:` import 'element-plus/theme-chalk/dark/css-vars.css'`

类型提示:

tsconfig.app.json

```json
{
  "compilerOptions": {
    "types": ["element-plus/global"]
  }
}
```
