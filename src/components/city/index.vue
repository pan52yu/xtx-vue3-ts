<script lang="ts" setup name="XtxCity">
import { onMounted, ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"

// 城市列表类型
type AreaList = {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}
import axios from "axios"
// 控制弹层的显示隐藏
const active = ref(false)
const toggle = () => {
  active.value = !active.value
}
const target = ref(null)
onClickOutside(target, (e) => {
  // 当点击target元素的外面的时候，就会触发
  active.value = false
})

const cityList = ref<AreaList[]>([])
// 缓存的数据
const cacheList = ref<AreaList[]>([])

// 选择城市
const changeResult = ref({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
})

const getCityList = async () => {
  const res = await axios.get<AreaList[]>("https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json")
  cityList.value = res.data
  cacheList.value = res.data
}

const selectCity = (city: AreaList) => {
  if (city.level === 0) {
    // 省
    changeResult.value.provinceName = city.name
    changeResult.value.provinceCode = city.code
    cityList.value = city.areaList
  }
  if (city.level === 1) {
    // 市
    changeResult.value.cityName = city.name
    changeResult.value.cityCode = city.code
    cityList.value = city.areaList
  }
  if (city.level === 2) {
    // 县（区）
    changeResult.value.countyName = city.name
    changeResult.value.countyCode = city.code
    // 关闭弹窗
    active.value = false
  }
}
// 监听关闭弹窗的处理，恢复数据
watch(active, (value) => {
  // 当关闭active的时候，需要回复数据
  if (!value) {
    cityList.value = cacheList.value
  }
})
onMounted(() => {
  getCityList()
})
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: active }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span @click="selectCity(i)" class="ellipsis" v-for="i in cityList" :key="i.code">{{ i.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
