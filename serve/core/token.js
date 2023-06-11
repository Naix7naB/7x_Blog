const JWT = require('jsonwebtoken')
const { getPubKeySync, getPriKeySync } = require('./rsa')
const { SIGN_ALGO, EXP_IN } = require('../config/base.config')

/**
 * @function: generateToken
 * @description: 生成token令牌
 * @return {String} token
 */
function generateToken(payload, options = { algorithm: SIGN_ALGO, expiresIn: EXP_IN }) {
    const priKey = getPriKeySync()
    const token = JWT.sign(payload, priKey, options)
    console.log('------ Token生成成功 ------')
    return token
}

/**
 * @function: verifyToken
 * @description: 验证token
 * @param {String} token
 * @return {Object} payload
 */
function verifyToken(token) {
    const pubKey = getPubKeySync()
    return JWT.verify(token, pubKey, { algorithms: SIGN_ALGO })
}

module.exports = {
    generateToken,
    verifyToken
}
