var mongoose = require('mongoose')
var Schema = mongoose.Schema

var roomSchema = new Schema({
  number: Number
})

module.exports = mongoose.model('room', roomSchema)
