// 注册全局组件和全局指令
import type {App} from 'vue'
import XtxSkelecton from './skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'
import {useIntersectionObserver} from "@vueuse/core";
import DefaultImg from '@/assets/images/200.png'

export default {
    install(app: App) {
        app.component('XtxSkelecton', XtxSkelecton)
        app.component('XtxCarousel', XtxCarousel)
        app.component('XtxMore', XtxMore)

        //     全局指令
        //   懒加载图片 <img v-lazy="imgUrl" alt="">
        app.directive("lazy", {
            mounted(el: HTMLImageElement, binding: any) {
                const {stop} = useIntersectionObserver(el, ([{isIntersecting}]) => {
                    if (isIntersecting) {
                        stop()
                        el.src = binding.value
                        //     如果图片加载失败，就显示默认图片
                        el.onerror = () => {
                            el.src = DefaultImg
                        }
                    }
                })
            }
        })
    },
}