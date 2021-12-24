// 設定資料庫連線 & 載入 Todo model
const db = require('../../config/mongoose')
const Todo = require('../todo') // 載入 todo model

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' +i}) // model.create() 是 Mongoose 提供的資料操作方法
  }
  console.log('done')
})