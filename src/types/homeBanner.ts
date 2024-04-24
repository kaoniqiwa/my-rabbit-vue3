export interface IHomeBanner {
  /**
   * 轮播图跳转链接
   */
  hrefUrl: string
  /**
   * 轮播图id
   */
  id: string
  /**
   * 轮播图地址
   */
  imgUrl: string
  /**
   * 轮播图跳转类型，跳转类型: 1、页面 2、H5 3、小程序（小程序使用）
   */
  type: string
  [property: string]: any
}
