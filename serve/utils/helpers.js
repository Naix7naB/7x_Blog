/**
 * @description: 数字补零
 * @param {Number} num 数字
 * @return {Number} 补零后的字符串数字
 * @Date: 2022-09-11
 */
function padLeft(num) {
    return (String(num)[1] && String(num)) || '0' + num
}

/**
 * @description: 格式化日期
 * @param {String} date 日期(日期字符串 | 时间戳 | Date对象)
 * @param {String} format 日期格式化字符串
 * @return {String} 格式化后的日期字符串
 * @Date: 2022-09-07
 */
function formatDate(date, format = 'YYYY-MM-DD') {
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

module.exports = {
    padLeft,
    formatDate
}
