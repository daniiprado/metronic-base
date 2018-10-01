<template>
    <div class="m-wizard m-wizard--2 m-wizard--success" :id="id">

        <!--begin: Message container -->
        <div class="m-portlet__padding-x">
            <slot name="message"></slot>
        </div>

        <!--end: Message container -->

        <!--begin: Form Wizard Head -->
        <div class="m-wizard__head m-portlet__padding-x">

            <!--begin: Form Wizard Progress -->
            <div class="m-wizard__progress">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <!--end: Form Wizard Progress -->

            <!--begin: Form Wizard Nav -->
            <div class="m-wizard__nav">
                <div class="m-wizard__steps">
                    <slot name="steps"></slot>
                </div>
            </div>

            <!--end: Form Wizard Nav -->
        </div>

        <!--end: Form Wizard Head -->

        <!--begin: Form Wizard Form-->
        <div class="m-wizard__form">
            <!--
            1) Use m-form--label-align-left class to alight the form input lables to the right
            2) Use m-form--state class to highlight input control borders on form validation
            -->
            <slot></slot>
        </div>

        <!--end: Form Wizard Form-->
    </div>
</template>

<script>
    export default {
        name: "PortletWizard",
        props: {
            id: {
                type: String,
                default: 'm_wizard'
            }
        },
        mounted: function () {

            this.$emit('onWizard', new mWizard( this.id , {
                startStep: 1
            }));
        }
    }
</script>

<style scoped>

</style>
