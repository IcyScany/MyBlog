<template>
  <navigator></navigator>
  <div class="about-content shadow">
    <div class="about-button">
      <h2 class="beactived" @click="toPage('/about')" >关于本站</h2>
      <h2 @click="toPage('/scany')">关于我</h2>
    </div>
    <!-- 一、网站构建 -->
    <h3>网站构建</h3>
    <p>
      <b>前端<br></b>&emsp;&emsp;本站的前端部分使用Vue3框架构建，构建时使用到较为快捷轻量的Vite脚手架，
      vue-router模块用于实现网站的路由构建及跳转。另外，网页的部分组件使用了Naive-ui提供的组件，
      前端调用后端接口使用到axios模块以实现文章及类别的增删改查功能。
    </p>

    <p>
      <b>后端<br></b>&emsp;&emsp;本站后端部分搭建使用Express框架，数据库使用MySql进行数据存储。上传文件功能使用multer到模块。<br><br>
      &emsp;&emsp;后端接口搭建了:<br>
      &emsp;&emsp;&emsp;1.后台登录操作的接口，可根据管理员的账号密码进行登录操作；<br>
      &emsp;&emsp;&emsp;2.文件上传接口，可由前端上传富文本及图片及视频文件；<br>
      &emsp;&emsp;&emsp;3.文章操作接口，可用于文章的增删改及模糊查询;<br>
      &emsp;&emsp;&emsp;4.文章类别的对应接口，可通过前端查询相关类别的文章，且可通过后台管理系统对文章类别进行增删改查操作。
    </p>
    
    <!-- 二、网站内容 -->
    <h3>网站内容</h3>
    <p>
      &emsp;&emsp;本站为个人博客网站，在此网站记录个人的博客文章，包含学习过程中的相关文章及开发过程中遇到的问题等。（文章及类别仍在不断添加完善...）
    </p>
    
    <p>
      &emsp;&emsp;本站构建了<b>博客网页部分，</b><br>
      &emsp;&emsp;&emsp;1.博客文章的浏览，查看文章具体内容；<br>
      &emsp;&emsp;&emsp;2.提供博客的模糊查询功能，可通过文章标题，内容，分类查询相关文章；<br>
      &emsp;&emsp;&emsp;3.对博客文章的分类区查询。<br><br>
      
      &emsp;&emsp;及<b>后台管理部分</b>用于管理博客文章及相关内容操作。<br>
      &emsp;&emsp;&emsp;1.后台登录页面，验证身份进而对数据库操作；<br>
      &emsp;&emsp;&emsp;2.后台管理页面，便于管理博客文章及相关内容增删改查操作。<br>
    </p>

    <p>&emsp;&emsp;本站于2023年12月开始着手构建，博客文章目前较少，网站结构也尚较简单。但本站是由自己一手从零开始建立，
      建站过程中遇到过很多问题，不断查阅资料学习克服一个个难题，完善自身的意义要远大于网站本身。
    </p>
    <p>...</p>
  </div>
</template>

<script setup> 
import { onMounted, inject, ref, reactive } from 'vue';
import navigator from '../../components/Navigator.vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const toPage=(url)=>{
  router.push(url)
}

</script>


<style lang="scss" scoped>
.about-content{
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  opacity: 0.98;
  margin: 75px 10% 5% 10%;
  padding: 10px 55px;
  background-color: white;
  justify-content: center;

  .about-button{
    display: flex;

    h2{
      margin-right: 40px;
      cursor: pointer;
      color: gray;
    }
    .beactived{
      border-bottom: 2px solid black;
      color: black;
    }
  }

  p{
    margin-left: 10px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 500;
    font-size: 16px;
  }
}


</style>