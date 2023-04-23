import { createApp } from 'vue'
import App from './App.vue'
import mainPageFooter from './components/footer/mainPageFooter.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// JS SDK init
window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY);

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('main-page-footer', mainPageFooter)
  .mount('#app')
