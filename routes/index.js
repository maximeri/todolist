const { Router } = require('express')
const express = require('express')
const router = express.Router()
const home = require('./modules/home') // 將網址結構符合 / 字串的 request 導向 home 模組 
const todos = require('./modules/todos')
const users = require('./modules/users')

router.use('/',home)
router.use('/todos',todos)
router.use('/users', users)

module.exports = router