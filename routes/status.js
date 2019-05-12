var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
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
