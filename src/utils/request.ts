import axios, {AxiosError} from 'axios'
import Message from "@/components/message";
import useStore from "@/store";

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    // baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
    baseURL,
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const {user} = useStore()
        if (user.profile.token) {
            config.headers.Authorization = `Bearer ${user.profile.token}`
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error: AxiosError<{ message: string; code: string }>) {
        // 对响应错误做点什么
        if (!error.response) {
            Message.error('网络异常，请稍后重置')
        } else {
            Message.error(error.response.data.message)
        }
        return Promise.reject(error)
    }
)

export default instance