<template>
    <draggable-row>
        <div class="col-lg-6">
            <portlet title="Dashboard">
                You are logged in Dashboard!.
            </portlet>
            <empty-portlet></empty-portlet>
        </div>
    </draggable-row>
</template>

<script>
    export default {
        name: "Dashboard",
        mounted: function () {
            console.log( this.$store.getters.authUser )
            console.log( this.$store.getters.userPermissions )
            console.log( this.$store.getters.userRoles )
            console.log( 'Role', this.$auth.hasRole('root') );
            console.log( 'Permissions', this.$auth.can("edit-module") );
        }
    }
</script>

<style scoped>

</style>
