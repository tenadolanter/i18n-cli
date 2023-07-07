<template>
  <Test originType="WORKSPACE" :goalItem="goalItem">
    <Test originType="WORKSPACE" :goalItem="goalItem" aibvTsts NameHdd></Test>
    <abcTest originType="WORKSPACE" :goalItem="goalItem"></abcTest>
    <Test
      originType="WORKSPACE"
      :goalItem="goalItem"
      aibvTsts
      NameHdd
    ></Test>
  </Test>
</template>

<script lang="js">
import Vue from "vue";
export default Vue.extend({
  components: {
    MemberList,
  },
  props: {
    goalItem: {
      type: Object,
      default: () => ({}),
    }
  }
})

</script>

<style lang="scss" scoped>
.wrap {
  color: #ff0000;
}
</style>
