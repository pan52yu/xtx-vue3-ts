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
    <home-new></home-new>
    <!--  人气推荐  -->

    <!--  热门品牌  -->

    <!--  居家  -->
  </div>
</template>

<script lang="ts" setup name="Home">
import HomeBanner from './components/home-banner.vue';
import HomeCategory from './components/home-category.vue';
import HomeNew from "@/views/home/components/home-new.vue";
</script>

<style></style>