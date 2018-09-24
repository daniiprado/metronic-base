import Cookies from 'js-cookie';
import store from './../../store';
import {API} from "../../services/Api";

export default function (Vue) {
    Vue.auth = {
        hasToken: () => ( store.getters.getToken ),
        tokenExpires: function () {
            if (Date.now() > parseInt(store.getters.getExpiresIn)) {
                store.dispatch('logout')
                    .then(() => this.destroyCookie())
                return false
            }
            return true
        },
        destroyCookie: () => Cookies.remove( API.COOKIE ),
        isAuthenticated () { return this.hasToken() }
    };
    Object.defineProperties(Vue.prototype, {
        $auth: {
            get () { return Vue.auth }
        }
    });
}
