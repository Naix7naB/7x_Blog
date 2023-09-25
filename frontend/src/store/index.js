import Vue from 'vue'
import Vuex from 'vuex'

import setting from './modules/setting'
import scroll from './modules/scroll'
import site from './modules/site'
import user from './modules/user'
import article from './modules/article'
import comment from './modules/comment'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        setting,
        scroll,
        site,
        user,
        article,
        comment
    }
})
