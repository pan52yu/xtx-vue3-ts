<script lang="ts" name="Goods" setup>
import useStore from "@/store"
import {storeToRefs} from "pinia"
import {ref, watchEffect} from "vue"
import {useRoute} from "vue-router"
import GoodsImage from "@/views/goods/components/goods-image.vue"
import GoodsSales from "./components/goods-sales.vue"
import GoodsName from "./components/goods-name.vue"
import GoodsSku from "./components/goods-sku.vue"
import GoodsDetail from "@/views/goods/components/goods-detail.vue";

const {goods} = useStore()
const route = useRoute()

// 1. 一进入页面立即执行
// 2. 依赖于路由参数id，当id变化的时候，重新执行
watchEffect(() => {
    const id = route.params.id as string
    // 判断id是否存在，以及路由是否匹配
    if (id && route.fullPath === `/goods/${id}`) {
        // 重置数据
        goods.resetGoodsInfo()
        // 获取数据
        goods.getGoodsInfo(id)
    }
})

const {info} = storeToRefs(goods)

const changeSku = (skuId: string) => {
    const sku = info.value.skus.find((sku) => sku.id === skuId)
    if (sku) {
        info.value.inventory = sku.inventory
        info.value.price = sku.price
        info.value.oldPrice = sku.oldPrice
    }
}

const count = ref(1)
</script>

<template>
    <div class="xtx-goods-page">
        <div class="container">
            <!-- 渲染 -->
            <div v-if="info.categories">
                <!-- 面包屑 -->
                <XtxBread>
                    <XtxBreadItem to="/">首页</XtxBreadItem>
                    <XtxBreadItem :to="`/category/${info.categories[1].id}`">
                        {{ info.categories[1].name }}
                    </XtxBreadItem>
                    <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
                        {{ info.categories[0].name }}
                    </XtxBreadItem>
                    <XtxBreadItem>{{ info.name }}</XtxBreadItem>
                </XtxBread>
                <!-- 商品信息 -->
                <div class="goods-info">
                    <div class="media">
                        <GoodsImage :images="info.mainPictures"></GoodsImage>
                        <GoodsSales></GoodsSales>
                    </div>
                    <div class="spec">
                        <GoodsName :goods="info"></GoodsName>
                        <!-- 规格组件 -->
                        <GoodsSku :goods="info" @changeSku="changeSku"/>
                        <!-- 数字选择器 -->
                        <XtxNumbox v-model="count"></XtxNumbox>
                        <!-- 加入购物车 -->
                        <xtx-button style="margin-top: 20px;" type="primary">加入购物车</xtx-button>
                    </div>
                </div>
                <!-- 商品详情 -->
                <div class="goods-footer">
                    <div class="goods-article">
                        <!-- 商品+评价 -->
                        <div class="goods-tabs">
                            <!-- 商品详情 -->
                            <GoodsDetail :goods="info"/>
                        </div>
                    </div>
                    <!-- 24热榜+专题推荐 -->
                    <div class="goods-aside"></div>
                </div>
            </div>

            <!-- 占位的 -->
            <div v-else>
                <!-- 面包屑 -->
                <XtxBread>
                    <XtxBreadItem to="/">首页</XtxBreadItem>
                </XtxBread>
                <!-- 商品信息 -->
                <div class="goods-info"></div>
                <!-- 商品详情 -->
                <div class="goods-footer">
                    <div class="goods-article">
                        <!-- 商品+评价 -->
                        <div class="goods-tabs"></div>
                    </div>
                    <!-- 24热榜+专题推荐 -->
                    <div class="goods-aside"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
    }

    .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
    }
}

.goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
        width: 940px;
        margin-right: 20px;
    }

    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;
}

.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}
</style>
