// 自定义一些通用的compositions api
import {useIntersectionObserver} from '@vueuse/core'
import {ref} from 'vue'

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
        }
    )
    return target
}