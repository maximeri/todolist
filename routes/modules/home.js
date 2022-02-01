// home 路由模組： routes/modules/home.js
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序，如果要降冪'desc'
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router