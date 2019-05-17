var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sensorSchema = new Schema({
  room: Object,
  type: String,
  name: String
})

module.exports = mongoose.model('sensor', sensorSchema)
