const express = require('express')
const router = express.Router()
const {v4: uuidv4} = require('uuid')
const {db, genid} = require('../db/dbutils')

router.post('/login', async (req, res)=>{
  let { account, password } = req.body
  let { err, rows } = await db.async.query('select * from `admin` where `account` = ? AND `password` = ?', [account, password])

  if(err == null && rows.length >0){
    // 更新登录token值
    let login_token = uuidv4();
    let update_token_sql = "UPDATE `admin` SET `token` = ? where `id` = ?" 
    await db.async.query(update_token_sql, [login_token, rows[0].id])

    // 向前端传回值，并将密码置空
    let admin_info = rows[0]
    admin_info.token = login_token
    admin_info.password = ''

    res.send({
      code: 200,
      msg: '登录成功',
      data: admin_info
    })
  }else{
    res.send({
      code: 500,
      msg: "登录失败",
    })
  }

})

module.exports = router