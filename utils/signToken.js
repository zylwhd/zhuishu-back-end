const jwt = require('jsonwebtoken')

module.exports = function (data, exp) {
  exp = exp || Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7) // 七天过期时间
  return jwt.sign({
    data: data,
    exp
  }, 'zylon')
}