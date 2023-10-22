import ElementUI from './elementUI'
import FontAwesomeIcon from './faIcon'
import live2d from './live2d'

const EL_PARAM_MAP = {
    Message: '$message',
    MessageBox: '$msgbox',
    Notification: '$notify'
}

export default {
    install(Vue) {
        ElementUI.components.forEach(cmp => {
            Vue.use(cmp)
        })
        ElementUI.others.forEach(item => {
            const param = EL_PARAM_MAP[item.name]
            Vue.prototype[param] = item
        })
        Vue.component('fa-icon', FontAwesomeIcon)
        Vue.use(live2d)
    }
}
