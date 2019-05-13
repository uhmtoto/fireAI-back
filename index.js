var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')

var authRouter = require('./routes/auth')
var roomRouter = require('./routes/room')
var sensorRouter = require('./routes/sensor')
var statusRouter = require('./routes/status')
var logRouter = require('./routes/log')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('/room', roomRouter)
app.use('/sensor', sensorRouter)
app.use('/status', statusRouter)
app.use('/log', logRouter)

app.set('jwt-secret', process.env.JWTSECRET)

mongoose.connect('mongodb://localhost/fireapi', {
  useNewUrlParser: true
})

app.listen(3000, () => {
  console.log('FireAPI Server is Running on Port 3000')
})
