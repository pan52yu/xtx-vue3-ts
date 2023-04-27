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
    <home-hot></home-hot>
    <!--  热门品牌  -->
    <home-brand></home-brand>
    <!--  商品区域  -->
    <home-product></home-product>
    <!-- 最新专题 -->
    <home-special></home-special>
  </div>
</template>

<script lang="ts" setup name="Home">
import HomeBanner from './components/home-banner.vue';
import HomeCategory from './components/home-category.vue';
import HomeNew from "@/views/home/components/home-new.vue";
import HomeHot from "@/views/home/components/home-hot.vue";
import HomeBrand from "@/views/home/components/home-brand.vue";
import HomeProduct from "@/views/home/components/home-product.vue";
import HomeSpecial from "@/views/home/components/home-special.vue";
</script>

<style></style>