// todo model  define schema (資料庫綱要)
const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
// 匯出這份 schema 命名為 Todo，以後在其他的檔案直接使用 Todo 就可以操作和「待辦事項」有關的資料了！
module.exports = mongoose.model('Todo', todoSchema)

