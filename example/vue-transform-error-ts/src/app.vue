<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      FormulaConfig: <any>[],
    };
  },
  computed: {
    refNodeData: {
      get() {
        return this.nodeData;
      },
      set(value: any) {
        this.$emit("on-change", value);
      },
    },
  },
});
</script>
