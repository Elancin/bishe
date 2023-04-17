<template>
  <!-- 文章编辑 -->
  <el-form
    @submit.native.prevent="saveArticle"
    ref="form"
    :model="article"
    label-width="80px"
  >
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <mavon-editor 
      ref="md"
      :toolbars="markdownOption" 
      v-model="article.body" 
      @imgAdd="$imgAdd" 
      @imgDel="$imgDel" 
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      article: {
        title: '',
        body: ''
      },
      img_file: [],
    }
  },
  methods: {
    saveArticle () {
      this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res => {
        this.$message({
          message: '文章修改成功',
          type: 'success'
        })
        this.$router.push('/admin-article/index')
        console.log(res)
      })
    },
    fetch () {
      this.$http.get(`articles/${this.$route.params.id}`).then(res => {
        this.article = res.data
      })
    },
    cancel () {
      this.$router.push('/admin-article/index')
    },
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append('imgFile', $file)
      this.img_file[pos] = $file
      this.$http({
        url: '/upload_images',
        method: 'post',
        data: formdata
      }).then((res) => {
        const _res = res.data
        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style scoped>
</style>
