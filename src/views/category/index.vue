<!-- 分类组件 -->
<template>
  <div class="category">
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem>美食</XtxBreadItem>
    </XtxBread>
    分类组件{{ route.params }}
  </div>
</template>

<script lang="ts" name="TopCategory" setup>
import {useRoute} from "vue-router";
import {watch} from "vue";

const route = useRoute()

watch(() => route.path, (val) => {
    console.log("🚀 ~ file:index line:13 >>>", val)
})
</script>

<style></style>