// 1. Creating a new express application
// 2. Creating a new route
// 3. Starting an HTTP server on a given port number
// 4. Handling a request once it comes in

const exp = require('express') // 載入 express 套件
const app = exp() 
const bodyParser = require('body-parser')
const eh = require('express-handlebars') 
const methodOverride = require('method-override')
const port = process.env.port || 3000
const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const routes = require('./routes')
// config/mongoose.js
// 如果在 Heroku 環境則使用 process.env.MONGODB_URI
// 否則為本地環境，使用 mongodb://localhost/todo-list
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

require('./config/mongoose') // 對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
app.engine('hbs', eh.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method'))
app.use(routes)
app.listen(port,()=>{
  console.log(`App is running on http://localhost:${port}`)
})

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

