import Vue from 'vue'
import hljs from 'highlight.js'

Vue.directive('highlight', (el, binding, vnode) => {
    const content = el.querySelector('pre code')
    hljs.highlightElement(content)
    const lang = content.className
        .split(' ')
        .filter(item => item.includes('language-'))[0]
        .split('-')[1]
    content.dataset.lang = lang
})
