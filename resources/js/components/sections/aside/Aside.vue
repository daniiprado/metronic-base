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

            <aside-section>Security</aside-section>

            <aside-menu-sub-menu route="countries">
                Security
                <template slot="item">
                    <aside-menu-item :href="{ name: 'modules' }">
                        Modules
                    </aside-menu-item>
                    <aside-menu-item :href="{ name: 'submodules' }">
                        Submodules
                    </aside-menu-item>
                    <aside-menu-item :href="{ name: 'users' }">
                        Users
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

            <aside-section>Customers</aside-section>

            <aside-menu-sub-menu route="countries">
                Customers
                <template slot="item">
                    <aside-menu-item :href="{ name: 'companies' }">
                        Companies
                    </aside-menu-item>
                    <aside-menu-item :href="{ name: 'products' }">
                        Products
                    </aside-menu-item>
                </template>
            </aside-menu-sub-menu>

        </aside-left>
        <!-- END: Left Aside -->
    </div>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style scoped>

</style>
