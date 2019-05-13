var express = require('express')
var router = express.Router()
var verifyPermission = require('../src/verify/permission')

router.get('/', (req, res) => {
  if (verifyPermission(req, res, 0)) return

  res.json({
    buildingName: '학봉관'
  })
})

module.exports = router
