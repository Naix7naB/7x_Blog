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
        theme: Storage.get('_theme_', 'light')
    },
    mutations: {
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
        initTheme({ commit }) {
            commit('_init_theme_')
        },
        toggleTheme({ commit }) {
            commit('_toggle_theme_')
        }
    }
}
