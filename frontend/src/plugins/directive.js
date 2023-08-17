import Vue from 'vue'
import showdown from 'showdown'
import hljs from 'highlight.js'
import { directive as viewer } from 'v-viewer'

import 'github-markdown-css/github-markdown-dark.css'
import 'highlight.js/styles/atom-one-dark.css'
import '@/assets/scss/highlight.scss'
import 'viewerjs/dist/viewer.min.css'

const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    ghCompatibleHeaderId: true,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    strikethrough: true,
    tables: true,
    tablesHeaderId: true,
    tasklists: true,
    smoothLivePreview: true,
    smartIndentationFix: true,
    disableForced4SpacesIndentedSublists: true,
    simpleLineBreaks: true,
    requireSpaceBeforeHeadingText: true,
    openLinksInNewWindow: true,
    emoji: true,
    underline: true
})

hljs.addPlugin({
    'before:highlightElement'({ el, language }) {
        el.parentElement.classList.add('code-wrapper')
        el.dataset.language = language
    }
})

Vue.directive('highlight', (el, binding, vnode) => {
    el.innerHTML = converter.makeHtml(binding.value)
    const elems = el.querySelectorAll('pre code')
    elems.forEach(elem => {
        hljs.highlightElement(elem)
    })
})

Vue.directive('viewer', viewer())
