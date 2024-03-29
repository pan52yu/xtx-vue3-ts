<script lang="ts" setup name="HomeBrand">
import HomePanel from './home-panel.vue'
import useStore from "@/store";
import {useLazyData} from "@/utils/hooks";
import HomeSkeleton from "@/views/home/components/home-skeleton.vue";
import {computed, ref} from "vue";

const {home} = useStore()

const target = useLazyData(() => {
    home.getBrandList()
})

// 当前显示的索引
const index = ref(0)
// 上一页
const prev = () => {
    if (index.value > 0) {
        index.value--
    }
}
// 下一页
const next = () => {
    if (index.value < maxIndex.value) {
        index.value++
    }
}
// 最大索引
const maxIndex = computed(() => {
    return Math.ceil(home.brandList.length / 5) - 1
})
</script>

<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev" :class="{disabled: index === 0}" @click="prev"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next" @click="next"
         :class="{disabled: index === maxIndex}"></a>
    </template>
    <div class="box" ref="box">
      <transition name="fade">
        <ul class="list" v-if="home.brandList.length > 0" :style="{transform: `translateX(${-index * 1240}px)`}">
          <li v-for="i in home.brandList" :key="i.id">
            <RouterLink to="/">
              <img
                  v-lazy="i.picture"
                  alt=""
              />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated
              bg="#e4e4e4"
              :width="240"
              :height="305"
          />
        </div>
      </transition>
    </div>
  </HomePanel>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>