import Storage from '@/utils/storage'

import { useToggle } from '@vueuse/core'
import { isEqual } from 'lodash-es'

// 设置主题方案
function setColorScheme(theme) {
    const body = document.body || document.documentElement
    body.setAttribute('color-scheme', theme)
    body.style.colorScheme = theme
}

// 加载外部Markdown样式
function loadExternalMarkdownCss(theme) {
    const href = `${process.env.VUE_APP_CDN_PATH}/github-markdown-css@5.3.0/github-markdown-${theme}.css`
    let link = document.querySelector('link#markdown')
    if (!link) {
        link = document.createElement('link')
        link.setAttribute('id', 'markdown')
        link.setAttribute('rel', 'stylesheet')
        document.head.appendChild(link)
    }
    link.setAttribute('href', href)
}

export default {
    namespaced: true,
    state: {
        isInit: false,
        isLoading: true,
        emojiJson: Storage.get('_emoji_json_'),
        theme: Storage.get('_theme_', 'light')
    },
    mutations: {
        _set_loading_state_(state, isLoading) {
            state.isLoading = isLoading
        },
        _set_emoji_json_(state, json) {
            state.emojiJson = json
            Storage.set('_emoji_json_', json)
        },
        _init_theme_(state) {
            if (!state.isInit) {
                state.isInit = true
                setColorScheme(state.theme)
                loadExternalMarkdownCss(state.theme)
            }
        },
        _toggle_theme_(state) {
            const [isDark, toggle] = useToggle(isEqual(state.theme, 'dark'))
            toggle()
            const theme = isDark.value ? 'dark' : 'light'
            state.theme = theme
            setColorScheme(theme)
            loadExternalMarkdownCss(theme)
            Storage.set('_theme_', theme)
        }
    },
    actions: {
        setLoadingState({ commit }, isLoading) {
            commit('_set_loading_state_', isLoading)
        },
        setEmojiJson({ commit }, json) {
            commit('_set_emoji_json_', json)
        },
        initTheme({ commit }) {
            commit('_init_theme_')
        },
        toggleTheme({ commit }) {
            commit('_toggle_theme_')
        }
    }
}
