import {defineStore} from "pinia";
import request from "@/utils/request";
import Message from "@/components/message";
import {ApiRes} from "@/types/data";
import {CartItem} from "@/types/cart";

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
        async addCart(data: { skuId: string; count: number }) {
            await request.post('/member/cart', data)
            Message.success('加入购物车成功')
            await this.getCartList()
        },
        // 获取购物车列表
        async getCartList() {
            const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
            this.list = res.data.result
        },
        // 删除购物车商品
        async deleteCart(skuIds: string[]) {
            await request.delete('/member/cart', {
                data: {ids: skuIds}
            })
            Message.success('删除成功')
            // 重新获取最新购物车列表
            await this.getCartList()
        },
        // 修改购物车商品 选中状态  数量
        async updateCart(skuId: string, data: { selected?: boolean; count?: number }) {
            await request.put(`/member/cart/${skuId}`, data)
            // 重新获取最新购物车列表
            await this.getCartList()
        },
        // 修改全选或者全不选
        async updateCartAllSelected(isSelected: boolean) {
            await request.put('/member/cart/selected', {
                selected: isSelected,
            })
            // 获取购物车列表
            await this.getCartList()
        },
        //  清空购物车
        clearCart() {
            this.list = []
        }
    },
});
