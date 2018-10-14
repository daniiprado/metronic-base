<template>
    <div class="m-grid__item m-grid__item--fluid m-grid  m-error-1" :style="`background-image: url(${bg});`">
        <div class="m-error_container">
            <span class="m-error_number">
                <h1>404</h1>
            </span>
            <p class="m-error_desc">
                OOPS! Something went wrong here
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "error-page",
        data: () => {
            return {
                bg: require('./../../assets/img/error/bg1.jpg')
            }
        }
    }
</script>

<style scoped>

</style>