import type { GoodDetailDTO, GoodDetailParams } from '@/types'
import type { IReponse } from '@/types/response'

import httpInstance from '@/utils/http'

/**商品详情 */
export function getGoodDetailAPI(params: GoodDetailParams) {
  return httpInstance.get<IReponse<GoodDetailDTO>>('/goods', {
    params
  })
}
