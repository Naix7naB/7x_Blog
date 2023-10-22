import Vue from 'vue'
import Viewer from 'viewerjs'

const DEFAULT_VIEWER_OPTION = {
    fullscreen: false,
    navbar: false,
    title: false,
    tooltip: false,
    toolbar: {
        prev: true,
        zoomIn: true,
        zoomOut: true,
        reset: true,
        rotateLeft: true,
        rotateRight: true,
        next: true
    }
}

const createViewer = (el, opt = DEFAULT_VIEWER_OPTION) => new Viewer(el, opt)

export default {
    bind(el, binding) {
        Vue.nextTick(() => {
            el.viewer = createViewer(el, binding.value)
        })
    },
    unbind(el) {
        el.viewer && el.viewer.destroy()
        el.viewer = null
    }
}
