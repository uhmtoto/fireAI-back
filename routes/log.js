var express = require('express')
var router = express.Router()
var Log = require('../models/log')
var Error = require('../models/error')
var verifyPermission = require('../src/verify/permission')

router.get('/type/:sensorType', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  Log.find({ type: req.params.sensorType }, (err, logs) => {
    if (err) res.status(500).json(Error('DB에 문제가 발생했습니다.'))
    res.json(logs)
  })
})

module.exports = router
