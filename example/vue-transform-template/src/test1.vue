<template>
  <!-- Splitter -->
  <component
    :class="[...layoutConfig.class]"
    :is="layoutConfig.component"
    :key="layoutConfig.id"
    :layout="layoutConfig.layout"
    @resizeend="onResizeendHandle"
    :style="[{ background: layoutConfig.background }]"
  >
    <template v-if="layoutConfig.children">
      <template v-for="(layoutChildrenItem, layoutChildrenItemIndex) in layoutConfig.children">
        <!-- SplitterPanel -->
        <component
          :is="layoutChildrenItem.component"
          :key="layoutChildrenItem.id"
          :size="layoutChildrenItem.size"
        >
          <!-- // 如果有孩子嵌套 -->
          <template v-if="layoutChildrenItem.children">
            <template v-for="layoutChildrenItem2 in layoutChildrenItem.children">
              <!-- Splitter -->
              <layout-component
                :config="layoutChildrenItem2"
                :size="layoutChildrenItem2.size"
                :key="layoutChildrenItem2.id"
              ></layout-component>
            </template>
          </template>
          <!-- //没孩子的话 -->
          <template v-else>
            <div
              class="LayoutComponentMain"
              style="width: 100%"
              :style="[{ background: `${layoutChildrenItem.background}` }]"
            >
              <Button
                :ref="`LayoutComponentMainBtn_${layoutChildrenItem.id}`"
                @click="
                  event => {
                    onCongigClick(event, layoutChildrenItem);
                  }
                "
                icon="pi pi-cog"
                class="LayoutComponentMain-configBtn p-button-rounded p-button-secondary"
              />
              <OverlayPanel
                appendTo="body"
                :ref="`LayoutComponentMainOp_${layoutChildrenItem.id}`"
                :key="layoutChildrenItem.id"
              >
                <div class="LayoutComponentMainOp_main">
                  <div style="margin-bottom: 10px">
                    <Button
                      :label="$t('shan-chu')"
                      @click="onDeleteHandle(layoutChildrenItemIndex)"
                      class="p-button-sm p-button-outlined p-button-secondary"
                    />
                  </div>
                  <div
                    style="font-weight: 600; margin-bottom: 5px"
                  >{{ $t("bei-jing-se") }}: {{ layoutChildrenItem.background }}</div>
                  <MColorPicker
                    v-model="layoutChildrenItem.background"
                    @on-change="MColorPickerChange"
                  ></MColorPicker>
                </div>
              </OverlayPanel>
              <EditorComponent
                class="codex-editor--narrow"
                ref="EditorComponent"
                style="padding: 10px"
                :dataId="layoutChildrenItem.id"
                :config.sync="layoutChildrenItem.config"
                :readOnly="readOnly"
                @on-change="
                  config => {
                    onEditorChange(layoutChildrenItem, config);
                  }
                "
                :componentType="componentType"
              ></EditorComponent>
            </div>
          </template>
        </component>
      </template>
    </template>
  </component>
</template>