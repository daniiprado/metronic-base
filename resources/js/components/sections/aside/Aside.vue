<template>
    <div>
        <!-- BEGIN: Left Aside -->
        <button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
            <i class="la la-close"></i>
        </button>

        <aside-left>
            <aside-menu :href="{ name: 'home' }">
                Dashboard
                <template slot="badge">
                    <aside-menu-badge>2</aside-menu-badge>
                </template>
            </aside-menu>

            <aside-section v-if="$auth.ability(['view-security-module', 'view-module', 'view-submodule', 'view-users', 'view-roles', 'view-permissions'])">Security</aside-section>

            <aside-menu-sub-menu
                    v-if="$auth.ability(['view-security-module', 'view-module', 'view-submodule', 'view-users', 'view-roles', 'view-permissions'])"
                    :isActive="active(['modules', 'modules.create', 'modules.edit', 'submodules', 'submodules.create', 'submodules.edit', 'users', 'users.create', 'users.edit', 'roles', 'roles.create', 'roles.edit', 'permissions', 'permissions.create', 'permissions.edit'])">
                {{ lang.choice('pages.security.title', 2) }}
                <template slot="item">
                    <aside-menu-item v-if="$auth.can('view-module') && $auth.hasRole('root')" :href="{ name: 'modules' }">
                        {{ lang.choice('pages.modules.title', 2) }}
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-submodule') && $auth.hasRole('root')" :href="{ name: 'submodules' }">
                        {{ lang.choice('pages.submodules.title', 2) }}
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-users')" :href="{ name: 'users' }">
                        {{ lang.choice('pages.users.title', 2) }}
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-roles')" :href="{ name: 'roles' }">
                        {{ lang.choice('pages.roles.title', 2) }}
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-permissions')" :href="{ name: 'permissions' }">
                        {{ lang.choice('pages.permissions.title', 2) }}
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

            <aside-section v-if="$auth.ability(['view-customers-module', 'view-companies', 'view-business-unities', 'view-products'])">Customers</aside-section>

            <aside-menu-sub-menu
                    v-if="$auth.ability(['view-customers-module', 'view-companies', 'view-business-unities', 'view-products'])"
                    :isActive="active(['companies', 'companies.create', 'companies.edit', 'business.unity', 'business.unity.create', 'business.unity.edit', 'products', 'products.create', 'products.edit'])">
                {{ lang.choice('pages.customer.title', 2) }}
                <template slot="item">
                    <aside-menu-item v-if="$auth.can('view-companies')" :href="{ name: 'companies' }">
                        {{ lang.choice('pages.company.title', 2) }}
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-business-unities')" :href="{ name: 'business.unity' }">
                        {{ lang.choice('pages.business_unity.title', 2) }}
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-products')" :href="{ name: 'products' }">
                        {{ lang.choice('pages.product.title', 2) }}
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

            <aside-section v-if="$auth.ability(['view-purchase-module', 'view-purchase-order'])">Purchases</aside-section>

            <aside-menu-sub-menu  v-if="$auth.ability(['view-purchase-module', 'view-purchase-order'])"
                                  :isActive="active(['purchase.orders', 'purchase.orders.create', 'purchase.orders.details'])">
                {{ lang.choice('pages.purchase.title', 2) }}
                <template slot="item">
                    <aside-menu-item v-if="$auth.can('view-purchase-order')" :href="{ name: 'purchase.orders' }">
                        {{ lang.choice('pages.purchase_order.title', 2) }}
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

        </aside-left>
        <!-- END: Left Aside -->
    </div>
</template>

<script>
    import {Module} from "../../../services/models/Module";
    export default {
        name: "Aside",
        data: () => {
            return {
                lang: lang,
                modules: new Module({})
            }
        },
        methods: {
            active: function (routes) {
                return routes.some((r) => r.includes( this.$route.name ))
            }
        }
    }
</script>

<style scoped>

</style>
