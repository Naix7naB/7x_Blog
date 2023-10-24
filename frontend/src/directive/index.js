import highlight from './highlight'
import imagePreview from './imagePreview'
import typed from './typed'

export default {
    install(Vue) {
        Vue.directive('highlight', highlight)
        Vue.directive('image-preview', imagePreview)
        Vue.directive('typed', typed)
    }
}
