import showdown from 'showdown'
import hljs from 'highlight.js'

import 'github-markdown-css/github-markdown-dark.css'
import 'highlight.js/styles/atom-one-dark.css'
import '@/assets/scss/highlight.scss'

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

export default {
    bind(el, binding) {
        el.innerHTML = converter.makeHtml(binding.value)
        const elems = el.querySelectorAll('pre code')
        elems.forEach(elem => {
            hljs.highlightElement(elem)
        })
    }
}
