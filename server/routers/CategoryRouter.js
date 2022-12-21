const express = require('express')
const router = express.Router()
const {db, genid, doSQL} = require('../db/dbutils')

// 1.列表接口
router.get('/list', async(req, res, next)=>{
  const list_sql = 'select * from `category`'
  doSQL(list_sql, [])
  next()
})

// 2.添加接口
router.post('/add', async(req, res, next)=>{
  let {name} = req.body
  const inser_sql = 'INSERT INTO `category` (`id`, `name`) VALUES (?, ?)'
  doSQL(inser_sql, [genid.NextId(), name])
  next()    // 没有返回值则继续下一步，否则不会进行下一步，重要步骤
})

// 3.修改接口
router.put('/update', async(req, res, next)=>{
  let { id, name } = req.body
  const update_sql = 'UPDATE `category` SET `name` = ? where `id` = ?'
  doSQL(update_sql, [name, id])
  next()
})

// 4.删除接口
router.delete('/delete', async(req, res, next)=>{
  let {id} = req.body
  const delete_sql = 'delete from `category` where `id` = ?'
  doSQL(delete_sql, [id])
  next()
})

module.exports = router