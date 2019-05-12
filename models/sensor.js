var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sensorSchema = new Schema({
  type: String,
  name: String,
  floor: Number,
  position: Number
})

module.exports = mongoose.model('sensor', sensorSchema)
