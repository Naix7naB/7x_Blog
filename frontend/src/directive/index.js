import highlight from './highlight'
import loading from './loading'
import { directive as viewer } from 'v-viewer'

export default {
    install(Vue) {
        Vue.directive('highlight', highlight)
        Vue.directive('loading', loading)
        Vue.directive('viewer', viewer())
    }
}
