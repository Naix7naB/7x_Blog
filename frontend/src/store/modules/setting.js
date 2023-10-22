import Storage from '@/utils/storage'

import { useToggle } from '@vueuse/core'
import { isEqual } from 'lodash-es'

function setColorScheme(theme) {
    const links = document.querySelectorAll('link')
    links.forEach(link => {
        const regex = new RegExp(/.+github-markdown-css.+/, 'gi')
        if (regex.test(link.href)) {
            link.disabled = !link.disabled
        }
    })
    import(`github-markdown-css/github-markdown-${theme}.css`)
        .then(() => {
            const body = document.body || document.documentElement
            body.setAttribute('color-scheme', theme)
            body.style.colorScheme = theme
        })
        .catch(err => {
            console.error(new Error(err))
        })
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
            }
        },
        _toggle_theme_(state) {
            const [isDark, toggle] = useToggle(isEqual(state.theme, 'dark'))
            toggle()
            const theme = isDark.value ? 'dark' : 'light'
            state.theme = theme
            setColorScheme(theme)
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
