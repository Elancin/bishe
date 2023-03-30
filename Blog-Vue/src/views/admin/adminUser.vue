<template>
  <!-- 留言管理页 -->
  <div>
    <el-table :data="users">
      <el-table-column prop="_id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="300"> </el-table-column>
      <el-table-column prop="password" label="密码" width="300"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template >
          <el-button  type="text" size="big" @click='open'>修改密码</el-button>
          <el-button  type="text" size="big">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    findusers() {
      this.$http.get("users").then((res) => {
        this.users = res.data;
      });
    },
          open() {
        this.$prompt('新的密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '密码修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
  },
  created() {
    this.findusers()
  },

}

</script>
<style>

</style>