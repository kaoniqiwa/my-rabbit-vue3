import type { IHomeCategory } from '@/types/homeCategory'
import type { IReponse } from '@/types/response'

import httpInstance from '@/utils/http'

/**头部导航栏 */
export function getCategoryHeadAPI() {
  return httpInstance.get<IReponse<IHomeCategory[]>>('/home/category/head')
}
