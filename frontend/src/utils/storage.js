/**
 * 封装 localStorage
 */
export default class Storage {
    /**
     * @description: 获取 key 对应本地存储的值
     * @param {String} key 键名
     * @param {any|null} type 没有该键名时, 返回的数据类型, 默认为 null
     * @return {any} 返回对应键名的值
     */
    static get(key, type = null) {
        let result = type
        const len = window.localStorage.length
        for (let i = 0; i < len; i++) {
            const storageKey = window.localStorage.key(i)
            if (key === storageKey) {
                result = JSON.parse(window.localStorage.getItem(key))
            }
        }
        return result
    }

    /**
     * @description: 储存数据到本地存储
     * @param {String} key 键名
     * @param {any} val 键值
     */
    static set(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val))
    }

    /**
     * @description: 删除本地存储某一项
     * @param {String} key 键名
     */
    static remove(key) {
        if (!Storage.get(key)) return false
        window.localStorage.removeItem(key)
    }

    /**
     * @description: 清除本地存储所有项
     */
    static clear() {
        window.localStorage.clear()
    }
}
