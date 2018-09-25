import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const common = "m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default";



export default new Router({
    mode: 'history',
    linkActiveClass: 'm-menu__item--active',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './../components/sections/LoginLayout'),
            meta: {
                forVisitors: true,
                //bodyClass: common
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "dashboard" */ './../views/dashboard/Dashboard'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/modules',
            name: 'modules',
            component: () => import(/* webpackChunkName: "modules" */ './../views/security/modules/Modules'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/modules/create',
            name: 'modules.create',
            component: () => import(/* webpackChunkName: "modules" */ './../views/security/modules/CreateModule'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/modules/:id/edit',
            name: 'modules.edit',
            component: () => import(/* webpackChunkName: "modules" */ './../views/security/modules/EditModule'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
    ]
})
