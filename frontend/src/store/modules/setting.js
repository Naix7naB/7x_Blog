import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
    selector: 'body',
    attribute: 'data-theme',
    storageKey: '_theme_',
    valueLight: 'light',
    valueDark: 'dark'
}).value

export default {
    namespaced: true,
    state: {
        theme: isDark
    },
    mutations: {
        _toggle_theme_(state) {
            state.theme = useToggle(state.theme)
        }
    },
    actions: {
        toggleTheme({ commit }) {
            commit('_toggle_theme_')
        }
    }
}
