
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import es from 'vee-validate/dist/locale/es';
import VeeValidate, {Validator} from 'vee-validate';
import Lang from 'lang.js';
import messages from './lang/messages';
import GlobalComponents from './global-components';
import Auth from './packages/auth/Auth';
import VTooltip from 'v-tooltip';
import Croppa from 'vue-croppa';
import vbclass from 'vue-body-class'


window.lang = new Lang({ messages });
Validator.localize('es', es);
Vue.use(VeeValidate);
Vue.use(GlobalComponents);
Vue.use(VTooltip);
Vue.use(Croppa, { componentName: 'upload-image' });
Vue.use(Auth);
Vue.use( vbclass, router );

Vue.config.productionTip = false

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.axios.defaults.headers.common['Authorization'] = store.getters.getToken;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
        if (Vue.auth.isAuthenticated()) {
            next({name: 'home'})
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.auth.isAuthenticated()) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        next()
    }
});

router.afterEach((to, from, next) => {

    setTimeout(() => {
        $('body').removeClass('m-page--loading');
    }, 2000)
});

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
