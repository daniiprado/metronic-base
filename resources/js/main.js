
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
import vbclass from 'vue-body-class';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
};

window.lang = new Lang({ messages });
Validator.localize('es', es);
Vue.use(VeeValidate);
Vue.use(GlobalComponents);
Vue.use(VTooltip);
Vue.use(Croppa, { componentName: 'upload-image' });
Vue.use(Auth);
Vue.use( vbclass, router );
Vue.use(VueHtmlToPaper, options);

Vue.config.productionTip = false

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.axios.defaults.headers.common['Authorization'] = store.getters.getToken;

window.axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized, logout the user
            store.dispatch('logout')
                .then(() => {
                    this.$auth.destroyCookie()
                })
                .then(() => {
                    window.location.reload();
                })
            // you can also redirect to /login if needed !
        }
        throw err;
    });
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
        if (Vue.auth.isAuthenticated()) {
            next({name: 'home'})
        } else if ( to.matched.some((record) => record.meta.can) ) {
            next()
        } else {
            next({name: 'home'})
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.auth.isAuthenticated()) {
            next({name: 'login'})
        } else if ( to.matched.some((record) => record.meta.can) ) {
            next()
        } else {
            next({name: 'home'})
        }
    } else {
        next()
    }
});

router.afterEach((to, from, next) => {
    setTimeout(() => {
        $('body').removeClass('m-page--loading');
        mApp.init();
        mUtil.init();
        mLayout.init();
    }, 2000)
});

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
