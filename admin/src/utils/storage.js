/**
 * 封装 localStorage
 */
import { useLocalStorage } from '@vueuse/core'

const serializer = {
    read: v => (v ? JSON.parse(v) : null),
    write: v => JSON.stringify(v)
}

export default class Storage {
    /**
     * @description: 获取 key 对应本地存储的值
     * @param {String} key 键名
     * @param {any|null} type 没有该键名时, 返回的数据类型, 默认为 null
     * @return {any} 返回对应键名的值
     */
    static get(key) {
        return useLocalStorage(key, null, { serializer }).value
    }

    /**
     * @description: 储存数据到本地存储
     * @param {String} key 键名
     * @param {any} val 键值
     */
    static set(key, val) {
        useLocalStorage(key, null, { serializer }).value = val
    }

    /**
     * @description: 删除本地存储某一项
     * @param {String} key 键名
     */
    static remove(key) {
        useLocalStorage(key, null, { serializer }).value = null
    }

    /**
     * @description: 清除本地存储所有项
     */
    static clear() {
        window.localStorage.clear()
    }
}
