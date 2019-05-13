var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  position: String, // room's objectId
  type: {
    type: String,
    default: 'user'
  }
})

module.exports = mongoose.model('user', userSchema)
