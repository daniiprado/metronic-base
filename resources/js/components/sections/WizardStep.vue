<template>
    <div class="m-wizard__step" :class="{ 'm-wizard__step--current': current }" :m-wizard-target="target">
        <a href="javascript:;" class="m-wizard__step-number">
            <span><i :class="icon"></i></span>
        </a>
        <div class="m-wizard__step-info">
            <div class="m-wizard__step-title">
                <slot></slot>
            </div>
            <div class="m-wizard__step-desc">
                <slot name="desc"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WizardStep",
        props: {
            icon: {
                type: String,
                default: 'fa  flaticon-placeholder'
            },
            current: {
                type: Boolean,
                default: false,
            },
            target: {
                type: String,
                default: 'm_wizard_form_step_1'
            }
        },
    }
</script>

<style scoped>

</style>
