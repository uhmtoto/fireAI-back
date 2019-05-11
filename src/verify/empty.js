var Error = require('../../models/error')

module.exports = (res, formData, keys) => {
  var invalidKeys = keys.filter(v => !formData[v])
  if (invalidKeys.length) {
    return res.status(400).json(Error('누락된 정보가 있습니다.'))
  }
}
