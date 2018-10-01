export default [
    {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ './../../views/security/users/Users'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: () => import(/* webpackChunkName: "users" */ './../../views/security/users/CreateUser'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/users/:id/edit',
        name: 'users.edit',
        component: () => import(/* webpackChunkName: "users" */ './../../views/security/users/EditUser'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/modules',
        name: 'modules',
        component: () => import(/* webpackChunkName: "modules" */ './../../views/security/modules/Modules'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/modules/create',
        name: 'modules.create',
        component: () => import(/* webpackChunkName: "modules" */ './../../views/security/modules/CreateModule'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/modules/:id/edit',
        name: 'modules.edit',
        component: () => import(/* webpackChunkName: "modules" */ './../../views/security/modules/EditModule'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/submodules',
        name: 'submodules',
        component: () => import(/* webpackChunkName: "submodules" */ './../../views/security/submodules/Submodules'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
    {
        path: '/submodules/create',
        name: 'submodules.create',
        component: () => import(/* webpackChunkName: "submodules" */ './../../views/security/submodules/CreateSubmodule'),
        meta: {
            requiresAuth: true,
            //bodyClass: common
        }
    },
]
