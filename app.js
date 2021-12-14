const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Todo', todoSchema) // 匯出的時候我們把這份 schema 命名為 Todo，以後在其他的檔案直接使用 Todo 就可以操作和「待辦事項」有關的資料了！
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello')
})
// 設定連線到 mongoose database
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })  //mongoose.connect 是 Mongoose 提供方法 mongodb://[account]:[pw]@[mongodb location]:[port]/[database name]

// 取得連線狀態
// 在這裡用 on 註冊一個事件監聽器，用來監聽 error 事件有沒有發生，語法的意思是「只要有觸發 error 就印出 error 訊息」。
const db = mongoose.connect
db.on('error', () => {
  console.log('mongodb error!')
})

// 對「連線成功」的 open 情況，我們也註冊了一個事件監聽器，相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，由 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器。
db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port)