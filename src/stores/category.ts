import { getCategoryHeadAPI } from '@/apis/layout'
import type { IHomeCategory } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<IHomeCategory[]>([])
  const getCategory = async () => {
    const {
      data: { result }
    } = await getCategoryHeadAPI()
    categoryList.value = result
  }

  return {
    categoryList,
    getCategory
  }
})
