import ElementUI from './elementUI'
import FontAwesomeIcon from './faIcon'
import live2d from './live2d'

export default {
    install(Vue) {
        Vue.use(ElementUI)
        Vue.use(FontAwesomeIcon)
        Vue.use(live2d)
    }
}
