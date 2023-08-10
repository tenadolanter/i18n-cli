<script lang='ts'>
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
