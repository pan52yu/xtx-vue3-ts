<script lang="ts" setup name="TopCategory">
import useStore from '@/store'
import {useRoute} from 'vue-router'
import {watchEffect} from "vue";
import {storeToRefs} from "pinia";

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
const {topCategory} = storeToRefs(category)
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 渲染面包屑导航 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <xtx-carousel :slides="home.bannerList" autoplay style="height: 500px;"></xtx-carousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <a href="javascript:;">
              <img
                  v-lazy="i.picture">
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>