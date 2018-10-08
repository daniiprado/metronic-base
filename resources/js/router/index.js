import Vue from 'vue'
import Router from 'vue-router'
import Auth from './../packages/auth/Auth'

Vue.use(Router);
Vue.use(Auth);


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
                can: true,
                //bodyClass: common
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "dashboard" */ './../views/dashboard/Dashboard'),
            meta: {
                requiresAuth: true,
                can: true,
                //bodyClass: common
            }
        },
        /**
         * ------------------------------
         * Security
         * ------------------------------
         */
            /* ------------ Users ----------- */
                {
                    path: '/users',
                    name: 'users',
                    component: () => import(/* webpackChunkName: "users" */ './../views/security/users/Users'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-users')
                        //bodyClass: common
                    }
                },
                {
                    path: '/users/create',
                    name: 'users.create',
                    component: () => import(/* webpackChunkName: "users" */ './../views/security/users/CreateUser'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-users')
                        //bodyClass: common
                    }
                },
                {
                    path: '/users/:id/edit',
                    name: 'users.edit',
                    component: () => import(/* webpackChunkName: "users" */ './../views/security/users/EditUser'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('edit-users')
                        //bodyClass: common
                    }
                },
                {
                    path: '/users/:id/roles',
                    name: 'users.roles',
                    component: () => import(/* webpackChunkName: "users" */ './../views/security/users/AttachRole'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('edit-users')
                        //bodyClass: common
                    }
                },
            /* ------------ Roles ----------- */
                {
                    path: '/roles',
                    name: 'roles',
                    component: () => import(/* webpackChunkName: "roles" */ './../views/security/roles/Roles'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-roles')
                        //bodyClass: common
                    }
                },
                {
                    path: '/roles/create',
                    name: 'roles.create',
                    component: () => import(/* webpackChunkName: "roles" */ './../views/security/roles/CreateRole'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-roles')
                        //bodyClass: common
                    }
                },
                {
                    path: '/roles/:id/permissions',
                    name: 'roles.permissions',
                    component: () => import(/* webpackChunkName: "roles" */ './../views/security/roles/AttachPermissions'),
                    meta: {
                        requiresAuth: true,
                        can: true
                        //bodyClass: common
                    }
                },
            /* ------------ Permissions ----------- */
                {
                    path: '/permissions',
                    name: 'permissions',
                    component: () => import(/* webpackChunkName: "permissions" */ './../views/security/permissions/Permission'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-permissions')
                        //bodyClass: common
                    }
                },
                {
                    path: '/permissions/create',
                    name: 'permissions.create',
                    component: () => import(/* webpackChunkName: "permissions" */ './../views/security/permissions/CreatePermission'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-permissions')
                        //bodyClass: common
                    }
                },
            /* ------------ Modules ----------- */
                {
                    path: '/modules',
                    name: 'modules',
                    component: () => import(/* webpackChunkName: "modules" */ './../views/security/modules/Modules'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-module')
                        //bodyClass: common
                    }
                },
                {
                    path: '/modules/create',
                    name: 'modules.create',
                    component: () => import(/* webpackChunkName: "modules" */ './../views/security/modules/CreateModule'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-module')
                        //bodyClass: common
                    }
                },
                {
                    path: '/modules/:id/edit',
                    name: 'modules.edit',
                    component: () => import(/* webpackChunkName: "modules" */ './../views/security/modules/EditModule'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('edit-module')
                        //bodyClass: common
                    }
                },
                {
                    path: '/submodules',
                    name: 'submodules',
                    component: () => import(/* webpackChunkName: "submodules" */ './../views/security/submodules/Submodules'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-submodule')
                        //bodyClass: common
                    }
                },
            /* ------------ Submodules ----------- */
                {
                path: '/submodules/create',
                name: 'submodules.create',
                component: () => import(/* webpackChunkName: "submodules" */ './../views/security/submodules/CreateSubmodule'),
                meta: {
                    requiresAuth: true,
                    can: Vue.auth.can('create-submodule')
                    //bodyClass: common
                }
            },
        /**
         * ------------------------------
         * Customers
         * ------------------------------
         */

            /* ------------ Companies ----------- */
                {
                    path: '/companies',
                    name: 'companies',
                    component: () => import(/* webpackChunkName: "companies" */ './../views/customers/Company'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-companies')
                        //bodyClass: common
                    }
                },
                {
                    path: '/companies/create',
                    name: 'companies.create',
                    component: () => import(/* webpackChunkName: "companies" */ './../views/customers/CreateCompany'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-companies')
                        //bodyClass: common
                    }
                },
                {
                    path: '/companies/:id/edit',
                    name: 'companies.edit',
                    component: () => import(/* webpackChunkName: "companies" */ './../views/customers/EditCompany'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('edit-companies')
                        //bodyClass: common
                    }
                },
            /* ------------ Products ----------- */
                {
                    path: '/products',
                    name: 'products',
                    component: () => import(/* webpackChunkName: "products" */ './../views/products/Products'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-products')
                        //bodyClass: common
                    }
                },
                {
                    path: '/products/create',
                    name: 'products.create',
                    component: () => import(/* webpackChunkName: "products" */ './../views/products/CreateProduct'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-products')
                        //bodyClass: common
                    }
                },
            /* ------------ Business Unity ----------- */
                {
                    path: '/business-unity',
                    name: 'business.unity',
                    component: () => import(/* webpackChunkName: "companies" */ './../views/business_unities/BusinessUnity'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-business-unities')
                        //bodyClass: common
                    }
                },
                {
                    path: '/business-unity/create',
                    name: 'business.unity.create',
                    component: () => import(/* webpackChunkName: "companies" */ './../views/business_unities/CreateBusinessUnity'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-business-unities')
                        //bodyClass: common
                    }
                },
        /**
         * ------------------------------
         * Purchases
         * ------------------------------
         */

            /* ------------ Purchases ----------- */
                {
                    path: '/purchase-order',
                    name: 'purchase.orders',
                    component: () => import(/* webpackChunkName: "purchase" */ './../views/purchase/PurchaseOrder'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('view-purchase-order')
                        //bodyClass: common
                    }
                },
                {
                    path: '/purchase-order/create',
                    name: 'purchase.orders.create',
                    component: () => import(/* webpackChunkName: "purchase" */ './../views/purchase/PurchaseOrderCreate'),
                    meta: {
                        requiresAuth: true,
                        can: Vue.auth.can('create-purchase-order')
                        //bodyClass: common
                    }
                },
    ]
})
