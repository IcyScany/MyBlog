<template>
  <div class="header" :class="{ 'hide-nav': hide }">
    <!-- 1 图标 -->
    <div class="my-icon" @click="toPage('/')">Scany's Blog</div>

    <!-- 2 导航 -->
    <div class="nav">
      <div class="nav-button" v-for="(item, index) in nav_content" :class="uid === item.url ? 'isActived' : ''"
        @click="toPage(item.url)">
        {{ item.name }}
      </div>
    </div>

    <!-- 3 搜索框 -->
    <!-- <div class="search-box" style="display:flex;">
      <n-space>
        <n-input v-model:value="keyword" type="text" placeholder="搜索" />
        <n-button type="primary" ghost @click="show"> 搜索 </n-button>
      </n-space>
    </div> -->

    <!-- 4 信息 -->
    <div class="about-me" @click="toPage('/scany')">
      <img src="" alt="">
      <div>Scany</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

onMounted(() => {
  // 监听滚动条位置
  window.addEventListener('scroll', scrollTop, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => { })
})

const router = useRouter()
const nav_content = [
  { name: '首页', url: '/' },
  { name: '分类', url: '/type' },
  { name: '搜索', url: '/search' },
  // { name: '留言', url: '' },
  { name: '关于', url: '/about' },
  { name: '后台', url: '/login' },
]

const toPage = (url) => {
  // console.log(uid.value);
  router.push(url)
}
const uid = ref('')
onMounted(() => {
  uid.value = router.currentRoute.value.fullPath
})

const hide = ref(false)
const h = ref(0)
// 实时滚动条高度
const scrollTop = () => {
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;
  // 设置定时器，实现防抖优化
  setTimeout(() => {
    let newscroll = document.documentElement.scrollTop || document.body.scrollTop;
    h.value = newscroll - scroll
  }, 200)
  // 向上滚动时显示导航栏，反之隐藏
  if (h.value < 0 || scroll === 0) {
    hide.value = false
  } else {
    hide.value = true
  }
}

</script>


<style lang="scss" scoped>
.header {
  top: 0;
  width: 100%;
  height: 61px;
  padding: 0 10%;
  z-index: 10;
  display: flex;
  opacity: 0.98;
  position: fixed;
  align-items: center;
  transition: all 0.5s ease;
  font-size: 18px;
  // color: white;
  background-color: #ffffff;
  justify-content: space-between;
}

.hide-nav {
  top: -60px;
}

.my-icon {
  cursor: pointer;
  font: italic bold 22px TencentSansW7CN;
}

.nav {
  margin-left: -23%;
  display: flex;
  // font-family:Georgia, 'Times New Roman', Times, serif;
  font-weight: 500;

  .nav-button {
    padding: 16px 31px;
    transition: all 0.5s ease;

    &:hover {
      cursor: pointer;
      color: #2980b9;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 0px 5px, rgba(0, 0, 0, 0.23) 0px 0px 5px;
    }
  }
}

.about-me {
  display: flex;
  font-weight: 700;
  cursor: pointer;
}

.isActived {
  color: #34495e;
  font-weight: 800;
  background-color: #ecf0f1;
}
</style>