<template>
    <!-- begin::Body -->
    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">

        <!--[html-partial:include:{"file":"partials\/_aside-left.html"}]/-->
        <menu-left></menu-left>

        <div class="m-grid__item m-grid__item--fluid m-wrapper">

            <!--[html-partial:include:{"file":"partials\/_subheader-default.html"}]/-->
            <sub-header></sub-header>

            <div class="m-content">
                <slot></slot>
            </div>
        </div>
    </div>
    <!-- end:: Body -->
</template>

<script>
    export default {
        name: "DashboardLayout"
    }
</script>

<style scoped>

</style>
