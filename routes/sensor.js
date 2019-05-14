var express = require('express')
var router = express.Router()
var Sensor = require('../models/sensor')
var Log = require('../models/log')
var verifyPermission = require('../src/verify/permission')
var verifyEmpty = require('../src/verify/empty')

router.get('/', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  Sensor.find({}, (err, sensors) => {
    if (err) return res.status(500).json(Error('DB에 에러가 발생했습니다.'))
    res.json(sensors)
  })
})

router.get('/:sensorId', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  Sensor.findById(req.params.sensorId, (err, sensor) => {
    if (err) return res.status(500).json(Error('DB에 에러가 발생했습니다.'))
    res.json(sensor)
  })
})

router.post('/', (req, res) => {
  const formData = req.body
  if (verifyPermission(req, res, 2)) return
  if (verifyEmpty(res, formData, ['room', 'type', 'name'])) return

  var newSensor = new Sensor()
  newSensor = Object.assign(newSensor, formData)
  newSensor.save(async err => {
    if (err) await res.status(500).json(Error('DB에 오류가 발생했습니다.'))
  })
  res.json({ success: true })
})

module.exports = router
