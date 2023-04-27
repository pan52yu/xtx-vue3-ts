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
    </div>
  </div>
</template>

<style scoped lang="less"></style>