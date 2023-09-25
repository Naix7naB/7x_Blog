import Storage from '@/utils/storage'

import { useToggle } from '@vueuse/core'
import { isEqual } from 'lodash-es'

function setColorScheme(theme) {
    const document = window.document.body || window.document.documentElement
    document.setAttribute('color-scheme', theme)
}

export default {
    namespaced: true,
    state: {
        inited: false,
        theme: Storage.get('_theme_', 'light')
    },
    mutations: {
        _init_theme_(state) {
            if (!state.inited) {
                state.inited = true
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
