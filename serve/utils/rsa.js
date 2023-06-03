const fs = require('fs')
const JWT = require('jsonwebtoken')
const NodeRsa = require('node-rsa')
const { PUB_KEY_PATH, PRI_KEY_PATH, SIGN_ALGO, EXP_IN } = require('../config/base.config')

/**
 * @function: encrypt
 * @param {String} plain 未加密的文本字符串
 * @return {String} 密文
 * @description: rsa公钥加密
 */
function encrypt(plain) {
    const data = fs.readFileSync(PUB_KEY_PATH, 'utf8')
    const pubKey = new NodeRsa(data, 'pkcs8-public', {
        encryptionScheme: 'pkcs1'
    })
    return pubKey.encrypt(plain, 'base64')
}

/**
 * @function: decrypt
 * @param {String} cipher 密文
 * @return {String} 解密后的文本字符串
 * @description: rsa私钥解密
 */
function decrypt(cipher) {
    const data = fs.readFileSync(PRI_KEY_PATH, 'utf8')
    const priKey = new NodeRsa(data, 'pkcs8-private', {
        encryptionScheme: 'pkcs1'
    })
    return priKey.decrypt(cipher, 'utf8')
}

/**
 * @function: generateKeys
 * @return {Object} 密钥对 { PubKey, priKey }
 * @description: 生成密钥对
 */
function generateKeys() {
    const key = new NodeRsa({ b: 512 })
    key.setOptions({ encryptionScheme: 'pkcs1' })
    const pubKey = key.exportKey('pkcs8-public')
    const priKey = key.exportKey('pkcs8-private')
    fs.writeFileSync(PUB_KEY_PATH, pubKey)
    fs.writeFileSync(PRI_KEY_PATH, priKey)
    console.log('------ 密钥生成成功 ------')
    return { pubKey, priKey }
}

/**
 * @function: generateToken
 * @return {String} token
 * @description: 生成token
 */
function generateToken(payload, options = { algorithm: SIGN_ALGO, expiresIn: EXP_IN }) {
    const priKey = fs.readFileSync(PRI_KEY_PATH, 'utf8')
    const token = JWT.sign(payload, priKey, options)
    console.log('------ Token生成成功 ------')
    return token
}

module.exports = {
    encrypt,
    decrypt,
    generateKeys,
    generateToken
}
