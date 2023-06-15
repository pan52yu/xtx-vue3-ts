<script lang="ts" name="XtxTabsPane" setup>
import {inject} from "vue";

defineProps<{
    label?: string
    name?: string
}>()
const activeNameValue = inject("activeNameValue");
</script>

<template>
    <div v-show="activeNameValue === name" class="xtx-tabs-panel">
        <slot></slot>
    </div>
</template>
