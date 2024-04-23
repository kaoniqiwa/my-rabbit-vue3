import type { ICategory } from '@/types/category'
import type { IReponse } from '@/types/response'

import httpInstance from '@/utils/http'

export function getCategoryAPI() {
  return httpInstance.get<IReponse<ICategory[]>>('/home/category/head')
}
