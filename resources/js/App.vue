<template>
    <transition name="zoom">
        <div class="m-grid m-grid--hor m-grid--root m-page" v-if="is_auth">
            <header-base></header-base>

            <dashboard-layout>
                <router-view></router-view>
            </dashboard-layout>


            <quick-sidebar></quick-sidebar>

            <scroll-top></scroll-top>

            <layout-tolltips></layout-tolltips>

            <vue-footer></vue-footer>
        </div>
        <div class="m-grid m-grid--hor m-grid--root m-page" v-else>
            <login-layout>
                <router-view></router-view>
            </login-layout>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "App",
        data: () => {
            return {
                is_auth: false
            }
        },
        created: function () {
            this.is_auth = this.$auth.isAuthenticated();
        },
    }
</script>

<style scoped>
    .zoom-enter-active,
    .zoom-leave-active {
        animation-duration: 0.5s;
        animation-fill-mode: both;
        animation-name: zoom;
    }

    .zoom-leave-active {
        animation-direction: reverse;
    }

    @keyframes zoom {
        from {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }

        100% {
            opacity: 1;
        }
    }
</style>
