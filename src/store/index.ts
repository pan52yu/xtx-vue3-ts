import useCategoryStore from './modules/category'
import useHomeStore from './modules/home'
import useGoodStore from './modules/good'
import useUserStore from './modules/user'
import useCartStore from "./modules/cart";

const useStore = () => {
    return {
        category: useCategoryStore(),
        home: useHomeStore(),
        goods: useGoodStore(),
        user: useUserStore(),
        cart: useCartStore()
    }
}

export default useStore