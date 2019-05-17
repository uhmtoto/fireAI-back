var mongoose = require('mongoose')
var Schema = mongoose.Schema

var logSchema = new Schema({
  sensor: Object,
  value: Number,
  time: Number
})

module.exports = mongoose.model('log', logSchema)
