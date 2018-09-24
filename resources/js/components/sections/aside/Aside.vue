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

            <aside-section>Locations</aside-section>

            <aside-menu-sub-menu route="countries">
                Locations
                <template slot="item">
                    <aside-menu-item :href="{ name: 'home' }">
                        Home
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
