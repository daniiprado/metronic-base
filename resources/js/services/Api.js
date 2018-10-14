export const API = {
    COMPANY_NAME: 'Logsitimatic S.A.S',
    APP_NAME: 'Logistimatic',
    COOKIE: 'logistimatic',
    PATH: '/api/',
    CLIENT_ID: 10,
    //CLIENT_ID: 2,
    CLIENT_SECRET: 'CrgtOULIcfGz3v0BQQKXHrKcuRClZHfJPNsEDPe4',
    //CLIENT_SECRET: 'HWkacMnPJpg2TyDEcpElx2Sgx1vHKlSCSkhTEOSC',
    GRANT_TYPE: 'password',
    END_POINTS: {
        SECURITY: {
            MODULES: {
                ROOT: '/api/modules',
                DATATABLE: '/api/modules/datatable',
                PERMISSIONS: '/api/modules/permissions'
            },
            SUBMODULES: {
                ROOT: '/api/submodules',
                DATATABLE: '/api/submodules/datatable'
            },
            /**
             * @return {string}
             */
            MODULE_SUBMODULE: function (id) {
                return `/api/modules/${id}/submodules`
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
            ROLE_PERMISSIONS: function (role_id, perm_id = null) {
                return (!perm_id) ? `/api/roles/${role_id}/permissions` : `/api/roles/${role_id}/permissions/${perm_id}`
            },
            /**
             * @return {string}
             */
            USER_ROLE: function (user_id, role_id = null) {
                return (!role_id) ? `/api/users/${user_id}/roles` : `/api/users/${role_id}/roles/${role_id}`
            },
            USERS: {
                ROOT: '/api/users',
                DATATABLE: '/api/users/datatable'
            },
        },
        CUSTOMERS: {
            COMPANY: {
                ROOT: '/api/companies',
                DATATABLE: '/api/companies/datatable',
                /**
                 * @return {string}
                 */
                PRODUCTS: function (id) {
                    return `/api/companies/${id}/products`
                }
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
                DATATABLE: '/api/purchase-order/datatable',
                /**
                 * @return {string}
                 */
                PRODUCTS_ORDER: function (id) {
                    return `/api/purchase-order/${id}/products-order`
                },
                /**
                 * @return {string}
                 */
                PURCHASE_ORDER_STATUS: function (id) {
                    return `/api/purchase-order/${id}/status`
                },
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
