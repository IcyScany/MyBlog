<template>
  <navigator />
  <div class="home-content">
    <!-- 左区域 文章展示 -->
    <div class="article-section" >
      <div class="article-card shadow" v-for="(blog, index) in Bloglist"  >
        <div class="article-img" :style="{ backgroundImage: `url(${blog.img_url})` }"></div>
        <div style="flex:1">
          <div class="article-title" @click="toDetail(blog)">{{ blog.title }}</div>
          <div class="article-type" @click="searchByCategory(blog.category_id)">{{ blog.type }}</div>
          <div class="article-content" v-html="blog.content"></div>
          <div class="article-info">
            <div class="iconfont icon-gerenzhongxin-wode-02"></div>Scany&emsp;&emsp;
            <div class="iconfont icon-shijian"></div >{{ blog.create_time }}
          </div>
          <hr>
        </div>
      </div>
      <n-pagination class="page-button" @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />
    </div>

    <!-- 右区域  个人信息 -->
    <div class="right-section">
      <div class="my-info shadow" id="in">
        <div class="info-card" style="background-color: #7bccc4;" @click="copy('scy_o_o'), handleUpdateShow()"><div class="iconfont icon-weixin">&emsp;scy_o_o</div></div>
        <div class="info-card" style="background-color: #2b8cbe;" @click="copy('1849398020'), handleUpdateShow()"><div class="iconfont icon-QQ">&emsp;1849398020</div ></div>
        <div class="info-card" style="background-color: #fbbf45;" @click="copy('1849398020@qq.com'), handleUpdateShow()"><div class="iconfont icon-youxiang">&emsp;1849398020@qq.com</div></div>
        <div class="info-card" style="background-color: #2c353e;" @click="copy('github.com/icyscany'), handleUpdateShow()"><div class="iconfont icon-github">&emsp;github.com/icyscany</div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue';
import navigator from '../../components/Navigator.vue'
import { useRouter, useRoute } from 'vue-router'
import useClipboard from 'vue-clipboard3'

// 路由
const router = useRouter()
const route = useRoute()

const axios = inject("axios")
const Bloglist = ref([])

const pageInfo = reactive({
  page: 1,
  pageSize: 8,
  pageCount: 0,
  count: 0,
  keyword: '',
  categoryId: 0
})

onMounted(() => {
  loadBlogs()
})


// 自动复制
const message = inject("message")
const {toClipboard} = useClipboard()
const copy = async (text)=>{
  await toClipboard(text)
  message.success('copied')
}


// 获取文章
const loadBlogs = async (page = 0) => {
  if (page != 0) {
    pageInfo.page = page;
  }
  let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
  Bloglist.value = res.data.data.rows
  // 处理获取的文章列表数据 把时间戳转换为年月日 获取文章封面 获取分类名称
  for (let row of Bloglist.value) {
    let d = new Date(row.create_time)
    row.create_time = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    let img_url = row.content.substring( row.content.indexOf("src=") + 5, row.content.indexOf(".png") + 4);
    row.img_url = img_url

    let res2 = await axios.get("/category/category_name?id="+row.category_id)
    row.type =  res2.data.rows[0].name

    row.content = row.content.substring(0, 100)
  }
  //计算分页大小
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}


// 文章详情页跳转
const toDetail = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } })
}


// 选中分类
const searchByCategory = async (categoryId) => {
  pageInfo.categoryId = categoryId;
  loadBlogs()
}
</script>


<style lang="scss" scoped>
.home-content {
  display: flex;
  margin: 75px 10% 8% 10%;

  .right-section {
    width: 280px;
    margin-left: 3%;

    .my-info {
      height: 340px;
      padding: 10px;
      border-radius: 6px;
      opacity: 0.96;
      background-color: white;

      .info-card{
        height: 60px;
        margin: 15px;
        color: white;
        border-radius: 8px;
        padding-left:15px;
        line-height: 60px;
        cursor: pointer;
      }
    }
  }
}

.article-content{
  p{
    img{
      height: 50px;
      width: 50px;
  }
  }

}

</style>