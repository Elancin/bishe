<template>
  <!-- 留言管理页 -->
  <div>
    <el-table :data="users">
      <el-table-column prop="_id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="300"> </el-table-column>
      <el-table-column prop="password" label="密码" width="300"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button  type="text" size="big" @click=remove(scope.row._id)>删除用户</el-button>
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
    remove (id) {
      this.$http.delete(`users/${id}`).then(res => {
        this.$message({
          message: '用户删除成功',
          type: 'success'
        })
        this.findusers()
        console.log(res)
      })
    }
  },
  created() {
    this.findusers()
  },

}

</script>
<style>

</style>