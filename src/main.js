import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
import store from 'store'

/* eslint-disable no-unused-vars */
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
