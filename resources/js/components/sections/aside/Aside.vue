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

            <aside-section v-if="$auth.can('view-security-module')">Security</aside-section>

            <aside-menu-sub-menu v-if="$auth.can('view-security-module')" route="countries">
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

            <aside-section v-if="$auth.can('view-customers-module')">Customers</aside-section>

            <aside-menu-sub-menu v-if="$auth.can('view-customers-module')" route="countries">
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

            <aside-section v-if="$auth.can('view-purchase-module')">Purchases</aside-section>

            <aside-menu-sub-menu  v-if="$auth.can('view-purchase-module')"route="countries">
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
    }
</script>

<style scoped>

</style>
