<script lang="ts" name="Cart" setup>
import useStore from "@/store";
import Message from "@/components/message";
import Confirm from "@/components/confirm";
import {useRouter} from "vue-router";

const router = useRouter()
const {cart} = useStore()

const delCart = async (skuIds: string[]) => {
    await Confirm({
        title: '温馨提示',
        text: '你确定要删除吗?'
    })
    await cart.deleteCart(skuIds)
    Message.success('删除成功')
}

const handleChange = async (value: boolean, skuId: string) => {
    await cart.updateCart(skuId, {selected: value})
}

const changeCount = async (value: number, skuId: string) => {
    await cart.updateCart(skuId, {count: value})
}

// 跳转到结算页
const goCheckout = () => {
    if (cart.selectedList.length === 0) {
        return Message.warning('请至少选择一件商品')
    }
    router.push('/member/checkout')
}
</script>

<template>
    <div class="xtx-cart-page">
        <div class="container">
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem>购物车</XtxBreadItem>
            </XtxBread>
            <div class="cart">
                <table>
                    <thead>
                    <tr>
                        <th width="120">
                            <XtxCheckbox :model-value="cart.isAllSelected"
                                         @update:model-value="cart.updateCartAllSelected(!cart.isAllSelected)">全选
                            </XtxCheckbox>
                        </th>
                        <th width="400">商品信息</th>
                        <th width="220">单价</th>
                        <th width="180">数量</th>
                        <th width="180">小计</th>
                        <th width="140">操作</th>
                    </tr>
                    </thead>
                    <!-- 有效商品 -->
                    <tbody>
                    <tr v-for="item in cart.effectiveList" :key="item.skuId">
                        <td>
                            <XtxCheckbox :model-value="item.selected" @change="handleChange($event,item.skuId)"/>
                        </td>
                        <td>
                            <div class="goods">
                                <RouterLink :to="`/goods/${item.id}`">
                                    <img :src="item.picture" alt=""/>
                                </RouterLink>
                                <div>
                                    <p class="name ellipsis">
                                        {{ item.name }}
                                    </p>
                                    <p class="attr">{{ item.attrsText }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="tc">
                            <p>&yen;{{ item.nowPrice }}</p>
                        </td>
                        <td class="tc">
                            <XtxNumbox :max="item.stock" :model-value="item.count"
                                       @update:model-value="changeCount($event,item.skuId)"/>
                        </td>
                        <td class="tc">
                            <p class="f16 red">
                                &yen;{{ (Number(item.nowPrice) * item.count).toFixed(2) }}
                            </p>
                        </td>
                        <td class="tc">
                            <p><a href="javascript:;">移入收藏夹</a></p>
                            <p><a class="green" href="javascript:;" @click="delCart([item.skuId])">删除</a></p>
                            <p><a href="javascript:;">找相似</a></p>
                        </td>
                    </tr>
                    <!-- 删除光购物车之后使用元素占位 -->
                    <tr v-if="cart.effectiveList.length === 0">
                        <td colspan="6">
                            <div class="cart-none" style="text-align: center">
                                <img alt="" src="@/assets/images/none.png"/>
                                <p>购物车内暂时没有商品</p>
                                <div class="btn" style="margin: 20px">
                                    <XtxButton type="primary"> 继续逛逛</XtxButton>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch"></div>
                <div class="total">
                    共 {{ cart.effectiveListCounts }} 件有效商品，已选择 {{ cart.selectedListCounts }} 件，商品合计：
                    <span class="red">¥{{ cart.selectedListPrice }}</span>
                    <XtxButton type="primary" @click="goCheckout">下单结算</XtxButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.tc {
    text-align: center;

    .xtx-numbox {
        margin: 0 auto;
        width: 120px;
    }
}

.red {
    color: @priceColor;
}

.green {
    color: @xtxColor;
}

.f16 {
    font-size: 16px;
}

.goods {
    display: flex;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
    }

    > div {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;

        .attr {
            font-size: 14px;
            color: #999;
        }
    }
}

.action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
        color: #999;
    }

    .batch {
        a {
            margin-left: 20px;
        }
    }

    .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: bold;
    }
}

.tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
}

.xtx-cart-page {
    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }
}
</style>