var express = require('express')
var router = express.Router()
var Log = require('../models/log')
var Sensor = require('../models/sensor')
var Error = require('../models/error')
var verifyPermission = require('../src/verify/permission')
var unixtime = require('unix-timestamp')

router.get('/fire', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  // logic
  res.json({
    fire: [
      // objectId of sensor which detected fire
    ],
    warning: [
      // objectId of sensor which detected warning of fire
    ]
  })
})

router.get('/temperature/time', async (req, res) => {
  if (verifyPermission(req, res, 0)) return
  await Log.find({ time: { $gt: unixtime.fromDate(new Date()) - 60 } }, (err, logs) => {
    if (err) res.status(500).json(Error('DB에 오류가 발생했습니다.'))
    logs = logs.filter(v => v.sensor.type === 'temperature')
    var logByFloor = [
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 1),
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 2),
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 3),
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 4)
    ]
    var time = logs.map(v => v.time).filter((v, i) => logs.map(v => v.time).indexOf(v) === i)
    var returnValue = []
    time.forEach((v, i) => {
      returnValue[i] = [
        logByFloor[0].filter(V => V.time === v).map(v => v.value).reduce((a, c) => a + c, 0) / logByFloor[0].filter(V => V.time === v).length,
        logByFloor[1].filter(V => V.time === v).map(v => v.value).reduce((a, c) => a + c, 0) / logByFloor[1].filter(V => V.time === v).length,
        logByFloor[2].filter(V => V.time === v).map(v => v.value).reduce((a, c) => a + c, 0) / logByFloor[2].filter(V => V.time === v).length,
        logByFloor[3].filter(V => V.time === v).map(v => v.value).reduce((a, c) => a + c, 0) / logByFloor[3].filter(V => V.time === v).length
      ]
    })
    res.json({
      time,
      temperature: returnValue
    })
  })
})

router.get('/temperature/floor', async (req, res) => {
  if (verifyPermission(req, res, 0)) return
  await Log.find({ time: { $gt: unixtime.fromDate(new Date()) - 60 } }, (err, logs) => {
    if (err) res.status(500).json(Error('DB에 오류가 발생했습니다.'))
    logs = logs.filter(v => v.sensor.type === 'temperature')
    var logByFloor = [
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 1).map(v => v.value),
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 2).map(v => v.value),
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 3).map(v => v.value),
      logs.filter(v => parseInt(v.sensor.room.roomNumber / 100) === 4).map(v => v.value)
    ]
    res.json([
      logByFloor[0].reduce((a, c) => a + c, 0) / logByFloor[0].length,
      logByFloor[1].reduce((a, c) => a + c, 0) / logByFloor[1].length,
      logByFloor[2].reduce((a, c) => a + c, 0) / logByFloor[2].length,
      logByFloor[3].reduce((a, c) => a + c, 0) / logByFloor[3].length
    ])
  })
})

router.get('/room/:roomNumber', (req, res) => {
  if (verifyPermission(req, res, 0)) return
  Log.find({}, (err, logs) => {
    logs = logs.reverse()
    if (err) return res.status(500).json(Error('DB에 오류가 발생했습니다.'))
    var temperatureLog = logs.find(v => {
      return v.sensor.room.roomNumber == req.params.roomNumber && v.sensor.type === 'temperature'
    })
    if (!temperatureLog) return res.status(404).json(Error('해당 호실을 찾을 수 없습니다.'))
    res.json({
      temperatureLog
    })
  })
})

module.exports = router
