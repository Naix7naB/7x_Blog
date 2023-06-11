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
 * @return {String} token
 */
function verifyToken(token, callback) {
    const pubKey = getPubKeySync()
    JWT.verify(token, pubKey, callback)
}

module.exports = {
    generateToken,
    verifyToken
}
