var mongoose = require('mongoose')
var Schema = mongoose.Schema

var logSchema = new Schema({
  sensor: String, // objectId of sensor
  type: String,
  value: Number,
  time: Number
})

module.exports = mongoose.model('log', logSchema)
