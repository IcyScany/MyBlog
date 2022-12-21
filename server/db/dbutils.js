const mysql = require('mysql')
const GenId = require('../utils/SnowFlake')   // 雪花id算法生成唯一id

const genid = new GenId({ WorkerId: 1})

// 数据库
const db = mysql.createPool({
  host: '43.139.171.246',
  user: 'root',
  password: 'scany0605',
  database: 'My_Blog',
  port: '3306'
})

db.getConnection(err => {
  if(err) throw err;
  console.log('Database "My_Blog" Connected!');
})

// 数据库异步查询
db.async = {}
db.async.query = (sql,params) => {
  return new Promise((resolve, reject)=>{
    db.query(sql, params, (err, rows) =>{
      resolve({err, rows})
    })
  })
}

// 数据库操作函数doSQL
async function doSQL(sql, values){
  let { err, rows } = await db.async.query(sql, values)
  if (err) throw err;
  console.log(rows);
}


module.exports = {db, genid, doSQL}