<script lang="ts" setup name="SubCategory">
import {useRoute} from "vue-router";

const route = useRoute()
const { params } = route
console.log("🚀 ~ file:sub line:5 >>>", params)
</script>
<template>
    <div class="category">二级分类组件</div>
</template>

<style></style>
