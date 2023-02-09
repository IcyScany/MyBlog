const express = require('express')
const router = express.Router()
const fs = require('fs')
const { db, genid, doSQL } = require('../db/dbutils')

router.post('/rich_editor_upload', async(req, res)=>{
  if (!req.files){
    res.send({
      "errno": 1,
      "message": "失败信息"
    })
    return
  }

  let files = req.files
  let ret_files = []

  for(let file of files){
    // 获取文件后缀
    let file_ext = file.originalname.substring(file.originalname.lastIndexOf('.')+1)
    // 随机文件名
    let file_name = genid.NextId() + "." + file_ext

    // 修改文件名并移动文件
    fs.renameSync(
      process.cwd() + '/public/upload/temp/' + file.filename,   // 修改前
      process.cwd() + '/public/upload/' + file_name             // 修改后并移动
    )
    // 图片文件的url
    ret_files.push('/upload/' + file_name)
  }

  res.send({
    "errno": 0,
    "data":{
      "url":ret_files[0]  // 图片src
    }
  })

})

module.exports = router