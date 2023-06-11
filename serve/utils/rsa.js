const fs = require('fs')
const NodeRsa = require('node-rsa')
const { PUB_KEY_PATH, PRI_KEY_PATH } = require('../config/base.config')

/**
 * @function: encrypt
 * @description: rsa公钥加密
 * @param {String} plain 未加密的文本字符串
 * @return {String} 密文
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
 * @description: rsa私钥解密
 * @param {String} cipher 密文
 * @return {String} 解密后的文本字符串
 */
function decrypt(cipher) {
    const data = fs.readFileSync(PRI_KEY_PATH, 'utf8')
    const priKey = new NodeRsa(data, 'pkcs8-private', {
        encryptionScheme: 'pkcs1'
    })
    return priKey.decrypt(cipher, 'utf8')
}

module.exports = {
    encrypt,
    decrypt
}
