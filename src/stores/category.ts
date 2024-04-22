import { getCategoryAPI } from '@/apis/layout'
import type { ICategory } from '@/types/category'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<ICategory[]>([])
  const getCategory = async () => {
    const {
      data: { result }
    } = await getCategoryAPI()
    categoryList.value = result
  }

  return {
    categoryList,
    getCategory
  }
})
