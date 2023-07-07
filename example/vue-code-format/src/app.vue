<template>
  <Test originType="WORKSPACE" :goalItem="goalItem">
    <div
      class="list-item-wrap"
      @click="handlerNavigate(item)"
      v-for="item in recentList"
      :key="item.id"
    ></div>
  </Test>
</template>

<script lang="js">
import Vue from "vue";
export default Vue.extend({
  components: {
    MemberList,
  },
  props: {
    workspaceId: {
      type: String,
      required: true,
    }
  },
})

</script>

<style lang="scss" scoped>
.wrap {
  color: #ff0000;
}
</style>
