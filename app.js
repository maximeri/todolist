const exp = require('express') // 載入 express 套件
const session = require('express-session')
const eh = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')
const app = exp()
const PORT = process.env.PORT || 3000

require('./config/mongoose') // 對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
app.engine('hbs', eh.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

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

