export interface ICategoryDetailParams {
  id: string
}
/**
 * 响应结果
 */
export interface ICategoryDetail {
  /**
   * 一级分类id
   */
  id: string
  /**
   * 一级分类名字
   */
  name: string
  /**
   * 一级分类图片
   */
  picture: null

  /**
   * 下属分类数组
   */
  children: Child[]

  [property: string]: any
}

export interface Child {
  /**
   * 推荐品牌
   */
  brands: null
  /**
   * 分类集合
   */
  categories: null
  /**
   * 二级分类商品
   */
  goods: Good[]
  /**
   * 二级分类id
   */
  id: string
  /**
   * 二级分类名字
   */
  name: string
  /**
   * 二级分类父级分类id
   */
  parentId: null
  /**
   * 二级分类父级分类名字
   */
  parentName: null
  /**
   * 二级分类图片
   */
  picture: string
  /**
   * 销售属性
   */
  saleProperties: null
  [property: string]: any
}

export interface Good {
  /**
   * 商品描述
   */
  desc: string
  /**
   * 商品折扣
   */
  discount: null
  /**
   * 商品id
   */
  id: string
  /**
   * 商品名字
   */
  name: string
  /**
   * 商品订单数(销量)
   */
  orderNum: number
  /**
   * 商品图片
   */
  picture: string
  /**
   * 商品价格
   */
  price: string
  [property: string]: any
}
