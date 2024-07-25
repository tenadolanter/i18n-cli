<template>
  <div class="empty-data">
    <div class="name">{{ name }}</div>
    <template>
      <div class="empty-image-wrap">
        <img class="empty-image" :src="emptyImage" />
      </div>
      <div class="empty-title">暂无数据</div>
    </template>
  </div>
</template>

<script lang="js">
import Vue from "vue";
export default Vue.extend({
  data(){
    return {
      name: "测试"
    }
  },
});
</script>