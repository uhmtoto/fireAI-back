var jwt = require('jsonwebtoken')
var Error = require('../../models/error')

module.exports = (req, res, permission) => {
  var token = req.headers['authorization']
  if (!token) return res.status(403).json(Error('인증 헤더가 누락되었습니다.'))

  jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
    if (err) return res.status(500).json(Error('토큰에 문제가 있습니다.'))
    if (decoded.permission < permission) return res.status(403).json(Error('권한이 없습니다.'))
  })
}
