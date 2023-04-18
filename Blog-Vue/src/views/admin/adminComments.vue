<template>
  <!-- 留言管理页 -->
  <div>
    <el-table :data="comment">
      <el-table-column prop="name" label="用户名" width="200"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
      <el-table-column prop="text" label="内容" width="300"> </el-table-column>
      <el-table-column prop="atitle" label="属于" width="300"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template  slot-scope="scope">
          <el-button @click="remove(scope.row._id)" type="text" size="big">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comment: []
    }
  },
  methods: {
    fetch () {
      this.$http.get('comment/find').then(res => {
        this.comment = res.data
      })
    },
    remove(id){
            this.$http.delete(`comment/del/${id}`).then(res => {
        this.$message({
          message: '评论删除成功',
          type: 'success'
        })
        this.fetch()
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style>

</style>
