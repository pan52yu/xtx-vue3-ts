<script lang="ts" setup name="SubCategory">
import useStore from '@/store'
import {watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import {storeToRefs} from "pinia";

const route = useRoute()
const {category} = useStore()
watchEffect(() => {
    const id = route.params.id as string
    if (id && route.fullPath === `/category/sub/${id}`) {
        category.getSubFilter(id)
    }
})
const {subCategory} = storeToRefs(category)
</script>
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${subCategory.parentId}`">
          {{ subCategory.parentName }}
        </XtxBreadItem>
        <XtxBreadItem>{{ subCategory.name }}</XtxBreadItem>
      </XtxBread>

      <!-- 筛选区 -->
      <div class="sub-filter">
        <div class="item">
          <!-- 品牌独立渲染 -->
          <div class="head">品牌：</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a
                href="javascript:;"
                v-for="item in subCategory.brands"
                :key="item.id"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
        <div
            class="item"
            v-for="item in subCategory.saleProperties"
            :key="item.id"
        >
          <div class="head">{{ item.name }}：</div>
          <div class="body">
            <a href="javascript:;">全部</a>
            <a
                href="javascript:;"
                v-for="sub in item.properties"
                :key="sub.id"
            >{{ sub.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>