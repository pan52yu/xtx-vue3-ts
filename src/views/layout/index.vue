<script lang="ts" setup name="Layout">
import AppFooter from '@/views/layout/components/app-footer.vue';
import AppHeader from '@/views/layout/components/app-header.vue';
import AppTopnav from '@/views/layout/components/app-topnav.vue';
import AppHeaderSticky from "@/views/layout/components/app-header-sticky.vue";
import useStore from '@/store';

const {category} = useStore()
category.getAllCategory()
</script>
<template>
  <app-topnav></app-topnav>
    <!-- 默认展示的导航 -->
  <app-header></app-header>

    <!-- 滚动78px展示的 -->
  <app-header-sticky></app-header-sticky>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <app-footer></app-footer>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
