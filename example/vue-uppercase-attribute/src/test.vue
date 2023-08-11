<template>
  <div class="null-wrap">
    <NgForm label-position="top">
      <NgFormItem :label="$t('kong-zhi-ti-huan')">
        <div class="tips">将空数值项替换为提供的内容</div>
        <ng-input v-model="formValue.nullString" placeholder="请输入替换后的值" @change="handlerConfigChange"></ng-input>
      </NgFormItem>
    </NgForm>
  </div>
</template>