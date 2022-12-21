const express = require('express')
const multer = require('multer')
const { db, doSQL } = require('./db/dbutils')
const path = require('path')
const { time } = require('console')
const app = express()
const port = 8000

// 跨域请求
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if(req.method == 'OPTIONS') res.sendStatus(200);
  else next()
})

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))       // 指定静态资源路径

// 登录验证
const ADMIN_TOKEN_PATH = '/_token'
app.all("*", async(req, res, next)=>{
  if(req.path.indexOf(ADMIN_TOKEN_PATH) > -1){
    let {token} = req.headers
    let admin_token_sql = 'select * from `admin` WHERE `token` = ?'
    let adminResult = await db.async.query(admin_token_sql, [token])
    if(adminResult.err != null || adminResult.rows.length == 0){
      res.send({
        code: 403,
        msg: "请先登录"
      })
      return;
    }else{
      next()
    }
  }else{
    next()
  }
})

app.get('/', (req, res) => {res.send('Welcome to My Blog!')}) // 首页接口
app.use(multer({dest:'./public/upload/temp'}).any())          // 上传文件接口
app.use('/admin', require('./routers/AdminRouter'))           // 登录接口
app.use('/category', require('./routers/CategoryRouter'))     // 类别接口
app.use('/blog', require('./routers/BlogRouter'))             // 上传博客接口
app.use('/upload', require('./routers/UploadRouter'))         // 图片上传接口

app.listen(port, ()=>{
  console.log(`listening on port ${port}...`);
})
