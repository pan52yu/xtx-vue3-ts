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
import GoodsHot from "@/views/goods/components/goods-hot.vue";
import Message from "@/components/message";
import {CartItem} from "@/types/cart";

const {goods, cart} = useStore()
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
// 保存skuId
const currentSkuId = ref<string>('')
const changeSku = (skuId: string) => {
    currentSkuId.value = skuId
    const sku = info.value.skus.find((sku) => sku.id === skuId)
    if (sku) {
        info.value.inventory = sku.inventory
        info.value.price = sku.price
        info.value.oldPrice = sku.oldPrice
    }
}

const count = ref(1)

const addCart = () => {
    // 判断是否是完整的sku
    if (!currentSkuId.value) {
        return Message.warning('请选择完整信息')
    }
    const sku = info.value.skus.find((item) => item.id === currentSkuId.value)!
    const attrsText = sku.specs
        .map((item) => item.name + ':' + item.valueName)
        .join(' ')
    cart.addCart({
        // 本地添加
        id: info.value.id,
        name: info.value.name,
        picture: info.value.mainPictures[0],
        price: info.value.price,
        count: count.value,
        skuId: currentSkuId.value,
        attrsText: attrsText,
        selected: true,
        nowPrice: info.value.price,
        stock: info.value.inventory,
        isEffective: true,
    } as CartItem)
    Message.success('添加成功')
}
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
                        <XtxNumbox v-model="count" show-label></XtxNumbox>
                        <!-- 加入购物车 -->
                        <xtx-button style="margin-top: 20px;" type="primary" @click="addCart">加入购物车</xtx-button>
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
                    <div class="goods-aside">
                        <GoodsHot :type="1"/>
                        <GoodsHot :type="2"/>
                        <GoodsHot :type="3"/>
                    </div>
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
