<template>
    <li class="m-portlet__nav-item m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push"
        m-dropdown-toggle="hover">
        <a href="#" class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill   m-dropdown__toggle">
            <i class="la la-ellipsis-v"></i>
        </a>
        <div class="m-dropdown__wrapper">
            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="m-nav">
                            <li class="m-nav__section m-nav__section--first">
                                <span class="m-nav__section-text"><slot></slot></span>
                            </li>
                            <slot name="items"></slot>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "PortletDropDownActions"
    }
</script>

<style scoped>

</style>
