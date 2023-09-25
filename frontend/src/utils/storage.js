/**
 * 封装 localStorage
 */
import { useLocalStorage } from '@vueuse/core'

export default class Storage {
    static get serializer() {
        return {
            read: v => (v ? JSON.parse(v) : null),
            write: v => JSON.stringify(v)
        }
    }

    /**
     * @description: 获取 key 对应本地存储的值
     * @param {String} key 键名
     * @param {any|null} defaultValue 存储中没有此键名的数据时的默认数据
     * @return {any} 返回对应键值
     */
    static get(key, defaultValue = null) {
        return useLocalStorage(key, defaultValue, { serializer: Storage.serializer }).value
    }

    /**
     * @description: 储存数据到本地存储
     * @param {String} key 键名
     * @param {any} val 键值
     */
    static set(key, val) {
        useLocalStorage(key, null, { serializer: Storage.serializer }).value = val
    }

    /**
     * @description: 删除本地存储某一项
     * @param {String} key 键名
     */
    static remove(key) {
        useLocalStorage(key, null, { serializer: Storage.serializer }).value = null
    }

    /**
     * @description: 清除本地存储所有项
     */
    static clear() {
        window.localStorage.clear()
    }
}
