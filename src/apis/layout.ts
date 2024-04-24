import type { IHomeCategory } from '@/types/homeCategory'
import type { IReponse } from '@/types/response'

import httpInstance from '@/utils/http'

export function getCategoryHeadAPI() {
  return httpInstance.get<IReponse<IHomeCategory[]>>('/home/category/head')
}
