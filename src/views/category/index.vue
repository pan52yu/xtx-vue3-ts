<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import {useRoute} from 'vue-router'
import {watchEffect} from "vue";

const {
    category, home
} = useStore()
const route = useRoute()
watchEffect(() => {
    // 只在一级类目发请求
    if (route.fullPath === `/category/${route.params.id}`) {
        // 获取一级类目数据 渲染面包屑导航
        category.getTopCategory(route.params.id as string)
        // 这里应该获取轮播图数据 >>> 但是没接口，所以先用首页的轮播图数据代替
        home.getBannerList()
    }
})
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 渲染面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <xtx-carousel :slides="home.bannerList" autoplay style="height: 500px;"></xtx-carousel>
    </div>
  </div>
</template>
