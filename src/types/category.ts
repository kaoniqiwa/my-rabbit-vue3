interface IGood {
  id: string
  name: string
  picture: string
  desc: string
  orderNum: number | null
  price: number
}
export interface ICategory {
  id: string
  name: string
  picture: string
  goods: Array<IGood> | null
  children: Array<ICategory> | null
}
