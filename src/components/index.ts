// 注册全局组件和全局指令
import type {App} from "vue"
import XtxSkelecton from "./skeleton/index.vue"
import XtxCarousel from "./carousel/index.vue"
import XtxMore from "./more/index.vue"
import XtxCity from "./city/index.vue"
import XtxNumbox from "./numbox/index.vue"
import XtxButton from "./button/index.vue"
import Bread from "./bread/index.vue"
import BreadItem from "./bread/item.vue"
import {useIntersectionObserver} from "@vueuse/core"
import DefaultImg from "@/assets/images/200.png"

export default {
    install(Vue: App) {
        Vue.component("XtxSkeleton", XtxSkelecton)
        Vue.component("XtxCarousel", XtxCarousel)
        Vue.component("XtxMore", XtxMore)
        Vue.component("XtxCity", XtxCity)
        Vue.component("XtxBread", Bread)
        Vue.component("XtxBreadItem", BreadItem)
        Vue.component("XtxNumbox", XtxNumbox)
        Vue.component("XtxButton", XtxButton)

        //     全局指令
        //   懒加载图片 <img v-lazy="imgUrl" alt="">
        Vue.directive("lazy", {
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
            },
        })
    },
}
