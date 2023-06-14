<script lang="ts" setup>

import {h, onMounted, render} from "vue";

const vNode = h('h1', {
    title: 'hello world!!!',
    id: "h1Element",
    className: "content"
}, 'hello world')

onMounted(() => {
    render(vNode, document.querySelector('.box')!)
})
</script>
<template>
    <div class="box"></div>
</template>
<style lang="less" scoped>
::v-deep(.content) {
    background: #1dc779;
}
</style>