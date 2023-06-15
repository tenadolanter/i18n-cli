<template>
  <div class="wrap">
    <!-- i18n-disable -->
    <div>测试123</div>
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
      // i18n-disable
      default: "测试"
    }
  },
  data(){
    return {
      // i18n-disable
      name: "测试",
      text: "你好",
    }
  },
  methods: {
    handlerClick(){
      // i18n-disable
      this.text = "测试"
    },
    handlerHover(){
      this.name = "测试"
    },
  }
});
</script>

<style lang="scss" scoped>
.wrap {
  color: #ff0000;
}
</style>
