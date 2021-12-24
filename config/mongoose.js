const mongoose = require('mongoose')
// 設定連線到 mongoose database
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得連線狀態
db.on('error', () => {
  console.log('mongodb error!') // 用 on 註冊事件監聽器，監聽 error 事件有沒有發生，語法:「只要有觸發 error 就印出 error 訊息」。
}).once('open', () => {
  console.log('mongodb connected!')
})// 對「連線成功」的 open 情況，註冊事件監聽器，相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，由 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器。

module.exports = db