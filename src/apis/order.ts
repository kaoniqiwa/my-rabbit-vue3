import type { CreateOrderParams, CreateOrderResult, IReponse } from '@/types'
import type { OrderDetailDTO } from '@/types'
import httpInstance from '@/utils/http'

/**提交订单 */
export function createOrderAPI(data: CreateOrderParams) {
  return httpInstance.post<IReponse<CreateOrderResult>>('/member/order', data)
}
export function getOrderAPI(orderId: string) {
  return httpInstance.get<IReponse<OrderDetailDTO>>(`/member/order/${orderId}`)
}
