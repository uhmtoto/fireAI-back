var express = require('express')
var router = express.Router()
var sha512 = require('js-sha512')
var jwt = require('jsonwebtoken')
var Error = require('../models/error')
var User = require('../models/user')
var verifyEmpty = require('../src/verify/empty')

router.post('/login', (req, res) => {
  const formData = req.body
  if (verifyEmpty(res, formData, ['email', 'password'])) return

  const password = sha512(formData.password)
  User.findOne({ email: formData.email, password }, (err, user) => {
    if (err) return res.status(500).json(Error('DB에 오류가 발생했습니다.'))
    if (!user) return res.status(404).json(Error('이메일 또는 비밀번호를 확인해주세요.'))

    var userToken = jwt.sign(
      {
        email: user.email,
        name: user.name,
        permission: user.type
      },
      req.app.get('jwt-secret')
    )

    res.json({ token: userToken })
  })
})

router.post('/register', (req, res) => {
  const formData = req.body
  if (verifyEmpty(res, formData, ['email', 'name', 'type', 'password'])) return

  User.find({ email: formData.email }, (err, user) => {
    if (err) res.status(500).json(Error('DB에 오류가 발생했습니다.'))
    if (!user.length) {
      var newUser = new User()
      newUser = Object.assign(newUser, formData)
      newUser.password = sha512(newUser.password)
      newUser.save(err => {
        if (err) res.status(500).json(Error('DB에 오류가 발생했습니다'))
      })
    } else {
      res.status(409).json(Error('이미 동일한 이메일이 사용되고 있습니다.'))
    }
  })

  res.json({ success: true })
})

module.exports = router
