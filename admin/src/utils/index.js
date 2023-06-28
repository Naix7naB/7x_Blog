import JSEncrypt from 'jsencrypt'

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
        // 如果传入的时间戳单位为秒 转为毫秒
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
 * @description 补全路径地址
 * @param {String} url 路径地址
 * @return {String} 补全后的路径地址
 */
function resolveUrl(url) {
    const regexp = /^\/.+/g
    if (!regexp.test(url)) {
        url = '/' + url
    }
    return process.env.VUE_APP_BASE_URL + url
}

/**
 * @function encrypt
 * @description 公钥加密
 * @param {String} plain 文本内容
 * @param {String} key 密钥
 * @return {String} 加密后的内容
 */
function encrypt(plain, key) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(key)
    return encryptor.encrypt(plain)
}

/**
 * @function debounce
 * @description 防抖
 * @param {Function} callback 回调方法
 * @param {number} delay 延迟时间
 * @return {Function} 防抖函数
 */
function debounce(callback, delay) {
    let timer = null
    return function () {
        const ctx = this
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            callback.apply(ctx, arguments)
        }, delay)
    }
}

/**
 * @function throttle
 * @description 节流
 * @param {Function} callback 回调方法
 * @param {number} delay 延迟时间
 * @return {Function} 节流函数
 */
function throttle(callback, delay) {
    let locked = false
    return function () {
        if (locked) return false
        const ctx = this
        locked = true
        setTimeout(() => {
            locked = false
        }, delay)
        return callback.apply(ctx, arguments)
    }
}

export { padLeft, formatDate, resolveUrl, encrypt, debounce, throttle }
