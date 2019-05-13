var express = require('express')
var router = express.Router()
var Log = require('../models/log')
var Error = require('../models/error')

router.get('/type/:sensorType', (req, res) => {
  Log.find({}, (err, logs) => {
    if (err) res.status(500).json(Error('DB에 문제가 발생했습니다.'))
    res.json(logs.map)
  })
})

module.exports = router
