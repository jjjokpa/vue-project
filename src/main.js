import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueAxios from './plugins/axios'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

Vue.use(VueAxios)
Vue.use(VueRouter)

export default {
  component: {
    VueBootstrapTypeahead
  }
}

const Home  = {
  template: '<div>Home</div>'
}

const Login = {
  template: '<div>Login</div>'
}

const About = {
  template: '<div>About</div>'
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/about', component: About }
  ]
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
