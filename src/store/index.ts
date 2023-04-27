import useCategoryStore from './modules/category'
import useHomeStore from './modules/home'
import useGoodStore from './modules/good'

const useStore = () => {
    return {
        category: useCategoryStore(),
        home: useHomeStore(),
        goods: useGoodStore()
    }
}

export default useStore