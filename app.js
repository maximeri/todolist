// 1. Creating a new express application
// 2. Creating a new route
// 3. Starting an HTTP server on a given port number
// 4. Handling a request once it comes in

const exp = require('express') // 載入 express 套件
const mongoose = require('mongoose')
const app = exp() 
const bodyParser = require('body-parser')
const eh = require('express-handlebars') 
const methodOverride = require('method-override')
const port = 3000
const Schema = mongoose.Schema // Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const db = mongoose.connection // 取得連線狀態
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
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
db.on('error', () => {
  console.log('mongodb error!') // 用 on 註冊事件監聽器，監聽 error 事件有沒有發生，語法:「只要有觸發 error 就印出 error 訊息」。
})
db.once('open', () => {
  console.log('mongodb connected!')
})// 對「連線成功」的 open 情況，註冊事件監聽器，相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，由 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器。

app.use(methodOverride('_method'))

// routers
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序，如果要降冪 (descending) 排序，可以寫 'desc'
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo })) //到 .then() 拿到資料了，資料會被存在 todo 變數裡，傳給樣板引擎，請 Handlebars 幫忙組裝 detail 頁面。
    .catch((error) => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// const a = [1,2,3]
// const b = arr.map((item)=>item+1)
// [2,3,4]
// () => {
//   return 'abc';
// }

// () => {}
// a => {}
// (a,b) =>

app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' // === 運算子優先執行 所以 isDone === "on" 是true 才會帶入 todo.isDone
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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

