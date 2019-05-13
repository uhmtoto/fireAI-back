var express = require('express')
var router = express.Router()
var verifyPermission = require('../src/verify/permission')

router.get('/', (req, res) => {
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

module.exports = router
