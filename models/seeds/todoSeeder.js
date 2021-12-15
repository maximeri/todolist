// 設定資料庫連線 & 載入 Todo model
const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' +i}) // Todo.create() 是 Mongoose 提供的資料操作方法
  }
  console.log('done')
})