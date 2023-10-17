import './assets/main.css'

//FireBase

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()]
})


app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
