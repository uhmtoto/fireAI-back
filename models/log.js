var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sensorLogSchema = new Schema({
  sensorId: String,
  type: String,
  value: Number,
  time: Date
})

module.exports = mongoose.model('sensorLog', sensorLogSchema)
