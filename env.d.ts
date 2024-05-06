/// <reference types="vite/client" />
declare module '*.vue' {
  import { type ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions

  export default componentOptions
}

declare const VERSION: number

// 提供自定义环境变量支持
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_AUTHOR: string
  readonly VITE_MODE: string
  readonly VITE_SERVE_LOCAL: string
  readonly VITE_LOCAL: string
}
