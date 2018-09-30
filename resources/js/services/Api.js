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
                ROOT: '/api/module',
                DATATABLE: '/api/module/datatable'
            },
            SUBMODULES: {
                ROOT: '/api/submodule',
                DATATABLE: '/api/submodule/datatable'
            },
            USERS: {
                ROOT: '/api/users',
                DATATABLE: '/api/users/datatable'
            },
        },
        CUSTOMERS: {
            COMPANY: {
                ROOT: '/api/company',
                DATATABLE: '/api/company/datatable'
            },
            PRODUCT: {
                ROOT: '/api/product',
                DATATABLE: '/api/product/datatable'
            }
        }
    }
};
