<template>
  <div class="wrap">
    <div class="1"></div>
           <abcTest originType="WORKSPACE"></abcTest>
         <div class="2"></div>
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
