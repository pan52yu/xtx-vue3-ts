<script lang="ts" name="XtxCheckbox" setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'change', value: boolean): void
}>()

const change = () => {
    emit('update:modelValue', !props.modelValue)
    emit('change', !props.modelValue)
}
</script>

<template>
    <div class="xtx-checkbox" @click="change">
        <i v-if="modelValue" class="iconfont icon-checked"></i>
        <i v-else class="iconfont icon-unchecked"></i>
        <span><slot></slot></span>
    </div>
</template>

<style lang="less" scoped>
.xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
        color: @xtxColor;

        ~ span {
            color: @xtxColor;
        }
    }

    i {
        position: relative;
        top: 1px;
    }

    span {
        margin-left: 2px;
    }
}
</style>
