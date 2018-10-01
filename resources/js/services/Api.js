export const API = {
    COMPANY_NAME: 'Logsitimatic S.A.S',
    APP_NAME: 'Logistimatic',
    COOKIE: 'logistimatic',
    PATH: '/api/',
    CLIENT_ID: 2,
    CLIENT_SECRET: 'b6T5HoJmA6IJ7t7YCtaS0dXszae8ysxdgySdX2sf',
    GRANT_TYPE: 'password',
    END_POINTS: {
        SECURITY: {
            MODULES: {
                ROOT: '/api/modules',
                DATATABLE: '/api/module/datatable'
            },
            SUBMODULES: {
                ROOT: '/api/submodules',
                DATATABLE: '/api/submodule/datatable'
            },
            PERMISSIONS: {
                ROOT: '/api/permissions',
            },
            ROLES: {
                ROOT: '/api/roles',
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
