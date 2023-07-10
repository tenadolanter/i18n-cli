<template>
  <div class="empty-data">
    <template>
      <div class="empty-image-wrap">
        <img class="empty-image" :src="emptyImage">
      </div>
      <div class="empty-title">暂无数据</div>
    </template>
  </div>
</template>

<script lang="js">
import Vue from "vue";
export default Vue.extend({
  components: {
    MemberList
  },
  props: {
    goalItem: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style lang="scss" scoped>
.wrap {
  color: #ff0000;
}
</style>
