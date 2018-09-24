<template>
        <!-- BEGIN: Horizontal Menu -->
        <div id="m_header_menu"
             class="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-light m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark ">
            <ul class="m-menu__nav  m-menu__nav--submenu-arrow ">
                <li class="m-menu__item  m-menu__item--submenu m-menu__item--rel" m-menu-submenu-toggle="click" m-menu-link-redirect="1" aria-haspopup="true">
                    <a href="javascript:;" class="m-menu__link m-menu__toggle" title="Non functional dummy link">
                        <i class="m-menu__link-icon flaticon-add"></i>
                        <span class="m-menu__link-text">Actions</span>
                        <i class="m-menu__hor-arrow la la-angle-down"></i>
                        <i class="m-menu__ver-arrow la la-angle-right"></i>
                    </a>
                    <div class="m-menu__submenu m-menu__submenu--classic m-menu__submenu--left">
                        <span class="m-menu__arrow m-menu__arrow--adjust"></span>
                        <ul class="m-menu__subnav">
                            <li class="m-menu__item " aria-haspopup="true">
                                <a href="javascript:;" class="m-menu__link ">
                                    <i class="m-menu__link-icon flaticon-file"></i>
                                    <span class="m-menu__link-text">Create New Post</span>
                                </a>
                            </li>
                            <slot></slot>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- END: Horizontal Menu -->
</template>

<script>
    export default {
        name: "HorMenu"
    }
</script>

<style scoped>

</style>
