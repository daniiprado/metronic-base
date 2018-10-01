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
        /**
         * ------------------------------
         * Security
         * ------------------------------
         */
        {
            path: '/users',
            name: 'users',
            component: () => import(/* webpackChunkName: "users" */ './../views/security/users/Users'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/users/create',
            name: 'users.create',
            component: () => import(/* webpackChunkName: "users" */ './../views/security/users/CreateUser'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/users/:id/edit',
            name: 'users.edit',
            component: () => import(/* webpackChunkName: "users" */ './../views/security/users/EditUser'),
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
        {
            path: '/submodules',
            name: 'submodules',
            component: () => import(/* webpackChunkName: "submodules" */ './../views/security/submodules/Submodules'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/submodules/create',
            name: 'submodules.create',
            component: () => import(/* webpackChunkName: "submodules" */ './../views/security/submodules/CreateSubmodule'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        /**
         * ------------------------------
         * Customers
         * ------------------------------
         */
        {
            path: '/companies',
            name: 'companies',
            component: () => import(/* webpackChunkName: "companies" */ './../views/customers/Company'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/companies/create',
            name: 'companies.create',
            component: () => import(/* webpackChunkName: "companies" */ './../views/customers/CreateCompany'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/companies/:id/edit',
            name: 'companies.edit',
            component: () => import(/* webpackChunkName: "companies" */ './../views/customers/EditCompany'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/products',
            name: 'products',
            component: () => import(/* webpackChunkName: "products" */ './../views/products/Products'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/business-unity',
            name: 'business.unity',
            component: () => import(/* webpackChunkName: "companies" */ './../views/business_unities/BusinessUnity'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/business-unity/create',
            name: 'business.unity.create',
            component: () => import(/* webpackChunkName: "companies" */ './../views/business_unities/CreateBusinessUnity'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        /**
         * ------------------------------
         * Purchases
         * ------------------------------
         */
        {
            path: '/purchase-order',
            name: 'purchase.orders',
            component: () => import(/* webpackChunkName: "purchase" */ './../views/purchase/PurchaseOrder'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
        {
            path: '/purchase-order/create',
            name: 'purchase.orders.create',
            component: () => import(/* webpackChunkName: "purchase" */ './../views/purchase/PurchaseOrderCreate'),
            meta: {
                requiresAuth: true,
                //bodyClass: common
            }
        },
    ]
})
