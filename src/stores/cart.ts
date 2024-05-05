import type { GoodDetailDTO } from '@/types'
import type { CartDTO } from '@/types/cart'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 1. 定义state - cartList
  const cartList = ref<Array<CartDTO>>([])

  const addCart = (good: GoodDetailDTO) => {}

  return {
    cartList,
    addCart
  }
})
