<script lang="ts" name="LoginForm" setup>
import {ref, watch} from "vue";
import Message from "@/components/message";
import useStore from "@/store";
import {useRouter} from "vue-router";
import {useField, useForm} from 'vee-validate'
import {useCountDown} from "@/utils/hooks";

const router = useRouter()
const type = ref<'account' | 'mobile'>('account')

const form = ref({
    account: 'demo',
    password: 'hm#qd@23!',
    isAgree: false,
})

const {user} = useStore()

// 添加校验
const {validate, resetForm} = useForm({
    validationSchema: {
        account(value: string) {
            if (!value) return '请输入用户名'
            // if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
            return true
        },
        password: (value: string) => {
            if (!value) return '请输入密码'
            // if (!/^\w{6,12}$/.test(value)) return '密码必须是6-24位字符'
            return true
        },
        isAgree: (value: boolean) => {
            if (!value) return '请同意隐私条款'
            return true
        },
        mobile: (value: string) => {
            if (!value) return '请输入手机号'
            if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
            return true
        },
        code: (value: string) => {
            if (!value) return '请输入验证码'
            if (!/^\d{6}$/.test(value)) return '验证码格式错误'
            return true
        },
    },
    initialValues: {
        mobile: '13666666666',
        code: '123456',
        account: 'demo',
        password: 'hm#qd@23!',
        isAgree: true
    }
})

// value用于双向绑定，errorMessage用于错误提示
const {value: account, errorMessage: accountError} = useField<string>('account')
const {value: password, errorMessage: passwordError} = useField<string>('password')
const {value: isAgree, errorMessage: isAgreeError} = useField<boolean>('isAgree')
const {value: mobile, errorMessage: mobileError, validate: validateMobile,} = useField<string>('mobile')
const {value: code, errorMessage: codeError} = useField<string>('code')

// 监听type的变化
watch(type, () => {
    // 重置表单
    resetForm()
})

// 登录
const login = async () => {
    const res = await validate()
    if (type.value === 'account') {
        // 账号密码登录
        if (res.errors.account || res.errors.password || res.errors.isAgree) return
        await user.login(form.value.account, form.value.password)
    } else {
        // 手机号登录
        if (res.errors.mobile || res.errors.code || res.errors.isAgree) return
        await user.mobileLogin(mobile.value, code.value)
    }
    Message.success('登录成功')
    await router.push("/")
}

const mobileRef = ref<HTMLInputElement | null>(null)

const {time, start} = useCountDown(60)

const send = async () => {
    if (time.value > 0) return
    // 单独校验手机号
    const res = await validateMobile()
    if (!res.valid) {
        // 如果没通过，自动获取手机号的焦点
        mobileRef.value!.focus()
        return
    }
    await user.sendMobileMsg(mobile.value)
    Message.success('获取验证码成功')
    start()
}
</script>
<template>
    <div class="account-box">
        <div class="toggle">
            <a v-if="type === 'mobile'" href="javascript:;" @click="type = 'account'">
                <i class="iconfont icon-user"></i> 使用账号登录
            </a>
            <a v-else href="javascript:;" @click="type = 'mobile'">
                <i class="iconfont icon-msg"></i> 使用短信登录
            </a>
        </div>
        <div class="form">
            <template v-if="type === 'account'">
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input v-model="account" placeholder="请输入用户名或手机号" type="text"/>
                    </div>
                    <div v-if="accountError" class="error"><i class="iconfont icon-warning"/>{{ accountError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-lock"></i>
                        <input v-model="password" placeholder="请输入密码" type="password"/>
                    </div>
                    <div v-if="passwordError" class="error">
                        <i class="iconfont icon-warning"/>{{ passwordError }}
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input ref="mobileRef" v-model="mobile" placeholder="请输入手机号" type="text"/>
                    </div>
                    <div v-if="mobileError" class="error">
                        <i class="iconfont icon-warning"/>{{ mobileError }}
                    </div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-code"></i>
                        <input v-model="code" placeholder="请输入验证码" type="password"/>
                        <span class="code" @click="send">
                            {{ time === 0 ? '发送验证码' : `${time}s后发送` }}
                        </span>
                    </div>
                    <div v-if="codeError" class="error">
                        <i class="iconfont icon-warning"/>{{ codeError }}
                    </div>
                </div>
            </template>
            <div class="form-item">
                <div class="agree">
                    <xtx-checkbox v-model="isAgree"></xtx-checkbox>
                    <span>我已同意</span>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
                </div>
                <div v-if="isAgreeError" class="error">
                    <i class="iconfont icon-warning"/>{{ isAgreeError }}
                </div>
            </div>
            <a class="btn" href="javascript:;" @click="login">登录</a>
        </div>
        <div class="action">
            <img
                alt=""
                src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
            />
            <div class="url">
                <a href="javascript:;">忘记密码</a>
                <a href="javascript:;">免费注册</a>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
// 账号容器
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: @xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 40px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                > i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: @priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: @xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            > .error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: @priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: @xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            cursor: pointer;
        }

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>
