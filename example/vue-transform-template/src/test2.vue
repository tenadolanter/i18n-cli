<template>
  <div>
    <template v-if="!isEdit">
      <div
        @click="handlerEdit"
        class="description-text-wrap"
        :style="{ 'max-height': isExpand ? 'unset' : '60px' }"
      >
        <div
          class="description-placeholder"
          v-if="!description && !disabled"
        >{{ $t("add-workspace-description") }}</div>
        <div class="description-wrap" v-else v-html="descriptionHtml" ref="descContent"></div>
      </div>
      <div class="description-expander" v-if="shouldExpend" @click="isExpand = !isExpand">
        <template v-if="isExpand">
          <span>{{ $t("see-less") }}</span>
          <i class="er-icon-arrow-up-s-line"></i>
        </template>
        <template v-else>
          <span>{{ $t("see-more") }}</span>
          <i class="er-icon-arrow-down-s-line"></i>
        </template>
      </div>
    </template>
    <div v-else v-Clickoutside="handlerDescChange" class="description-edit-wrap">
      <textarea
        v-model="localDescription"
        class="description-input"
        @blur="handlerDescChange"
        ref="descriptionInput"
      ></textarea>
    </div>
  </div>
</template>