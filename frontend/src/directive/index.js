import highlight from './highlight'
import loading from './loading'
import typed from './typed'
import { directive as viewer } from 'v-viewer'
import 'viewerjs/dist/viewer.min.css'

export default {
    install(Vue) {
        Vue.directive('highlight', highlight)
        Vue.directive('loading', loading)
        Vue.directive('typed', typed)
        Vue.directive('viewer', viewer())
    }
}
