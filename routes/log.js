var express = require('express')
var router = express.Router()
var Log = require('../models/log')
var Error = require('../models/error')
var verifyPermission = require('../src/verify/permission')
var verifyEmpty = require('../src/verify/empty')

router.get('/', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  Log.find({}, (err, logs) => {
    if (err) return res.status(500).json(Error('DB에 에러가 발생했습니다.'))
    res.json(logs)
  })
})

router.post('/', async (req, res) => {
  if (verifyPermission(req, res, 3)) return
  if (verifyEmpty(res, req.body, ['logs'])) return
  var logs = req.body.logs

  logs.forEach(v => {
    var newLog = new Log()
    newLog = Object.assign(newLog, v)
    await newLog.save(err => {
      if (err) return res.status(500).json(Error('DB에 에러가 발생했습니다.'))
    })
    res.json({ success: true })
  })
})

router.get('/type/:sensorType', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  Log.find({ type: req.params.sensorType }, (err, logs) => {
    if (err) res.status(500).json(Error('DB에 문제가 발생했습니다.'))
    res.json(logs)
  })
})

module.exports = router
