const fs = require('fs')

const { PUB_KEY_PATH, PRI_KEY_PATH } = require('../config/base.config')
const { generateKeys } = require('../utils/rsa')

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

module.exports = {
    getPubKey,
    getPriKey,
    getPubKeySync,
    getPriKeySync
}
