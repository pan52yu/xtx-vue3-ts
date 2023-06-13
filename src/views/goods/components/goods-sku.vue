<script lang="ts" name="GoodsSku" setup>
import {GoodsInfo, Spec, SpecValue} from '@/types/goods'
import bwPowerSet from "@/utils/power-set";

const props = defineProps<{
    goods: GoodsInfo
}>()

const SPLIT_STR = '+'

/**
 * 选中规格
 * @param item
 * @param sub
 */
const changeSelected = (item: Spec, sub: SpecValue) => {
    if (sub.disabled) return
    if (sub.selected) {
        // 如果已经是选中了，取消选中
        sub.selected = false
    } else {
        // 把同级所有(包括sub)的全部取消选中
        item.values.forEach((v) => (v.selected = false))
        // 让sub选中
        sub.selected = true
    }
    updateDisabledStatus()
}


/**
 * 获取路径字典
 */
const getPathMap = () => {
    const pathMap: {
        [key: string]: string[]
    } = {}
    // 1. 过滤掉库存为0的sku
    const skus = props.goods.skus.filter((item) => item.inventory > 0)
    // 2. 遍历有效的sku,获取sku的幂集
    skus.forEach((item) => {
        const arr = item.specs.map((sub) => sub.valueName)
        // 3. 调用powerSet获取幂集
        const powerSet = bwPowerSet(arr)
        // 4. 把这些powerSet合并到一个路径字典中
        powerSet.forEach((sub) => {
            const key = sub.join(SPLIT_STR)
            // 5. 判断pathMap中有没有key
            if (key in pathMap) {
                // 6. 存在
                pathMap[key].push(item.id)
            } else {
                // 7. 不存在
                pathMap[key] = [item.id]
            }
        })
    })

    return pathMap
}

// 更新按钮的禁用状态
const updateDisabledStatus = () => {
    const selectedSpec = getSelectedSpec()
    // 1. 遍历所有的规格值
    props.goods.specs.forEach((spec, index) => {
        spec.values.forEach((sub) => {
            // 1.1 把当前规格值替换到选中规格中
            const tempArr = [...selectedSpec]
            tempArr[index] = sub.name
            // 1.2 把数组转成字符串 得到的是组合的key
            const key = tempArr.filter(Boolean).join(SPLIT_STR)
            // 1.3 是否在路径字典中 不存在就禁用
            sub.disabled = !(key in pathMap);
        })
    })
}

// 获取当前的选中规格
const getSelectedSpec = () => {
    const arr: string[] = []
    props.goods.specs.forEach((item, index) => {
        const temp = item.values.find((sub) => sub.selected)
        arr[index] = temp ? temp.name : ''
    })
    return arr
}

const pathMap = getPathMap()
updateDisabledStatus()
</script>
<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.name">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="sub in item.values" :key="sub.name">
                    <img v-if="sub.picture" :class="{ selected: sub.selected,disabled: sub.disabled }"
                         :src="sub.picture" :title="sub.name"
                         alt=""
                         @click="changeSelected(item,sub)"/>
                    <span v-else :class="{ selected: sub.selected,disabled: sub.disabled }"
                          @click="changeSelected(item,sub)">{{
                            sub.name
                        }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<style lang="less" scoped>
.sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
        border-color: @xtxColor;
    }
    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            > img {
                width: 50px;
                height: 50px;
                margin-top: 5px;
                .sku-state-mixin ();
            }

            > span {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                padding: 0 20px;
                margin-top: 5px;
                .sku-state-mixin ();
            }
        }
    }
}
</style>
