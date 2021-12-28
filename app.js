// 1. Creating a new express application
// 2. Creating a new route
// 3. Starting an HTTP server on a given port number
// 4. Handling a request once it comes in

const exp = require('express') // 載入 express 套件
const bodyParser = require('body-parser')
const eh = require('express-handlebars')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
const routes = require('./routes')
require('./config/mongoose') 
const app = exp()

require('./config/mongoose') // 對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
app.engine('hbs', eh.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method'))
app.use(routes)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
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

