const express = require('express')
const router = express.Router()
const User = require('../../models/user')


// login
router.get('/login', (req,res)=>{
  res.render('login')
})

router.post('/login', (req, res) => {
  res.render('login')
})

// register
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',(req,res)=>{
  const { name, email, password, confirmPassword} = req.body
  // 檢查使用者是否已經註冊
  User.findOne({email}).then(user=>{
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      }
      ).then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  // 如果已經註冊：退回原本畫面
  // 如果還沒註冊：寫入資料庫
})


module.exports = router