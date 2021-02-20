import Vue from 'vue'
import Vuelidate from 'vuelidate'
import messagePlugin from './utils/message.plugin'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import 'materialize-css/dist/js/materialize'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyDpnXEjRI9I6Au7ksjL0YrnF2sEOL_jeGY",
  authDomain: "vue-crm-ac7d8.firebaseapp.com",
  databaseURL: "https://vue-crm-ac7d8-default-rtdb.firebaseio.com",
  projectId: "vue-crm-ac7d8",
  storageBucket: "vue-crm-ac7d8.appspot.com",
  messagingSenderId: "302588619067",
  appId: "1:302588619067:web:5cc00b31b67d111d0a6f1e"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

