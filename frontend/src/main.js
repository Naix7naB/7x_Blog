import './assets/scss/index.scss'

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import directive from './directive'
import plugins from './plugins'

Vue.config.productionTip = false

Vue.use(directive)
Vue.use(plugins)

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
