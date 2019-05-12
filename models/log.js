var mongoose = require('mongoose')
var Schema = mongoose.Schema

var logSchema = new Schema({
  sensorId: String,
  type: String,
  value: Number,
  time: Number
})

module.exports = mongoose.model('log', logSchema)
