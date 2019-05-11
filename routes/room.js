var express = require('express')
var router = express.Router()
var Room = require('../models/room')
var Error = require('../models/error')
var verifyPermission = require('../src/verify/permission')
var verifyEmpty = require('../src/verify/empty')

router.get('/', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  Room.find({}, (err, rooms) => {
    if (err) return res.status(500).json(Error('DB에 에러가 발생했습니다.'))
    res.json(rooms)
  })
})

router.post('/', (req, res) => {
  const formData = req.body
  if (verifyPermission(req, res, 2)) return
  if (verifyEmpty(res, formData, ['name', 'floor', 'position'])) return

  var newRoom = new Room()
  newRoom = Object.assign(newRoom, formData)
  newRoom.save(err => {
    if (err) return res.status(500).json(Error('DB에 오류가 발생했습니다'))
  })

  res.json({ success: true })
})

module.exports = router
