// 所有的接口的通用类型
export interface ApiRes<T> {
    code: string
    msg: string
    result: T
}

export type CategoryGoods = {
    desc: string
    id: string
    name: string
    picture: string
    price: string
}

// 单个分类的类型
export type CategoryItem = {
    id: string
    name: string
    picture: string
    children: CategoryItem[]
    goods: CategoryGoods[]
    open: boolean
}

// 轮播图类型
export type BannerItem = {
    hrefUrl: string
    id: string
    imgUrl: string
    type: string
}

// 新鲜好物
export interface GoodItem {
    desc: string
    id: string
    name: string
    picture: string
    price: string
}

// 人气推荐
export interface HotGoods {
    id: string
    picture: string
    title: string
    alt: string
}

// 热门品牌
export type Brand = {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
}


// 首页商品推荐
export type HomeProduct = {
    id: string
    name: string
    picture: string
    saleInfo: string
    children: {
        id: string
        name: string
    }[]
    goods: {
        id: string
        name: string
        desc: string
        price: string
        picture: string
        discount?: any
        orderNum: number
    }[]
}
