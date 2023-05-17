const { expressjwt: jwt } = require('express-jwt')

const { getPubKeySync } = require('../core/rsa')
const { algorithm } = require('../config/base.config')

module.exports = () => {
  return jwt({
    secret: getPubKeySync(),
    algorithms: [algorithm],
    requestProperty: 'auth',
    credentialsRequired: true
  }).unless({
    path: [/^\/admin\/.*$/, /^\/api\/.*$/]
  })
}
