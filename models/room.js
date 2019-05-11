var mongoose = require('mongoose')
var Schema = mongoose.Schema

var roomSchema = new Schema({
  name: String,
  floor: Number,
  position: Number
})

module.exports = mongoose.model('room', roomSchema)
