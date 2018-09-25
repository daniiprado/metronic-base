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
                    <action-item>
                        <portlet-tool></portlet-tool>
                    </action-item>
                    <action-item>
                        <portlet-tool tool="reload"></portlet-tool>
                    </action-item>
                    <action-item>
                        <portlet-tool tool="fullscreen"></portlet-tool>
                    </action-item>
                    <slot name="actions"></slot>
                </ul>
            </div>
        </div>
        <slot></slot>
    </div>
    <!--end::Portlet-->
</template>

<script>
    export default {
        name: "PortletForm",
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
        },
        mounted: function () {
            mApp.initPortlet(this.id, {});
            this.$nextTick(() => {
                this.$emit('onPortletForm', new mPortlet(this.id))
            })
        }
    }
</script>

<style scoped>

</style>
