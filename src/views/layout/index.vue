<script lang="ts" setup name="Layout">
import AppTopnav from "@/views/layout/components/app-topnav.vue";
import AppHeader from "@/views/layout/components/app-header.vue";
import AppFooter from "@/views/layout/components/app-footer.vue";
</script>
<template>
    <app-topnav></app-topnav>
    <app-header></app-header>
    <div style="min-height: 600px">
        <router-view></router-view>
    </div>
    <app-footer></app-footer>
</template>

<style lang="less" scoped></style>