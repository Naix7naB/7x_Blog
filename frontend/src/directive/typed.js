import Typed from 'typed.js'

import { isEqual } from 'lodash-es'

const createTyped = (el, texts) => {
    return new Typed(el, {
        strings: texts,
        typeSpeed: 100,
        startDelay: 1000,
        backSpeed: 60,
        backDelay: 2500,
        cursorChar: '_',
        autoInsertCss: false,
        loop: true
    })
}

export default {
    bind(el, binding) {
        el.typed = createTyped(el, binding.value)
        el.typed.start()
    },
    update(el, binding) {
        if (!isEqual(binding.oldValue, binding.value)) {
            el.typed && el.typed.destroy()
            el.typed = createTyped(el, binding.value)
            el.typed.start()
        }
    },
    unbind(el) {
        el.typed && el.typed.destroy()
        el.typed = null
    }
}
