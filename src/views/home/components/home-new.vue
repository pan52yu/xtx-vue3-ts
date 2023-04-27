<!--新鲜好物主体内容-->
<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from "@/store";
import {useLazyData} from "@/utils/hooks";
import HomeSkeleton from "@/views/home/components/home-skeleton.vue";

const {home} = useStore()

const target = useLazyData(() => {
    home.getNewList()
})

</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/"/>
      </template>
      <!-- 面板内容 -->
      <transition name="fade">
        <ul class="goods-list" v-if="home.newGoodList.length > 0">
          <li v-for="item in home.newGoodList" :key="item.id">
            <RouterLink to="/">
              <img
                  v-lazy="item.picture"
                  alt=""
              />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <home-skeleton v-else></home-skeleton>
      </transition>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
      .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}

</style>