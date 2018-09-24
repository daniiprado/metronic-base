<template>
    <div v-if="show" class="form-control-feedback">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        props: {
            show: {
                type: Boolean,
                default: false
            },
        }
    }
</script>

<style scoped>

</style>
