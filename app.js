const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const db = mongoose.connection // 取得連線狀態

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
// 匯出這份 schema 命名為 Todo，以後在其他的檔案直接使用 Todo 就可以操作和「待辦事項」有關的資料了！
module.exports = mongoose.model('Todo', todoSchema) 
// 設定連線到 mongoose database
//mongoose.connect 是 Mongoose 提供方法 mongodb://[account]:[pw]@[mongodb location]:[port]/[database name]
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })  


// 用 on 註冊事件監聽器，監聽 error 事件有沒有發生，語法:「只要有觸發 error 就印出 error 訊息」。
db.on('error', () => {
  console.log('mongodb error!')
})

// 對「連線成功」的 open 情況，註冊事件監聽器，相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，由 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器。
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port)