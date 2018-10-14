<template>
    <!--begin::Portlet-->
    <div class="m-portlet m-portlet--mobile m-portlet--sortable" :id="id"  m-portlet="true">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon">
                        <i :class="icon"></i>
                    </span>
                    <h3 class="m-portlet__head-text m--font-brand" v-text="title"></h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
                <ul class="m-portlet__nav">
                    <li class="m-portlet__nav-item">
                        <a href="javascript:;"  m-portlet-tool="toggle"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-angle-down"></i>
                        </a>
                    </li>
                    <li class="m-portlet__nav-item">
                        <a href="javascript:;"  m-portlet-tool="reload"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-refresh"></i>
                        </a>
                    </li>
                    <li class="m-portlet__nav-item">
                        <a href="javascript:;"  m-portlet-tool="fullscreen"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-expand"></i>
                        </a>
                    </li>
                    <slot name="actions"></slot>
                </ul>
            </div>
        </div>
        <div class="m-portlet__body">
            <div :class="{ 'm-scrollable': isScrollable }"
                 :data-scrollable="isScrollable"
                 :data-height="scrollHeight"
                 :data-scrollbar-shown="isScrollable">
                <slot></slot>
            </div>
        </div>
        <div v-if="hasFooter" class="m-portlet__foot">
            <slot name="footer"></slot>
        </div>
    </div>
    <!--end::Portlet-->
</template>

<script>
    export default {
        name: "Portlet",
        props: {
            id: {
                type: String,
                default: 'm_portlet_tools'
            },
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: 'flaticon-cogwheel-2'
            },
            hasFooter: {
                type: Boolean,
                default: false
            },
            isScrollable: {
                type: Boolean,
                default: false
            },
            scrollHeight: {
                type: Number,
                default: 300
            }
        },
        mounted: function () {
            mApp.initPortlet(this.id, {});
            this.$nextTick(() => {
                this.$emit('onPortlet', new mPortlet(this.id))
            })
        }
    }
</script>

<style scoped>

</style>
