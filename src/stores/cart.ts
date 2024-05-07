import type { CartDTO } from '@/types/cart'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  /********************state**********************************************/
  const cartList = ref<Array<CartDTO>>([])

  // 商品总和
  const allCount = computed(() => cartList.value.reduce((prev, cur) => prev + (cur.count ?? 0), 0))
  const allPrice = computed(() => {
    return cartList.value
      .reduce((prev, cur) => prev + +(cur.price ?? 0) * (cur.count ?? 0), 0)
      .toFixed(2)
  })

  /********************action**********************************************/
  const addCart = (cart: CartDTO) => {
    // 排除 skuId 的 undefined 匹配
    const target = cartList.value.find((v) => v.skuId && v.skuId === cart.skuId)
    if (target) {
      target.count! += cart.count!
    } else {
      cartList.value.push(cart)
    }
  }
  const delCart = (skuId: string) => {
    let index = cartList.value.findIndex((v) => v.skuId && v.skuId === skuId)
    if (index != -1) {
      cartList.value.splice(index, 1)
    }
  }

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice
  }
})
