<template>
  <navigator></navigator>
  <div class="type-content shadow">
    <!-- 展示分类 -->
    <div v-for="(item, index) in category" @click="searchByCategory(item.value), onclick(index)" :class="isactive == index ? 'addclass' : 'type-label'">
      {{ item.label }}
    </div>
  </div>
  
  <!-- 分类文章 -->
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
  loadCategorys()
  loadBlogs()
})

const pageInfo = reactive({
  page: 1,
  pageSize: 8,
  pageCount: 0,
  count: 0,
  keyword: '',
  categoryId: 388417193734213
})

const isactive = ref(0)
const onclick = (index) =>{
  isactive.value = index
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

    row.content = row.content.substring(0, 120)
  }
  //计算分页大小
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
}

// 获取分类列表
const loadCategorys = async () => {
  let res = await axios.get("/category/list")
  category.value = res.data.rows.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
  console.log(category.value)
}

// 选中分类
const searchByCategory = async (categoryId) => {
  pageInfo.categoryId = categoryId;
  loadBlogs()
}

// 文章详情页跳转
const toDetail = (blog) => {
  router.push({ path: "/detail", query: { id: blog.id } })
}
</script>

<style lang="scss" scoped>
.type-content{
  display: flex;
  border-radius: 6px;
  opacity: 0.98;
  margin: 75px 10% 5% 10%;
  padding: 35px;
  background-color: white;
  justify-content: center;
  align-items: center;

    .type-label{
    padding: 10px;
    margin: 10px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    background-color: #ea7a6e;

    &:hover {
      cursor: pointer;
      background-color: rgb(255, 159, 148);
      box-shadow: rgba(0, 0, 0, 0.19) 1px 1px 1px, rgba(0, 0, 0, 0.23) 1px 1px 1px;
    }
  }
}

.addclass{
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  color: white;
  background-color: #2980b9;
}

.article-section {
  flex: 1;
  margin: -35px 10% 5% 10%;
}

</style>