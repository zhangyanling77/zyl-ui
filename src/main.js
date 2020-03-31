import Vue from 'vue'
import zylUI from './packages/index'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(zylUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
