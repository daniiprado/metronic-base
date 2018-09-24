<!--
  - Copyright (c) 2017 - 2018. Daniel Prado. All Rights Reserved. All material on this project, including design, text, images, logos, code and sounds, are owned by Daniel Prado, either through copyright or trademark, unless otherwise indicated. Content may not be copied, reproduced, transmitted, distributed, downloaded or transferred in any form or by any means without Daniel Prado's prior written consent, and with express attribution to Daniel Prado. The only exception is that one temporary copy may be downloaded into a single computer's memory and one unaltered permanent copy may be used by the viewer for personal and non-commercial use only, with an attached copy of Daniel Prado's Disclaimer Notice. No part of the downloaded copy may be subsequently reproduced, disseminated or transferred. Copyright infringement is a violation of federal law subject to criminal and civil penalties. (For permission to reprint, please contact Daniel Prado at (+571) 318-603-7095 or via email at danii.prado@outlook.com.ar)
  -->

<template>
    <li class="m-nav__item m-topbar__quick-actions m-topbar__quick-actions--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push m-dropdown--mobile-full-width m-dropdown--skin-light"
        m-dropdown-toggle="click">
        <a href="#" class="m-nav__link m-dropdown__toggle">
            <span class="m-nav__link-badge m-badge m-badge--dot m-badge--info m--hide"></span>
            <span class="m-nav__link-icon">
            <i class="flaticon-share"></i>
        </span>
        </a>
        <div class="m-dropdown__wrapper">
            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__header m--align-center"
                     :style="bg">
                    <span class="m-dropdown__header-title">Quick Actions</span> <span class="m-dropdown__header-subtitle">Shortcuts</span>
                </div>
                <div class="m-dropdown__body m-dropdown__body--paddingless">
                    <div class="m-dropdown__content">
                        <div class="data" data="false" data-height="380" data-mobile-height="200">
                            <div class="m-nav-grid m-nav-grid--skin-light">
                                <div class="m-nav-grid__row">
                                    <a href="#" class="m-nav-grid__item">
                                        <i class="m-nav-grid__icon flaticon-file"></i>
                                        <span class="m-nav-grid__text">Generate Report</span>
                                    </a>
                                    <a href="#" class="m-nav-grid__item">
                                        <i class="m-nav-grid__icon flaticon-time"></i>
                                        <span class="m-nav-grid__text">Add New Event</span>
                                    </a>
                                </div>
                                <div class="m-nav-grid__row">
                                    <a href="#" class="m-nav-grid__item">
                                        <i class="m-nav-grid__icon flaticon-folder"></i>
                                        <span class="m-nav-grid__text">Create New Task</span>
                                    </a>
                                    <a href="#" class="m-nav-grid__item">
                                        <i class="m-nav-grid__icon flaticon-clipboard"></i>
                                        <span class="m-nav-grid__text">Completed Tasks</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "TopBarQuickActions",
        data: () => {
            return {
                bg: 'background: url('+ require('./../../../assets/img/misc/quick_actions_bg.jpg') +'); background-size: cover;'
            }
        }
    }
</script>

<style scoped>

</style>
