<template>
  <div class="home-skeleton">
    <div
        class="item"
        v-for="i in 4"
        :key="i"
        :style="{ backgroundColor: '#f0f9f4' }"
    >
      <XtxSkeleton bg="#e4e4e4" :width="306" :height="306"/>
      <XtxSkeleton bg="#e4e4e4" :width="160" :height="24"/>
      <XtxSkeleton bg="#e4e4e4" :width="120" :height="24"/>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style scoped lang="less">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;

  .item {
    width: 306px;

    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>