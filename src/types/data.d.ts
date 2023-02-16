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
