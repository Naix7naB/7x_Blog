import '@/plugins/elementUI'
import '@/plugins/faIcon'
import '@/plugins/mavonEditor'
import '@/plugins/http'

import '@/assets/scss/index.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
