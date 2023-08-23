import './elementUI'
import FontAwesomeIcon from './faIcon'
import { vuescroll, config } from './vuescroll'

export default {
    install(Vue) {
        Vue.component('fa-icon', FontAwesomeIcon)
        Vue.use(vuescroll, config)
    }
}
