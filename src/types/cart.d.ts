// 单个购物车商品
export interface CartItem {
    // id
    id: string
    // skuId
    skuId: string
    // 商品名称
    name: string
    // 商品属性
    attrsText: string
    // 商品图片
    picture: string
    price: string
    nowPrice: string
    nowOriginalPrice: string
    // 是否选中
    selected: boolean
    // 库存
    stock: number
    // 数量
    count: number
    // 是否有效
    isEffective: boolean
    // discount?: any;
    // 是否收藏
    isCollect: boolean
    postFee: number
}