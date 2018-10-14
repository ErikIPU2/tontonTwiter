import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify, {
  theme: {

    primary: "#0288D1",
    secondary: "#03A9F4",
    accent: "#B3E5FC",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"

  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})