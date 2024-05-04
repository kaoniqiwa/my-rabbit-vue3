import { loginAPI } from '@/apis/user'
import type { UserDTO, UserParams } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserDTO>()

    const getUserInfo = async (data: UserParams) => {
      const {
        data: { result }
      } = await loginAPI(data)

      userInfo.value = result
    }
    return {
      userInfo,
      getUserInfo
    }
  },
  {
    // pinia-plugin-persistedstate 插件配置
    persist: true
  }
)
