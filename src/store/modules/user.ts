import {defineStore} from "pinia";
import request from "@/utils/request";
import {ApiRes} from "@/types/data";
import {Profile} from "@/types/user";
import {getProfile, removeProfile, setProfile} from "@/utils/storage";
import useStore from "@/store";

export default defineStore('user', {
    state: () => ({
        // 个人信息
        profile: getProfile()
    }),
    actions: {
        //  用户名和密码登录
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password
            })
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        //  手机号验证码登录
        async mobileLogin(mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/code', {
                mobile,
                code
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        // 获取手机验证码
        async sendMobileMsg(mobile: string) {
            await request.get('/login/code', {
                params: {
                    mobile
                }
            })
        },
        // 退出登录
        logout() {
            this.profile = {} as Profile
            removeProfile()
            const {cart} = useStore()
            cart.clearCart()
        }
    }
})
