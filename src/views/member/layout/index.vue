<script lang="ts" setup>
import MemberAside from './components/member-aside.vue'
</script>

<template>
    <div class="container">
        <MemberAside/>
        <div class="article">
            <!-- 三级路由的出口 -->
            <RouterView/>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    display: flex;
    padding-top: 20px;

    .article {
        width: 1000px;
    }
}
</style>