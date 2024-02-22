<template>
  <LrLayout class="dataset-wrap" contentPadding :hasLeftPart="false">
    <div>测试</div>
    <!-- dataset抽屉 -->
    <datasetDetailsDialog
      :visible.sync="datasetDrawerVisible"
      :before-close="handlerClose"
      :select-row="selectRow"
      :commandType="commandType"
      :datasetId="selectRow.id"
      @on-change-visible="onChangeDatasetDrawerVisible"
    ></datasetDetailsDialog>
  </LrLayout>
</template>


