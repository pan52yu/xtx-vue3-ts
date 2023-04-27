// 自定义一些通用的compositions api
import {useIntersectionObserver} from '@vueuse/core'
import {onBeforeUnmount, onMounted, ref} from 'vue'

/**
 * @description: 封装通用的数据懒加载api
 * @param apiFn 传入的api函数
 * @return: 返回一个ref对象，通过ref对象可以获得组件实例
 * */
export function useLazyData(apiFn: () => void) {
    // 通过 ref 获得组件实例
    const target = ref(null)
    const {stop} = useIntersectionObserver(
        // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
        target,
        // isIntersecting 是否进入可视区域，true是进入 false是移出
        // observerElement 被观察的dom
        ([{isIntersecting}]) => {
            // 在此处可根据isIntersecting来判断，然后做业务
            if (isIntersecting) {
                stop()
                apiFn()
            }
        },
        {
            // threshold 容器和可视区交叉的占比（进入的面积/容器完整面积） 取值，0-1 之间，
            // 默认比0大，所以需要滚动较多才能触发进入可视区域事件。  阈值   (进入的面积/容器完整面积)
            threshold: 0
        }
    )
    return target
}

/**
 * @description: 封装通用的滚动条api
 * @return: 返回滚动条的距离
 */
export function useScrollY() {
    const y = ref(0)
    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        y.value = scrollTop
    }

    // 监听滚动条的滚动 获取滚动的距离 大于等于78 就设置78类
    onMounted(() => {
        window.addEventListener('scroll', onScroll)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll)
    })
    return y
}