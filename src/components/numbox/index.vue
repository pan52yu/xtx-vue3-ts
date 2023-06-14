<script lang="ts" name="XtxNumbox" setup>
import {ComponentInternalInstance, getCurrentInstance} from "vue";

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1,
    },
    min: {
        type: Number,
        default: 1,
    },
    max: {
        type: Number,
        default: 20,
    },
    showLabel: {
        type: Boolean,
        default: false,
    },
})
const {proxy} = getCurrentInstance()! as ComponentInternalInstance

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const add = () => {
    if (props.modelValue >= props.max) return
    emit('update:modelValue', props.modelValue + 1)
}

const sub = () => {
    if (props.modelValue <= props.min) return
    emit('update:modelValue', props.modelValue - 1)
}

const handleChange = (e: Event) => {
    // 通过类型断言 e.target 为 HTMLInputElement
    const target = e.target as HTMLInputElement
    let value = +target.value
    if (isNaN(value)) value = 1
    if (value <= props.min) value = props.min
    if (value >= props.max) value = props.max
    emit('update:modelValue', value)
    proxy.$forceUpdate()
}
</script>
<template>
    <div class="xtx-numbox">
        <div v-if="showLabel" class="label">
            <slot>数量</slot>
        </div>
        <div class="numbox">
            <a href="javascript:;" @click="sub">-</a>
            <input :value="modelValue" type="text" @change="handleChange($event)"/>
            <a href="javascript:;" @click="add">+</a>
        </div>
    </div>
</template>

<style lang="less" scoped>
.xtx-numbox {
    display: flex;
    align-items: center;

    .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
    }

    .numbox {
        width: 120px;
        height: 30px;
        border: 1px solid #e4e4e4;
        display: flex;

        > a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;

            &:first-of-type {
                border-right: 1px solid #e4e4e4;
            }

            &:last-of-type {
                border-left: 1px solid #e4e4e4;
            }
        }

        > input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
        }
    }
}
</style>