<script lang="ts" name="Login" setup>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import {ref} from 'vue'
import LoginForm from "@/views/login/components/login-form.vue";

const activeName = ref<'account' | 'qrcode'>('account')
</script>
<template>
    <LoginHeader>欢迎登录</LoginHeader>
    <section class="login-section">
        <div class="wrapper">
            <nav>
                <a
                    :class="{ active: activeName === 'account' }"
                    href="javascript:;"
                    @click="activeName = 'account'"
                >
                    账户登录
                </a>
                <a
                    :class="{ active: activeName === 'qrcode' }"
                    href="javascript:;"
                    @click="activeName = 'qrcode'"
                >
                    扫码登录
                </a>
            </nav>

            <!-- 表单 -->
            <div v-if="activeName === 'account'" class="account-box">
                <login-form></login-form>
            </div>
            <!-- 二维码 -->
            <div v-else class="qrcode-box">
                <img alt="" src="@/assets/images/qrcode.jpg"/>
                <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
            </div>
        </div>
    </section>
    <LoginFooter/>
</template>

<style lang="less" scoped>
.login-section {
    background: url(@/assets/images/login-bg.png) no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        min-height: 400px;
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            height: 55px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;

                &:first-child {
                    border-right: 1px solid #f5f5f5;
                    text-align: left;
                }

                &.active {
                    color: @xtxColor;
                    font-weight: bold;
                }
            }
        }

        // 二维码容器
        .qrcode-box {
            text-align: center;
            padding-top: 40px;

            p {
                margin-top: 20px;

                a {
                    color: @xtxColor;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
