this.$confirm('节点配置校验失败~', '提示', {
  confirmButtonText: '确定',
  showCancelButton: false,
  type: 'warning',
});

const testFun = (text = "测试") => {
  console.log(text);
}