<template>
  <div>
    <BackTop></BackTop>
    <!-- 文章详情 -->
    <div class="progress-bar" v-progress></div>
    <!-- 标题 -->
    <div class="HeaderBaci">
      <h1>
        {{ body.title }}
        <p class="time">{{ body.time }}</p>
      </h1>
    </div>
    <!-- 内容 -->
    <div class="posts">
      <el-table  v-show="isShow" v-loading="isShow"  style="width: 100%"></el-table>
      <mavon-editor
        class="md"
        :ishljs="true"
        :value="body.body"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
      />
  </div>
  <!-- 发布评论 -->
      <el-form ref="form" :model="form"  class="comment ">
        <el-form-item class='flex1'>
          <el-input  clearable v-model="form.name" placeholder="用户名称" class='w50'></el-input>
          <el-input clearable v-model="form.email" placeholder="邮箱" class='w50'></el-input>
        </el-form-item>
          <el-form-item  >
            <el-input rows="4"  resize="none"  type="textarea"  maxlength="80"  v-model="form.text" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
        </el-form>
  <!--评论  -->
      <div class="commentsbody" v-for="m in hasComments" :key="m._id" > 
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="flex123">
            <img class="avatar" src="../assets/img/1000.jpg" />
            <span class='username'>{{ m.name }}</span>
            </span>
          <p class="time">{{ m.time }}</p>
        </div>
        <div class="text item">{{ m.text }}</div>
      </el-card>
    </div>

  </div>
</template>

<script>
import BackTop from '../components/BackTop'
export default {
  components: { BackTop },
  data () {
    return {
      id: '',
      body: {
        title: '',
        body: ''
      },
      form: {
        name: '',
        email: '',
        text: '',
        time: '',
        aid:'',
        atitle:''
      },
      comments: [],
      isShow: false,
    }
  },
  methods:{
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nowDate()
          this.aticleInfo()
          this.$http.post('comment/add', this.form).then(res => {
            this.findComment()
            this.form.text = ''
            console.log(this.form.atitle);//清空表单数据
          })
        }
      })
    },
    aticleInfo(){
      this.form.aid=this.$route.params.id
      this.form.atitle=this.body.title
    },
    nowDate () {
      this.form.time =this.dayjs().format('YYYY-MM-DD HH:mm')
    },
    findComment () {
      this.$http.get('comment/find').then(res => {
        this.comments=res.data
      })
    },
  },
  computed: {
    hasComments() {
    return this.comments.filter(comment => comment.aid === this.$route.params.id)
    },
    // md解析器配置
    prop () {
      const data = {
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    },
  },
  // 页面滚动进度条
  directives:{
    progress:{
    bind(el) {
    const progressBar = el;
    const scrollHandler = function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      progressBar.style.width = scrollPercent + "%";
    };
    window.addEventListener("scroll", scrollHandler);
  },
  unbind() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  },
  } ,

  created () {
    window.scrollTo(0, 0)
    this.$http.get(`/articles/${this.$route.params.id}`).then(res => {
      this.body = res.data
      this.isShow = false
    }).catch(err => {
      this.isShow = true
    })
    
  },
  mounted() {
    this.findComment()
  },
}
</script>

<style scoped lang="scss">
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #409eff;
  z-index: 9999;
  transition: width 0.2s ease-in-out;
}

.posts {
	margin: 20px auto;
	border-radius: 30px;
  max-width: 1200px;
  h4{
    margin-top: 30px;
  }
  .md{
    z-index: -1;
  }
}

.HeaderBaci {
	width: 100%;
	background-image: url("../assets/img/ArticleBaci2.jpeg");
	background-size: cover;
  h1{
  padding-top: 20%;
	padding-bottom: 20px;
	padding-left: 20%;
	text-align: left;
	color: #fff;
	font-size: 40px;
  }
  .time {
	font-size: 25px;
  }
}
.comment {
	border: 1px solid #bbb;
	padding: 10px ;
	border-radius: 5px;
	max-width: 800px;
	margin: 50px auto;
  .flex1{
  .w50{
    width: 50%;
  }
}
}

.commentsbody {
  text-align: left;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 30px;
  margin-bottom: -150px;
  width: 800px;
  height: 300px;
  .username{
    color: #777888;
  }
  .time {
    font-size: 15px;
    color: rgb(142, 141, 141);
    }
  .avatar {
    width: 50px;
    margin-right: 10px;
    border: 3 solid rgb(28, 216, 241);
    border-radius: 50px;
    }
    .clearfix{
      display: flex;
      justify-content: space-between;
      align-items: center
    }
    .flex123{
    display: flex;
    align-items: center;
    }
}
</style>

