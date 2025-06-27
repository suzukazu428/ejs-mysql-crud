const express = require('express')
const app = express()
const {router, connect} = require('./server/api')

app.use('/api', router)
connect()

// /のルーティング
app.get('/', (req, res) => {
  res.render('hello.ejs');
})

app.listen(3000, () => {
  console.log('ポート3000でlisten')
})
