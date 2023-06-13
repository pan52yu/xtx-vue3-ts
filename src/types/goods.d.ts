// 城市列表类型
export type AreaList = {
    code: string
    level: number
    name: string
    areaList: AreaList[]
}

// 商品的规格的值的类型
export type SpecValue = {
    desc: string
    name: string
    picture: string
    selected: boolean
    disabled: boolean
}
// 商品的规格类型
export type Spec = {
    name: string
    values: SpecValue[]
}
// 商品的sku
export type Sku = {
    id: string
    inventory: number
    oldPrice: string
    price: string
    skuCode: string
    specs: {
        name: string
        valueName: string
    }[]
}
// 商品模块的类型声明
export type GoodsInfo = {
    id: string
    name: string
    spuCode: string
    desc: string
    price: string
    oldPrice: string
    discount: number
    inventory: number
    salesCount: number
    commentCount: number
    collectCount: number
    mainVideos: any[]
    videoScale: number
    mainPictures: string[]
    isPreSale: boolean
    isCollect?: any
    recommends?: any
    userAddresses?: any
    evaluationInfo?: any
    categories: {
        id: string
        name: string
    }[]
    specs: Spec[],
    skus: Sku[]
}