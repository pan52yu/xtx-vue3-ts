import {h, render} from 'vue'
import XtxConfirm from './confirm.vue'

type Props = {
    text: string
    title?: string
}

const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)
export default function Confirm({text, title}: Props) {
    return new Promise((resolve, reject) => {
        const confirmCallback = () => {
            resolve('confirm')
            render(null, div)
        }
        const cancelCallback = () => {
            reject('cancel')
            render(null, div)
        }
        const vNode = h(XtxConfirm, {text, title, confirmCallback, cancelCallback})
        render(vNode, div)
    })
}
