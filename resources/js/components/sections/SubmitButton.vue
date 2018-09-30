<template>
    <button type="submit"
            :class="{ 'm-loader m-loader--right m-loader--light': loading }"
            :disabled="loading || form.errors.any() || errors.any()"
            class="btn btn-primary">
        Submit
    </button>
</template>

<script>
    export default {
        name: "SubmitButton",
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            form: {
                type: [Array, Object],
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
