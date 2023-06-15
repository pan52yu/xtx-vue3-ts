<script lang="ts" setup>
import {ref} from 'vue'

// 订单状态
const orderStatus = [
    {name: 'allD', label: '全部订单'},
    {name: 'unpay', label: '待付款'},
    {name: 'deliver', label: '待发货'},
    {name: 'receive', label: '待收货'},
    {name: 'comment', label: '待评价'},
    {name: 'refund', label: '退款/售后'}
]
const activeName = ref('all')
</script>

<template>
    <xtx-tabs v-model="activeName">
        <XtxTabsPane label="全部" name="all">
            <h1>全部的内容</h1>
        </XtxTabsPane>
        <XtxTabsPane
            v-for="item in orderStatus"
            :key="item.label"
            :label="item.label"
            :name="item.name"
        >
            <h1>{{ item.name }}的内容</h1>
        </XtxTabsPane>
    </xtx-tabs>
</template>