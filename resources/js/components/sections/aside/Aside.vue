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
                Security
                <template slot="item">
                    <aside-menu-item v-if="$auth.can('view-module') && $auth.hasRole('root')" :href="{ name: 'modules' }">
                        Modules
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-submodule') && $auth.hasRole('root')" :href="{ name: 'submodules' }">
                        Submodules
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-users')" :href="{ name: 'users' }">
                        Users
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-roles')" :href="{ name: 'roles' }">
                        Roles
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-permissions')" :href="{ name: 'permissions' }">
                        Permissions
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

            <aside-section v-if="$auth.ability(['view-customers-module', 'view-companies', 'view-business-unities', 'view-products'])">Customers</aside-section>

            <aside-menu-sub-menu
                    v-if="$auth.ability(['view-customers-module', 'view-companies', 'view-business-unities', 'view-products'])"
                    :isActive="active(['companies', 'companies.create', 'companies.edit', 'business.unity', 'business.unity.create', 'business.unity.edit', 'products', 'products.create', 'products.edit'])">
                Customers
                <template slot="item">
                    <aside-menu-item v-if="$auth.can('view-companies')" :href="{ name: 'companies' }">
                        Companies
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-business-unities')" :href="{ name: 'business.unity' }">
                        Business Unities
                    </aside-menu-item>
                    <aside-menu-item v-if="$auth.can('view-products')" :href="{ name: 'products' }">
                        Products
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

            <aside-section v-if="$auth.ability(['view-purchase-module', 'view-purchase-order'])">Purchases</aside-section>

            <aside-menu-sub-menu  v-if="$auth.ability(['view-purchase-module', 'view-purchase-order'])"
                                  :isActive="active(['purchase.orders', 'purchase.orders.create'])">
                Purchases
                <template slot="item">
                    <aside-menu-item v-if="$auth.can('view-purchase-order')" :href="{ name: 'purchase.orders' }">
                        Purchase Order
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
