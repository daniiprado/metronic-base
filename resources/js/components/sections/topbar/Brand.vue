<!--
  - Copyright (c) 2017 - 2018. Daniel Prado. All Rights Reserved. All material on this project, including design, text, images, logos, code and sounds, are owned by Daniel Prado, either through copyright or trademark, unless otherwise indicated. Content may not be copied, reproduced, transmitted, distributed, downloaded or transferred in any form or by any means without Daniel Prado's prior written consent, and with express attribution to Daniel Prado. The only exception is that one temporary copy may be downloaded into a single computer's memory and one unaltered permanent copy may be used by the viewer for personal and non-commercial use only, with an attached copy of Daniel Prado's Disclaimer Notice. No part of the downloaded copy may be subsequently reproduced, disseminated or transferred. Copyright infringement is a violation of federal law subject to criminal and civil penalties. (For permission to reprint, please contact Daniel Prado at (+571) 318-603-7095 or via email at danii.prado@outlook.com.ar)
  -->

<template>
    <!-- BEGIN: Brand -->
    <div class="m-stack__item m-brand  m-brand--skin-dark ">
        <div class="m-stack m-stack--ver m-stack--general">
            <div class="m-stack__item m-stack__item--middle m-brand__logo">
                <router-link class="m-brand__logo-wrapper" :to="{name: 'home'}">
                    <img :alt="brand" :src="logo"/>
                </router-link>
            </div>
            <div class="m-stack__item m-stack__item--middle m-brand__tools">
                <!-- BEGIN: Left Aside Minimize Toggle -->
                <a href="javascript:;" id="m_aside_left_minimize_toggle"
                   class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block  ">
                    <span></span>
                </a>
                <!-- END -->
                <!-- BEGIN: Responsive Aside Left Menu Toggler -->
                <a href="javascript:;" id="m_aside_left_offcanvas_toggle"
                   class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
                    <span></span>
                </a>
                <!-- END -->
                <!-- BEGIN: Responsive Header Menu Toggler -->
                <a id="m_aside_header_menu_mobile_toggle" href="javascript:;"
                   class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                    <span></span>
                </a>
                <!-- END -->
                <!-- BEGIN: Topbar Toggler -->
                <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;"
                   class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                    <i class="flaticon-more"></i>
                </a>
                <!-- BEGIN: Topbar Toggler -->
            </div>
        </div>
    </div>
    <!-- END: Brand -->
</template>

<script>
    export default {
        name: "Brand",
        data: () => {
            return {
                brand: 'Contingencias',
                logo: require('./../../../assets/img/logos/logo_default_dark.png')
            }
        }
    }
</script>

<style scoped>

</style>
