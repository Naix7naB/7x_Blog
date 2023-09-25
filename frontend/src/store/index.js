import Vue from 'vue'
import Vuex from 'vuex'

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
        scroll,
        site,
        user,
        article,
        comment
    }
})
