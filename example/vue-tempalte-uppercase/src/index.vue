<template>
  <div v-if="showAsideList" v-loading="asideLoading" class="aside-wrap">
    <div>测试</div>
    <Toolbar
      :showAutomationSelector="false"
      :runStatusList="runStatusList"
      :curDatetime.sync="curDatetime"
      :curStatus.sync="curStatus"
      isVertical
      class="toolbar"
      @action="handleToolbar"
    />
    <AsideList
      v-if="execLogList.length"
      :list="execLogList"
      :current.sync="currentLogRow"
      :pagination="pagination"
      @nextPage="getNextPage"
      @change="getDetail"
    />
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: `测试你好${name}`
    }
  },
}
</script>
