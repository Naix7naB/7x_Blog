import JSEncrypt from 'jsencrypt'
import router from '@/router'

/**
 * @description: 数字补零
 * @param {Number} num 数字
 * @return {Number} 补零后的字符串数字
 */
function padLeft(num) {
    return (String(num)[1] && String(num)) || '0' + num
}

/**
 * @description: 格式化日期
 * @param {String} date 日期(日期字符串 | 时间戳 | Date对象)
 * @param {String} format 日期格式化字符串
 * @return {String} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
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
            format = format.replace(reg, m => (m.length === 2 ? padLeft(o[key]) : o[key]))
        }
    })
    return format
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
 * @function goToPath
 * @description 路由跳转
 * @param {Object} route 路由信息
 * @param {String} route.target 路由路由跳转的目标名称
 * @param {Object} route.params 路由跳转时的携带参数
 * @param {Object} route.query 路由跳转时的查询参数
 */
function goToPath({ target, params = {}, query = {} }) {
    const currentRouteName = router.currentRoute.name
    if (target === currentRouteName) return false
    if (target === -1) {
        router.back()
    } else {
        router.push({
            name: target,
            params,
            query
        })
    }
}

export { padLeft, formatDate, encrypt, goToPath }
