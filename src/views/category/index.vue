<!-- 分类组件 -->
<template>
    <div class="category">分类组件{{ route.params }}</div>
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