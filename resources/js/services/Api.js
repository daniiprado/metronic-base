export const API = {
    COMPANY_NAME: 'Logsitimatic S.A.S',
    APP_NAME: 'Logistimatic',
    COOKIE: 'logistimatic',
    PATH: '/api/',
    CLIENT_ID: 10,
    CLIENT_SECRET: 'CrgtOULIcfGz3v0BQQKXHrKcuRClZHfJPNsEDPe4',
    GRANT_TYPE: 'password',
    END_POINTS: {
        SECURITY: {
            MODULES: {
                ROOT: '/api/modules',
                DATATABLE: '/api/modules/datatable'
            },
            SUBMODULES: {
                ROOT: '/api/submodules',
                DATATABLE: '/api/submodules/datatable'
            },
            PERMISSIONS: {
                ROOT: '/api/permissions',
                DATATABLE: '/api/permissions/datatable',
            },
            ROLES: {
                ROOT: '/api/roles',
                DATATABLE: '/api/roles/datatable',
            },
            /**
             * @return {string}
             */
            ROLE_PERMISSIONS: function (id) {
                return `/api/roles/${id}/permissions`
            },
            USERS: {
                ROOT: '/api/users',
                DATATABLE: '/api/users/datatable'
            },
        },
        CUSTOMERS: {
            COMPANY: {
                ROOT: '/api/companies',
                DATATABLE: '/api/companies/datatable'
            },
            UNITY: {
                ROOT: '/api/business-unity',
                DATATABLE: '/api/business-unity/datatable'
            },
            PRODUCT: {
                ROOT: '/api/products',
                DATATABLE: '/api/products/datatable'
            }
        },
        PURCHASE: {
            PURCHASE_ORDER: {
                ROOT: '/api/purchase-order',
                DATATABLE: '/api/purchase-order/datatable'
            },
            PRODUCTS_ORDER: {
                ROOT: '/api/products-order',
                STATUS: '/api/products-order/status'
            },
            ISSUE: {
                ROOT: '/api/issues',
            },
            STATUS: {
                ROOT: '/api/status',
            }
        }
    }
};
