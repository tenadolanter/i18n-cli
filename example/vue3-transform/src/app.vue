<template>
  <Test class="wrap" @click="log" v-tooltip="'你好'" text="测试">{{ isValidate ? '' : '测试' }}{{ "测试卷" }}</Test>
</template>

<script lang="ts" setup>
const msg = '你好!';
const isValidate = false;
function log() {
  console.log(msg)
}
</script>

<style lang="scss" scoped>
.wrap {
  color: #ff0000;
}
</style>
