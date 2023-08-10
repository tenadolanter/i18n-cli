<template>
  <DashBoardCard
    noBorder
    noShadow
    :config="config"
    :hideSettingPop="false"
    :hideMoreBtn="false"
    :customBackgroundColor="true"
    @openSetting="doubleClick"
    v-bind="$attrs"
  >
    <template slot="body">
      <ChartsModel ref="ChartsModel" :config="config"></ChartsModel>
      <Dialog
        :visible.sync="showSettingDialog"
        :modal="true"
        appendTo="body"
        :contentStyle="{ width: '90vw', height: '80vh' }"
      >
        <template #header>
          <h1>图标设置</h1>
        </template>
        <div class="body">
          <ChartsSetting :config="config"></ChartsSetting>
        </div>
        <template #footer>
          <Button
            :label="$t('qu-xiao')"
            icon="pi pi-times"
            class="p-button-text"
            @click="closeDialog"
          />
          <Button :label="$t('que-ren')" icon="pi pi-check" autofocus @click="confirm" />
        </template>
      </Dialog>
    </template>
    <template slot="customBackgroundSlot">
      <BgSelect
        :colorConfig="bgColor"
        @selectColor="handleSubjectChange"
        :bgShow="true"
        @bgColor="handleBgChange"
      ></BgSelect>
    </template>
  </DashBoardCard>
</template>