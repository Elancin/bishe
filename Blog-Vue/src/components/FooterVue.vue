<template>
  <!-- 页脚组件 -->
  <div>
    <div style="height: 60px"></div>
    <el-footer class="footer">
      <b>Elanck</b>
      <br />
      <div>
        <a class="beian" href="http://beian.miit.gov.cn/" target="_blank">蜀ICP备2022022550号-1</a>
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  created () {
  }

}
</script>

<style scoped lang="scss">
.footer {
  margin-top: 50px;
  padding-bottom: 10px;
  text-align: center;
  user-select: none;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 50px;
  z-index: 9999;
  .beian {
  text-decoration: none;
  color: var(--default-text-color);
}
}

</style>
