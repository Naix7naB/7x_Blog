const { ORIGIN } = require('../config/server.config')

/**
 * @function isObject
 * @description 判断是否是对象
 * @param {Any} val 需要判断的值
 * @return {Boolean} true | false
 */
function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

/**
 * @function isArray
 * @description 判断是否是数组
 * @param {Any} val 需要判断的值
 * @return {Boolean} true | false
 */
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
}

/**
 * @function isEmptyObj
 * @description 判断是否为空对象
 * @param {Object} obj 需要判断对象
 * @return {Boolean} true | false
 */
function isEmptyObj(obj) {
    return JSON.stringify(obj) === '{}'
}

/**
 * @function hasOwn
 * @description 判断对象是否有某个属性
 * @param {Object} obj 需要判断对象
 * @return {Boolean} true | false
 */
function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * @function padLeft
 * @description 数字补零
 * @param {Number} num 数字
 * @return {Number} 补零后的字符串数字
 */
function padLeft(num) {
    return (String(num)[1] && String(num)) || '0' + num
}

/**
 * @function formatDate
 * @description 格式化日期
 * @param {String} date 日期(日期字符串 | 时间戳 | Date对象)
 * @param {String} format 日期格式化字符串
 * @return {String} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    if (typeof date === 'number') {
        date = date.toString().length === 10 ? date * 1000 : date
    }
    date = (date && new Date(date)) || new Date()
    const o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    if (/(Y+)/.test(format)) {
        format = format.replace(/(Y+)/, m => (date.getFullYear() + '').substring(4 - m.length))
    }
    Object.keys(o).forEach(key => {
        const reg = new RegExp(`(${key})`)
        if (reg.test(format)) {
            format = format.replace(reg, padLeft(o[key]))
        }
    })
    return format
}

/**
 * @function resolveUrl
 * @description 补全URL
 * @param {String} url URL字符串
 * @return {String} 有域名地址的URL
 */
function resolveUrl(url) {
    return new URL(url, ORIGIN).href
}

module.exports = {
    isObject,
    isArray,
    isEmptyObj,
    hasOwn,
    padLeft,
    formatDate,
    resolveUrl
}
