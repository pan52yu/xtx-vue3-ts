<template>
  <div class="page-home">
    <!--  首页轮播区域  -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory/>
        <!-- banner轮播图 -->
        <HomeBanner/>
      </div>
    </div>
    <!--  新鲜好物  -->
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/"></XtxMore>
      </template>
      新鲜好物 品质生活
    </home-panel>
    <!--  人气推荐  -->

    <!--  热门品牌  -->

    <!--  居家  -->
  </div>
</template>

<script lang="ts" setup name="Home">
import HomeBanner from './components/home-banner.vue';
import HomeCategory from './components/home-category.vue';
import HomePanel from "@/views/home/components/home-panel.vue";
</script>

<style></style>