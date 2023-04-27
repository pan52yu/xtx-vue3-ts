<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import {useRoute} from 'vue-router'
import {watchEffect} from "vue";

const {category} = useStore()
const route = useRoute()
watchEffect(() => {
    // 只在一级类目发请求
    if (route.fullPath === `/category/${route.params.id}`) {
        category.getTopCategory(route.params.id as string)
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
    </div>
  </div>
</template>
