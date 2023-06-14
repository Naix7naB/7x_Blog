const { isObject, isArray, isEmptyObj, hasOwn } = require('./helpers')

/**
 * @function isEqual
 * @description 判断两个值是否一致
 * @param {Any} orgVal 源数据值
 * @param {Any} cmpVal 对比值
 * @return {Boolean} true | false
 */
function isEqual(orgVal, cmpVal) {
    if (isArray(orgVal)) {
        if (orgVal.length !== cmpVal.length) {
            return false
        }
        for (let i = 0; i < orgVal.length; i++) {
            if (orgVal.toString() !== cmpVal.toString()) {
                return false
            }
        }
    } else {
        if (orgVal.toString() !== cmpVal.toString()) {
            return false
        }
    }
    return true
}

/**
 * @function dataDiff
 * @description 对比两个数据, 返回被修改的字段
 * @param {Object} origin 源数据
 * @param {Object} compare 对比数据
 * @return {Object} 返回一个对象, 包含被修改字段的内容  eg: { name: { origin: 'org', current: 'cur' } }
 */
function dataDiff(origin, compare) {
    const result = {}
    Object.keys(origin).forEach(key => {
        if (isObject(origin[key]) && isObject(compare[key])) {
            if (isEmptyObj(origin[key]) && isEmptyObj(compare[key])) {
                // 两个数据都为空对象时 视为未修改 不进行操作
            } else if (!isEmptyObj(origin[key]) && !isEmptyObj(compare[key])) {
                result[key] = dataDiff(origin[key], compare[key])
            } else {
                result[key] = {
                    origin: origin[key],
                    current: compare[key]
                }
            }
        }
        if (hasOwn(compare, key) && !isEqual(origin[key], compare[key])) {
            result[key] = {
                origin: origin[key],
                current: compare[key]
            }
        }
    })
    return result
}

module.exports = dataDiff
