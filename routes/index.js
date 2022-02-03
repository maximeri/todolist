const express = require('express')
const router = express.Router()

const home = require('./modules/home') // 將網址結構符合 / 字串的 request 導向 home 模組 
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')   // 引用模組

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) //  我們需要把 router.use('/') 這種定義寬鬆的路由引到清單最下方，避免攔截到其他的路由。

module.exports = router