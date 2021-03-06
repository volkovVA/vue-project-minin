// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'
import Vuelidate from 'vuelidate'
import App from './App'
import store from './store'
import ColorDirectiveRed from './colorRed'
import ColorDirectiveBlue from './colorDif'
import List from './components/List.vue'
import VueResource from 'vue-resource'

Vue.directive('red', ColorDirectiveRed)
Vue.directive('different', ColorDirectiveBlue)
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000/'
Vue.http.interceptors.push(request => {
  request.headers.set('Auth', 'RAND TOKEN ' + Math.random())
})

Vue.filter('uppercase', value => value.toUpperCase())

Vue.component('app-list', List)

export const eventEmitter = new Vue()

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

