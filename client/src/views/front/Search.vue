<template>
  <navigator></navigator>
  <div class="search-content shadow">
    <!-- 搜索框 -->
    <div class="search-box" style="display:flex;">
      <n-space class="search">
      <n-input v-model:value="pageInfo.keyword" :style="{ width: '800px' }" placeholder="请输入关键字" />
      <n-button type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
      </n-space>
    </div>
    <div style="margin-top: 15px; ">搜索关于 <b style="text-decoration:underline;">{{ pageInfo.keyword }}</b> 的相关内容</div>
  </div>
  
  <!-- 文章展示 -->
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
</template>

<script setup>
import { onMounted, inject, ref, reactive } from 'vue';
import navigator from '../../components/Navigator.vue';
import { useRouter, useRoute } from 'vue-router'

// 路由
const router = useRouter()
const route = useRoute()

const axios = inject("axios")

const Bloglist = ref([])
const category = ref([])

onMounted(()=>{
  loadBlogs()
})

const pageInfo = reactive({
  page: 1,
  pageSize: 8,
  pageCount: 0,
  count: 0,
  keyword: '',
  categoryId: 0
})

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

    row.content = row.content.substring(0, 120)
  }
  //计算分页大小
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}

// 文章详情页跳转
const toDetail = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } })
}

</script>

<style lang="scss" scoped>
.article-section {
  flex: 1;
  margin: -30px 10% 8% 10%;
}

.search-content{
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  opacity: 0.95;
  margin: 75px 10% 5% 10%;
  padding: 40px;
  background-color: rgb(247, 247, 247);
  justify-content: center;
  align-items: center;
}
</style>