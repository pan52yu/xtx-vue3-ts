import {defineStore} from "pinia";
import request from "@/utils/request";
import {ApiRes} from "@/types/data";
import {Profile} from "@/types/user";

export default defineStore('user', {
    state: () => ({
        // 个人信息
        profile: {} as Profile
    }),
    actions: {
        //  用户名和密码登录
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password
            })
            this.profile = res.data.result
        },
        // 获取手机验证码
        async sendMobileMsg(mobile: string) {
            await request.get('/login/code', {
                params: {
                    mobile
                }
            })
        }
        //  用户名验证码登录
    }
})
