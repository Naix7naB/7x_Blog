import ElementUI from './elementUI'
import Echarts from './echarts'
import FontAwesomeIcon from './faIcon'
import MavonEditor from './mavonEditor'

export default {
    install(Vue) {
        Vue.use(ElementUI)
        Vue.use(Echarts)
        Vue.use(FontAwesomeIcon)
        Vue.use(MavonEditor)
    }
}
