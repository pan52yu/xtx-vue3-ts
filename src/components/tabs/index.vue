<script lang="tsx" setup>
import {provide, toRefs, useSlots, VNode} from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])


const clickFn = (item: VNode) => {
    console.log(item.props?.name)
    emit('update:modelValue', item.props?.name)
}
const slots = useSlots()
const Tabs = () => {
    const arr = (slots as any).default()
    const panes: any[] = []

    arr.forEach((item: any) => {
        // 处理基本的写法，直接内部写 XtxTabsPanel
        if (item.type.name === 'XtxTabsPane') {
            panes.push(item)
        } else {
            // 处理v-for的情况
            if (item.children) {
                // 一个节点 => 7个panel
                item.children.forEach((panel: any) => {
                    panes.push(panel)
                })
            }
        }
    })
    const navs = (
        <nav>
            {panes?.map((item) => {
                return (
                    <a
                        href="javascript:;"
                        class={{active: props.modelValue === item.props?.name}}
                        onClick={() => clickFn(item)}
                    >
                        {item.props?.label}
                    </a>
                )
            })}
        </nav>
    )
    return <div class="xtx-tabs">{[navs, panes]}</div>
}

const {modelValue} = toRefs(props);
provide("activeNameValue", modelValue);
</script>

<template>
    <Tabs></Tabs>
</template>

<style lang="less">
.xtx-tabs {
    background: #fff;

    > nav {
        height: 60px;
        line-height: 60px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        > a {
            width: 110px;
            border-right: 1px solid #f5f5f5;
            text-align: center;
            font-size: 16px;

            &.active {
                border-top: 2px solid @xtxColor;
                height: 60px;
                background: #fff;
                line-height: 56px;
            }
        }
    }
}
</style>
