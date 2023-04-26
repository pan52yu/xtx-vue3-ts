import {ApiRes, BannerItem, GoodItem} from '@/types/data'
import request from '@/utils/request'
import {defineStore} from 'pinia'


export default defineStore('home', {
    state: () => ({
        bannerList: [] as BannerItem[],
        newGoodList: [] as GoodItem[],
    }),
    actions: {
        async getBannerList() {
            const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
            this.bannerList = res.data.result
        },
        async getNewList() {
            const res = await request.get<ApiRes<GoodItem[]>>('/home/new')
            this.newGoodList = res.data.result
        }
    },
})