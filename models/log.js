var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sensorLogSchema = new Schema({
  sensorId: String,
  value: Number,
  time: Number
})

module.exports = mongoose.model('sensorLog', sensorLogSchema)
