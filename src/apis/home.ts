import httpInstance from '@/utils/http'
import type { IHomeBanner, IReponse, IHomeNew, IHomeHot, IHomeGood } from '@/types'

export function getBannerAPI() {
  return httpInstance.get<IReponse<IHomeBanner[]>>('/home/banner')
}

export function findNewAPI() {
  return httpInstance.get<IReponse<IHomeNew[]>>('/home/new')
}

export function getHotAPI() {
  return httpInstance.get<IReponse<IHomeHot[]>>('/home/hot')
}

export function getGoodsAPI() {
  return httpInstance.get<IReponse<IHomeGood[]>>('/home/goods')
}
