import '@/assets/scss/index.scss'

import '@/plugins/elementUI'
import '@/plugins/faIcon'
import '@/plugins/mavonEditor'

import installHttp from '@/plugins/http'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')

installHttp(app)
