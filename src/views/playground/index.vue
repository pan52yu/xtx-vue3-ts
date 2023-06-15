<script lang="ts" setup>

import {h, onMounted, ref, render} from "vue";

const vNode = h('h1', {
    title: 'hello world!!!',
    id: "h1Element",
    className: "content"
}, 'hello world')


const show = ref(false)
onMounted(() => {
    render(vNode, document.querySelector('.box')!)
})
</script>
<template>
    <div class="box"></div>
    <xtx-button type="primary" @click="show = true">点我</xtx-button>
    <Teleport to="body">
        <xtx-dialog v-model:visible="show" title="我是标题">
        </xtx-dialog>
    </Teleport>
</template>
<style lang="less" scoped>
::v-deep(.content) {
    background: #1dc779;
}
</style>