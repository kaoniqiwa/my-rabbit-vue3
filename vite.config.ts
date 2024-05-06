import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { version } from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  // 定义全局常量替换方式
  define: {
    VERSION: JSON.stringify(version)
  },
  json: {
    // 支持按名导入
    namedExports: true,
    // 开启，则所有内容作为默认导入，不再支持按名导入
    stringify: false
  },
  // 不要清屏，以免错误一些重要打印信息
  clearScreen: false,
  // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
  envPrefix: 'VITE',
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" ;
          @use "@/styles/element/dark.scss";
          @use "@/styles/var.scss" as *; 
        `
      }
    }
  }
})
