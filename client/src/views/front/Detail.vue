<template>
  <navigator/>
  <div class="container">
    <n-button @click="back">返回</n-button>
    <n-h1>{{ blogInfo.title }}</n-h1>
    <h3>分类： {{ blogInfo.type }}</h3>
    <div class="blog-content"><div v-html="blogInfo.content"></div></div>

  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import navigator from '../../components/Navigator.vue';

const router = useRouter()
const route = useRoute()
const blogInfo = ref({})
const axios = inject("axios")

onMounted(() => {
  loadBlog()
})

// 文章详情
const loadBlog = async () => {
  let res = await axios.get("/blog/detail?id=" + route.query.id)
  blogInfo.value = res.data.rows[0];
  console.log(blogInfo.value.content);

  let res2 = await axios.get("/category/category_name?id="+blogInfo.value.category_id)
  blogInfo.value.type =  res2.data.rows[0].name
}

const back = () => {
  // router.push("/")
  router.back()
}

</script>

<style>
.blog-content img {
  max-width: 100% !important;
}
</style>

<style lang="scss" scoped>
.container {
  width: 1200px;
  // height: 720px;
  margin: 75px 10% 5% 10%;
  padding: 40px;
  background-color: white;
  border-radius: 5px;
}
</style>