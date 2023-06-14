import {h, render} from 'vue'
import XtxMessage from './message.vue'

type Props = {
    type: 'success' | 'error' | 'warning'
    text: string,
    duration?: number
}

// 1.创建一个div
const div = document.createElement('div')
// 2.添加class
div.setAttribute('class', 'xtx-message-container')
// 3.添加到body中
document.body.appendChild(div)

// 4.创建一个函数
function Message({type, text, duration = 2000}: Props) {
    // (1) 创建虚拟节点
    const vNode = h(XtxMessage, {type, text})
    // (2) 渲染虚拟节点
    render(vNode, div)
    // (3) 卸载虚拟节点
    setTimeout(() => {
        render(null, div)
    }, duration)
}

// 5.添加静态方法
Message.success = function (text: string, duration?: number) {
    Message({type: 'success', text, duration})
}

Message.error = function (text: string, duration?: number) {
    Message({type: 'error', text, duration})
}

Message.warning = function (text: string, duration?: number) {
    Message({type: 'warning', text, duration})
}

export default Message