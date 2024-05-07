import type { CartDTO } from '@/types/cart'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    /********************state**********************************************/
    const cartList = ref<Array<CartDTO>>([])

    // 1. 总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((prev, cur) => prev + (cur.count ?? 0), 0)
    )
    // 2. 总价 所有项的count*price之和
    const allPrice = computed(() => {
      return cartList.value
        .reduce((prev, cur) => prev + +(cur.nowOriginalPrice ?? 0) * (cur.count ?? 0), 0)
        .toFixed(2)
    })
    // 3. 已选择数量
    const selectedCount = computed(() => {
      return cartList.value
        .filter((v) => !!v.selected)
        .reduce((prev, cur) => prev + (cur.count ?? 0), 0)
    })
    watch(
      cartList,
      () => {
        console.log('sdsd')
      },
      {
        deep: true
      }
    )

    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() => {
      return cartList.value
        .filter((v) => !!v.selected)
        .reduce((prev, cur) => prev + +(cur.nowOriginalPrice ?? 0) * (cur.count ?? 0), 0)
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
      allPrice,
      selectedCount,
      selectedPrice
    }
  },
  {
    persist: true
  }
)
