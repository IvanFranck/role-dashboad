import Vue from 'vue'
import { TablePlugin, ButtonPlugin, SpinnerPlugin, ModalPlugin, FormGroupPlugin, FormPlugin, PaginationPlugin, FormInputPlugin, LayoutPlugin, FormCheckboxPlugin } from 'bootstrap-vue'
import VueFeather from "vue-feather"
import App from './App.vue'

//Import Store
import { store } from './store'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import './assets/app.scss'

Vue.config.productionTip = false


// Make BootstrapVue available throughout the project
Vue.use(TablePlugin)
Vue.use(SpinnerPlugin)
Vue.use(ButtonPlugin)
Vue.use(PaginationPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(ModalPlugin)
Vue.use(FormPlugin)

//Make feather icon available throughout the project
Vue.use(VueFeather)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
