const { expressjwt: jwt } = require('express-jwt')
const { SIGN_ALGO } = require('../config/base.config')
const { getPubKeySync } = require('../core/rsa')

module.exports = () => {
    return jwt({
        secret: getPubKeySync(),
        algorithms: [SIGN_ALGO],
        requestProperty: 'auth',
        credentialsRequired: true
    }).unless({
        path: [
            { url: /^\/admin\/.*$/, method: ['GET'] },
            { url: /^\/api\/.*$/, method: ['GET'] }
        ]
    })
}
