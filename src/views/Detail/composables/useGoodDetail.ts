import { getGoodDetailAPI } from '@/apis/good'
import type { GoodDetailDTO } from '@/types'
import { ref, watchEffect, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import data from '@/assets/data.json'

export function useGoodDetail() {
  const route = useRoute()
  const goodDetail = ref<GoodDetailDTO>()
  const getGoodDetail = async (id: string) => {
    const {
      data: { result }
    } = await getGoodDetailAPI({
      id
    })
    goodDetail.value = data as unknown as GoodDetailDTO
    // goodDetail.value = result
  }
  watchEffect(() => {
    getGoodDetail(route.params.id as string)
  })

  return {
    goodDetail
  }
}
