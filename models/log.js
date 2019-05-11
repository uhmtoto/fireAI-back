var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sensorLogSchema = new Schema({
  sensorIdx: Number,
  type: String,
  value: Number
})

module.exports = mongoose.model('sensorLog', sensorLogSchema)
