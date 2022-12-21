const express = require('express')
const router = express.Router()
const {db, genid, doSQL} = require('../db/dbutils')

// 1.博客详情页
router.get('/detail', async(req, res, next)=>{
  let {id} = req.query
  let detail_sql = "SELECT * FROM `blog` WHERE `id` = ?"
  doSQL(detail_sql, [id])
  next()
})

// 2.添加博客
router.post('/_token/add', async(req, res, next)=>{
  let {title, category_id, content} = req.body
  let add_sql = 'INSERT INTO `blog`(`id`, `title`, `category_id`, `content`, `create_time`) VALUES (?, ?, ?, ?, ?)'
  let id = genid.NextId()
  let create_time = new Date().getTime()

  doSQL(add_sql, [id, title, category_id, content, create_time])
  next()
})

// 3.修改博客
router.put('/_token/update', async(req, res, next)=>{
  let {id, title, category_id, content} = req.body
  let update_sql = "UPDATE `blog` SET `title` = ?, `category_id` = ?, `content` = ? WHERE `id` = ?"

  doSQL(update_sql, [title, category_id, content, id])
  next()
})

// 4.删除博客
router.delete('/_token/delete', async(req, res, next)=>{
  let {id} = req.body
  let delete_sql = 'DELETE FROM `blog` WHERE `id` = ?'

  doSQL(delete_sql, [id])
  next()
})

// 5.查询博客
router.get('/search', async(req, res, next)=>{
  // 查询参数，关键字，分类号，页码，页面大小
  let {keyword, category_id, page, pageSize} = req.query

  page = page == null ? 1 : page
  pageSize = pageSize == null ? 10 : pageSize
  category_id = category_id == null ? 0 : category_id
  keyword = keyword == null ? "" : keyword

  let params = []
  let whereSqls = []
  if(category_id != 0){
    whereSqls.push(' `category_id` = ? ')
    params.push(category_id)
  }

  if(keyword != ''){
    // 标题及内容根据关键字进行LIKE模糊查询
    whereSqls.push(' (`title` LIKE ? OR substr(`content`, 1, 50) LIKE ?) ')
    params.push("%" + keyword + "%")  
    params.push("%" + keyword + "%")  
  }

  let whereSqlStr = ''
  if (whereSqls.length > 0){
    // JOIN 函数可将字符数组组合为字符串
    whereSqlStr = ' WHERE ' + whereSqls.join(' AND ')
  }

  // 查询分页数据
  let searchSql = 'SELECT * FROM `blog` ' + whereSqlStr + ' ORDER BY `create_time` DESC LIMIT ?, ?'
  let searchSqlParams = params.concat([(page - 1) * pageSize, 1 * pageSize])
  doSQL(searchSql, searchSqlParams)
  res.send(searchSql)

  // 查询数据总数
  let searchCountSql = ' SELECT count(*) AS `count` FROM `blog` ' + whereSqlStr
  let searchCountParams = params
  doSQL(searchCountSql, searchCountParams)

  next()
})


module.exports = router