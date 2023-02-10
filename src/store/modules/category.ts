import {ApiRes, CategoryItem} from '@/types/data'
import request from '@/utils/request'
import {defineStore} from 'pinia'

import {topCategory} from '../constants'

const defaultCategory = topCategory.map(item => {
    return {
        name: item
    }
})
export default defineStore('category', {
    state: () => ({
        list: defaultCategory as CategoryItem[],
    }),
    actions: {
        async getAllCategory() {
            const res = await request.get<ApiRes<CategoryItem[]>>(
                '/home/category/head'
            )
            this.list = res.data.result
        },
    },
})