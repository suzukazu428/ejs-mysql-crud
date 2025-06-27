const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

// mysql接続情報
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

function connect() {
  // mysql接続とエラーログ表示処理
  connection.connect((err) => {
    if(err) {
      console.log('MySQL接続エラー: ' + err.stack)
      return;
    }
    console.log('MySQLconnect!')
  })
}


// データ一括表示
router.get('/select', (req, res, next) => {
  const sql = 'select * from todos'
  connection.query(sql, (err, results) => {
    if(err) {
      console.log('クエリ実行エラー', err)
      return;
    }
    console.log('select', results)
    // 以下、.queryの外に出したい処理だが非同期処理化が必要
    res.header('Content-Type', 'application/json; charset=utf-8')
    return res.status(200).json(results)
  })
})
// データ追加
router.post('/insert', (req, res, next) => {
  // insert into todos(id,title,content) values(int,string, string)
  const sql = 'insert into todos(id,title,content) values(7,"テスト7", "内容7")'
  connection.query(sql, (err, results) => {
    if(err) {
      console.log('クエリ実行エラー', err)
      return;
    }
    console.log('insert', results)
    return res.status(201).json(results)
  })
})
// データ更新
router.put('/update', (req, res, next) => {
// update todos set カラム = "内容" where id = 対象ID
  const sql = 'update todos set content = "内容更新7" where id = 7'
  connection.query(sql, (err, results) => {
    if(err) {
      console.log('クエリ実行エラー', err)
      return;
    }
    console.log('update', results)
    return res.status(200).json(results)
  })
})
// データ削除
router.delete('/delete', (req, res, next) => {
// delete from todos where id = 対象id
  const sql = 'delete from todos where id = 7 '
  connection.query(sql, (err, results) => {
    if(err) {
      console.log('クエリ実行エラー', err)
      return;
    }
    console.log('delete', results)
    return res.status(200).json(results)
  })
})
module.exports = {router, connect}