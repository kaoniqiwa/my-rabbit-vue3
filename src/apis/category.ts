import type { ICategoryDetail, IReponse } from '@/types'
import httpInstance from '@/utils/http'

export function getCategoryAPI() {
  return httpInstance.get<IReponse<ICategoryDetail>>('/category', {
    params: {
      id: '1005000'
    }
  })
}
