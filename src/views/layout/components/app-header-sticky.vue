<script lang="ts" setup name="AppHeaderSticky">
import { useWindowScroll } from '@vueuse/core';
import AppHeaderNav from './app-header-nav.vue';
// 控制是否显示吸顶组件
// hooks库 >>> 封装的一些工具函数 >>> 称之为hooks
const { y } = useWindowScroll()
/* const useScrollY = () => {
    const y = ref(0)
    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        y.value = scrollTop
    }

    // 监听滚动条的滚动 获取滚动的距离 大于等于78 就设置78类
    onMounted(() => {
        window.addEventListener('scroll', onScroll)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll)
    })
    return y
}
const y = useScrollY() */
</script>

<template>
    <div ref="el" />
    <!-- v-show不加在最外面 不然就没有状态了 -->
    <div class="app-header-sticky" :class="{ show: y >= 78 }">
        <div class="container" v-show="y >= 78">
            <RouterLink class="logo" to="/" />
            <AppHeaderNav />
            <div class="right">
                <RouterLink to="/">品牌</RouterLink>
                <RouterLink to="/">专题</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    transform: translateY(-100%);
    //   善用类名添加样式
    &.show {
        transition: all 0.3s;
        transform: translateY(0);
    }
    .container {
        display: flex;
        align-items: center;
    }
    .logo {
        width: 200px;
        height: 80px;
        background: url(@/assets/images/logo.png) no-repeat right 2px;
        background-size: 160px auto;
    }
    .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid @xtxColor;
        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;
            &:hover {
                color: @xtxColor;
            }
        }
    }
}
</style>
