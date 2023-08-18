import Vue from 'vue'
import Loading from '@/components/loading'

const LoadingInstance = Vue.extend(Loading)

/* 把 Loading 组件挂载到绑定的元素上 */
function insertElement(parent) {
    const elPosition = window.getComputedStyle(parent).position
    if (!elPosition || elPosition === 'static') {
        parent.classList.add('g-relative')
    }
    parent.appendChild(parent.instance.$el)
}

/* 在绑定的元素上移除 Loading 组件 */
function removeElement(parent) {
    parent.classList.remove('g-relative')
    parent.removeChild(parent.instance.$el)
}

export default {
    bind(el, binding) {
        console.log(binding)
        const instance = new LoadingInstance({
            el: document.createElement('div')
        })
        el.instance = instance
        if (binding.value) {
            insertElement(el)
        }
    },
    update(el, binding) {
        if (binding.oldValue !== binding.value) {
            binding.value ? insertElement(el) : removeElement(el)
        }
    },
    unbind(el, binding) {
        el.instance && el.instance.$destroy()
    }
}
