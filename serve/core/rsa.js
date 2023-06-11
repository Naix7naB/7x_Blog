const fs = require('fs')
const NodeRsa = require('node-rsa')
const { PUB_KEY_PATH, PRI_KEY_PATH } = require('../config/base.config')

/**
 * @function: getPubKey
 * @return {Promise} 公钥字符串
 * @description: 获取公钥 异步方法
 */
function getPubKey() {
    return new Promise((resolve, reject) => {
        fs.readFile(PUB_KEY_PATH, 'utf8', (err, data) => {
            let key = data
            if (err) {
                console.error(err)
                key = generateKeys().pubKey
            }
            resolve(key)
        })
    })
}

/**
 * @function: getPriKey
 * @return {Promise} 私钥字符串
 * @description: 获取私钥 异步方法
 */
function getPriKey() {
    return new Promise((resolve, reject) => {
        fs.readFile(PRI_KEY_PATH, 'utf8', (err, data) => {
            let key = data
            if (err) {
                console.error(err)
                key = generateKeys().priKey
            }
            resolve(key)
        })
    })
}

/**
 * @function: getPubKeySync
 * @return {String} 公钥字符串
 * @description: 获取公钥 同步方法
 */
function getPubKeySync() {
    try {
        return fs.readFileSync(PUB_KEY_PATH, 'utf8')
    } catch (err) {
        console.error(err)
        return generateKeys().pubKey
    }
}

/**
 * @function: getPriKeySync
 * @return {String} 私钥字符串
 * @description: 获取私钥 同步方法
 */
function getPriKeySync() {
    try {
        return fs.readFileSync(PRI_KEY_PATH, 'utf8')
    } catch (err) {
        console.error(err)
        return generateKeys().priKey
    }
}

/**
 * @function: generateKeys
 * @description: 生成密钥对
 * @return {Object} 密钥对 { PubKey, priKey }
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

module.exports = {
    getPubKey,
    getPriKey,
    getPubKeySync,
    getPriKeySync,
    generateKeys
}
