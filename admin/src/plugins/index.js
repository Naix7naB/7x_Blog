import ElementUI from './elementUI'
import FontAwesomeIcon from './faIcon'
import MavonEditor from './mavonEditor'

const EL_PARAM_MAP = {
    Loading: '$loading',
    Message: '$message',
    MessageBox: '$msgbox',
    Notification: '$notify'
}

export default {
    install(Vue) {
        Vue.use(MavonEditor)
        Vue.component('fa-icon', FontAwesomeIcon)
        ElementUI.others.forEach(item => {
            const param = EL_PARAM_MAP[item.name]
            Vue.prototype[param] = item
            if (item.name === 'MessageBox') {
                Vue.prototype.$alert = item.alert
                Vue.prototype.$confirm = item.confirm
                Vue.prototype.$prompt = item.prompt
            }
        })
        ElementUI.components.forEach((cmp, idx) => {
            Vue.use(cmp)
        })
    }
}
