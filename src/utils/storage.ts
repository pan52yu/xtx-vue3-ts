// 1. 设置个人信息
import {Profile} from "@/types/user";

const PROFILE_KEY = 'rabbit-profile'

export const setProfile = (profile: Profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

// 2. 获取个人信息
export const getProfile = (): Profile => {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
}

// 3. 清除个人信息
export const removeProfile = () => {
    localStorage.removeItem(PROFILE_KEY)
}