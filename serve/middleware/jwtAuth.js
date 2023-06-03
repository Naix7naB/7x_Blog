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
        path: [
            { url: /^\/admin\/.*$/, method: ['GET'] },
            { url: /^\/api\/article.*$/, method: ['GET'] },
            { url: /^\/api\/tag.*$/, method: ['GET'] },
            { url: /^\/api\/comment.*$/, method: ['GET'] },
            { url: /^\/api\/message.*$/, method: ['GET'] }
        ]
    })
}
