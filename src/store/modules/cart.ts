import {defineStore} from "pinia";
import request from "@/utils/request";
import Message from "@/components/message";
import {ApiRes} from "@/types/data";
import {CartItem} from "@/types/cart";
import useStore from "@/store";

export default defineStore('cart', {
    // 状态
    state() {
        return {
            // 购物车数组
            list: [] as CartItem[]
        }
    },
    // 计算
    getters: {
        // 🔑登录状态
        isLogin(): boolean {
            const {user} = useStore()
            return !!user.profile.token
        },
        // 计算有效商品列表 isEffective = true  filter
        effectiveList(): CartItem[] {
            return this.list.filter((item) => item.stock > 0 && item.isEffective)
        },
        // 有效商品总数量 把effctiveList中的每一项的count叠加起来
        effectiveListCounts(): number {
            return this.effectiveList.reduce((sum, item) => sum + item.count, 0)
        },
        // 总钱数  = 所有单项的钱数累加  单项的钱数 = 数量 * 单价
        effectiveListPrice(): string {
            return this.effectiveList
                .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
                .toFixed(2)
        },
        isAllSelected(): boolean {
            return (
                this.effectiveList.length !== 0 &&
                this.effectiveList.every((item) => item.selected)
            )
        },
        // 已选择的列表
        selectedList(): CartItem[] {
            return this.effectiveList.filter((item) => item.selected)
        },
        // 已选择的商品总数
        selectedListCounts(): number {
            return this.selectedList.reduce((sum, item) => sum + item.count, 0)
        },
        // 已选择的列表总价
        selectedListPrice(): string {
            return this.selectedList
                .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
                .toFixed(2)
        }
    },
    // 方法
    actions: {
        async addCart(data: CartItem) {
            if (this.isLogin) {
                const {skuId, count} = data
                await request.post('/member/cart', {skuId, count})
                Message.success('加入购物车成功')
                await this.getCartList()
            } else {
                // 1. 判断购物车中是否已经存在该商品
                const goods = this.list.find((item) => item.skuId === data.skuId)
                if (goods) {
                    // 2. 如果存在，数量相加
                    goods.count += data.count
                } else {
                    // 3. 如果不存在，添加到数组中
                    this.list.unshift(data)
                }
            }
        },
        // 获取购物车列表
        async getCartList() {
            if (this.isLogin) {
                const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
                this.list = res.data.result
            } else {
                // 遍历发送请求, 校验更新sku商品的库存和价格, 是否有效
                for (const cartItem of this.list) {
                    const {skuId} = cartItem
                    // 根据 skuId 获取最新商品信息
                    const res = await request.get<ApiRes<CartItem>>(
                        `/goods/stock/${skuId}`
                    )
                    // 保存最新商品信息
                    const lastCartInfo = res.data.result
                    // 更新商品现价
                    cartItem.nowPrice = lastCartInfo.nowPrice
                    // 更新商品库存
                    cartItem.stock = lastCartInfo.stock
                    // 更新商品是否有效
                    cartItem.isEffective = lastCartInfo.isEffective
                }
            }
        },
        // 删除购物车商品
        async deleteCart(skuIds: string[]) {
            if (this.isLogin) {
                await request.delete('/member/cart', {
                    data: {ids: skuIds}
                })
                Message.success('删除成功')
                // 重新获取最新购物车列表
                await this.getCartList()
            } else {
                // 本地删除
                this.list = this.list.filter((item) => !skuIds.includes(item.skuId))
            }
        },
        // 修改购物车商品 选中状态  数量
        async updateCart(skuId: string, data: { selected?: boolean; count?: number }) {
            if (this.isLogin) {
                await request.put(`/member/cart/${skuId}`, data)
                // 重新获取最新购物车列表
                await this.getCartList()
            } else {
                // 本地修改
                const goods = this.list.find((item) => item.skuId === skuId)
                if (goods) {
                    goods.selected = data.selected ?? goods.selected
                    goods.count = data.count ?? goods.count
                }
            }
        },
        // 修改全选或者全不选
        async updateCartAllSelected(isSelected: boolean) {
            if (this.isLogin) {
                await request.put('/member/cart/selected', {
                    selected: isSelected,
                })
                // 获取购物车列表
                await this.getCartList()
            } else {
                this.list.forEach((item) => (item.selected = isSelected))
            }
        },
        //  清空购物车
        clearCart() {
            this.list = []
        }
    },
    persist: {
        key: 'XtxCart'
    }
});
