<script lang="ts" name="LoginForm" setup>
import {ref} from "vue";
import Message from "@/components/message";

const type = ref<'account' | 'mobile'>('account')

const isAgree = ref(false)

const login = () => {
    Message.success('登录成功')
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
                        <input placeholder="请输入用户名或手机号" type="text"/>
                    </div>
                    <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-lock"></i>
                        <input placeholder="请输入密码" type="password"/>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input placeholder="请输入手机号" type="text"/>
                    </div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-code"></i>
                        <input placeholder="请输入验证码" type="password"/>
                        <span class="code">发送验证码</span>
                    </div>
                </div>
            </template>
            <div class="form-item">
                <div class="agree">
                    <xtx-checkbox v-model="isAgree"><span>我已同意</span></xtx-checkbox>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
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
