<!--
  - Copyright (c) 2017 - 2018. Daniel Prado. All Rights Reserved. All material on this project, including design, text, images, logos, code and sounds, are owned by Daniel Prado, either through copyright or trademark, unless otherwise indicated. Content may not be copied, reproduced, transmitted, distributed, downloaded or transferred in any form or by any means without Daniel Prado's prior written consent, and with express attribution to Daniel Prado. The only exception is that one temporary copy may be downloaded into a single computer's memory and one unaltered permanent copy may be used by the viewer for personal and non-commercial use only, with an attached copy of Daniel Prado's Disclaimer Notice. No part of the downloaded copy may be subsequently reproduced, disseminated or transferred. Copyright infringement is a violation of federal law subject to criminal and civil penalties. (For permission to reprint, please contact Daniel Prado at (+571) 318-603-7095 or via email at danii.prado@outlook.com.ar)
  -->

<template>
    <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
        <a href="javascript:;" class="m-nav__link m-dropdown__toggle">
            <span class="m-topbar__userpic">
                <avatar class="m--img-rounded m--marginless" :size="41" :alt="user.username" :username="user.username"></avatar>
            </span>
            <span class="m-topbar__username m--hide" v-text="user.username"></span>
        </a>
        <div class="m-dropdown__wrapper">
            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__header m--align-center" :style="bg">
                    <div class="m-card-user m-card-user--skin-dark">
                        <div class="m-card-user__pic">
                            <avatar class="m--img-rounded m--marginless" :alt="user.username" :username="user.username"></avatar>
                        </div>
                        <div class="m-card-user__details">
                        <span class="m-card-user__name m--font-weight-500">
                            {{ user.username }}
                        </span>
                            <a href="" class="m-card-user__email m--font-weight-300 m-link">
                                {{ user.email }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="m-nav m-nav--skin-light">
                            <li class="m-nav__section m--hide"><span class="m-nav__section-text">Section</span></li>
                            <li class="m-nav__item">
                                <a href="?page=header/profile" class="m-nav__link">
                                    <i class="m-nav__link-icon flaticon-profile-1"></i>
                                    <span class="m-nav__link-title">
                                        <span class="m-nav__link-wrap">
                                            <span class="m-nav__link-text">My Profile</span>
                                            <span class="m-nav__link-badge">
                                                <span class="m-badge m-badge--success">2</span></span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li class="m-nav__separator m-nav__separator--fit"></li>

                            <li class="m-nav__item">
                                <a href="javascript:;" @click.prevent="onLogout" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                                    Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import Avatar from 'vue-avatar'
    import {API} from "../../../services/Api";

    export default {
        name: "TopBarUserProfile",
        components: {
            Avatar
        },
        data: () => {
            return {
                user: {
                    username: API.APP_NAME,
                    email: 'root@app.com',
                },
                bg: 'background: url('+ require('./../../../assets/img/misc/user_profile_bg.jpg') +'); background-size: cover;'
            }
        },
        methods: {
            onLogout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$auth.destroyCookie()
                    })
                    .then(() => {
                        window.location.reload()
                    });
            }
        }
    }
</script>

<style scoped>

</style>
