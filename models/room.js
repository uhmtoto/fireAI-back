var mongoose = require('mongoose')
var Schema = mongoose.Schema

var roomSchema = new Schema({
  name: String,
  roomNumber: Number
})

module.exports = mongoose.model('room', roomSchema)
