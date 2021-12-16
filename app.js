// 1. Creating a new express application
// 2. Creating a new route
// 3. Starting an HTTP server on a given port number
// 4. Handling a request once it comes in

const exp = require('express') // 載入 express 套件
const mongoose = require('mongoose')
const eh = require('express-handlebars') // 為什麼不需要 const xx = express-handlebars() ? 像 express 一樣
const app = exp() // 把載入的 express 套件在執行後，存成一個名為 app 的變數  express() function is a top-level function exported by the express module.en
const port = 3000
const Schema = mongoose.Schema // Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const db = mongoose.connection // 取得連線狀態
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Todo = require('./models/todo') // 載入 Todo model
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列 「撈資料以後想用 res.render()，要先用 .lean() 來處理」
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板 {todos: todos}
    .catch(error => console.error(error)) // 錯誤處理
})

// 設定連線到 mongoose database
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
app.engine('hbs', eh.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 on 註冊事件監聽器，監聽 error 事件有沒有發生，語法:「只要有觸發 error 就印出 error 訊息」。
db.on('error', () => {
  console.log('mongodb error!')
})

// 對「連線成功」的 open 情況，註冊事件監聽器，相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，由 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器。
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  console.log(`express:${express}`,`express():${express()}`,`mongoose: ${mongoose}`)
  res.render('index')
})

app.listen(port)

// express: function createApplication() {
//   var app = function (req, res, next) {
//     app.handle(req, res, next);
//   };

//   mixin(app, EventEmitter.prototype, false);
//   mixin(app, proto, false);

//   // expose the prototype that will get set on requests
//   app.request = Object.create(req, {
//     app: { configurable: true, enumerable: true, writable: true, value: app }
//   })

//   // expose the prototype that will get set on responses
//   app.response = Object.create(res, {
//     app: { configurable: true, enumerable: true, writable: true, value: app }
//   })

//   app.init();
//   return app;
// } 

// express(): function(req, res, next) {
//   app.handle(req, res, next);
// } 

// mongoose: [object Object]

