<script lang="ts" name="AppHeader" setup>
//
import AppHeaderNav from "@/views/layout/components/app-header-nav.vue";
import AppHeaderCart from "@/views/layout/components/app-header-cart.vue";
</script>

<template>
    <header class="app-header">
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">小兔鲜</RouterLink>
            </h1>
            <!--      这一块导航效果，将来要做吸顶效果，所以要封装成小组件      -->
            <app-header-nav></app-header-nav>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input placeholder="搜一搜" type="text"/>
            </div>
            <!--      购物车      -->
            <app-header-cart></app-header-cart>
        </div>
    </header>
</template>

<style lang="less" scoped>
.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px /
        contain;
        }
    }


    .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 32px;

        .icon-search {
            font-size: 18px;
            margin-left: 5px;
        }

        input {
            width: 140px;
            padding-left: 5px;
            color: #666;
        }
    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: @helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>