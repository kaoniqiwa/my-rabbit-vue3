import type { ICategoryDetail, ICategoryDetailParams, IReponse } from '@/types'
import httpInstance from '@/utils/http'

/** 二级分类详情*/
export function getCategoryAPI(params: ICategoryDetailParams) {
  return httpInstance.get<IReponse<ICategoryDetail>>('/category', {
    params
  })
}
