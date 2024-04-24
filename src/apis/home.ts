import httpInstance from '@/utils/http'
import type { IBanner } from '@/types/banner'
import type { IReponse } from '@/types/response'
import type { INewGood } from '@/types/newGood'
import type { IHotGood } from '@/types/hotGood'

export function getBannerAPI() {
  return httpInstance.get<IReponse<IBanner[]>>('/home/banner')
}

export function findNewAPI() {
  return httpInstance.get<IReponse<INewGood[]>>('/home/new')
}

export function getHotAPI() {
  return httpInstance.get<IReponse<IHotGood[]>>('/home/hot')
}
