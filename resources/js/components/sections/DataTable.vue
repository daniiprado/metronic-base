<template>
    <!--begin: Datatable -->
    <table class="table table-striped- table-bordered table-hover table-checkable" :id="id">
        <slot></slot>
    </table>
    <!--ends: Datatable -->
</template>

<script>
    import {mixinDataTable} from "../../mixins/mixin-datatable";
    export default {
        name: "DataTable",
        mixins: [ mixinDataTable ],
        props: {
            id: {
                type: String,
                default: 'm_data_table',
            },
            options: {
                type: [Array, Object],
                required: true
            }
        },
        data: function () {
            return {
                table: null,
                selected: []
            }
        },
        mounted: function () {
            this.datatable();
            this.onSelect();
            this.onPage();
        },
        updated: function () {
            this.table.redraw();
        },
        methods: {
            datatable: function () {
                this.table = $('#'+ this.id ).DataTable(this.options);
                this.$emit('onDatatable', this.table);
            },
            onSelect: function () {
                let that = this;
                this.table.on('change', '.m-group-checkable', function() {
                    let set = $(this).closest('table').find('td:first-child .m-checkable');
                    let checked = $(this).is(':checked');
                    that.selected = [];
                    $(set).each(function() {
                        if (checked) {
                            $(this).prop('checked', true);
                            that.table.rows($(this).closest('tr')).select();
                            that.selected.push( that.table.row( $(this).closest('tr') ).data() );
                        }
                        else {
                            $(this).prop('checked', false);
                            that.table.rows($(this).closest('tr')).deselect();
                            that.selected = that.selected.filter((select) => {
                                return select.id !== data.id ;
                            });
                        }
                    });
                    that.$emit('input', that.selected);
                });

                this.table.on('click', '.m-checkable', function () {
                    let checked = $(this).is(':checked');
                    let data = null;
                    if (checked) {
                        $(this).prop('checked', true);
                        that.table.row($(this).closest('tr')).select();
                        data = that.table.row( $(this).closest('tr') ).data();
                        that.selected.push( that.table.row( $(this).closest('tr') ).data() );
                    }
                    else {
                        $(this).prop('checked', false);
                        that.table.row($(this).closest('tr')).deselect();
                        data = that.table.row( $(this).closest('tr') ).data();
                        that.selected = that.selected.filter((select) => {
                            return select.id !== data.id ;
                        })
                    }
                    that.$emit('input', that.selected);
                });
            },
            onPage: function () {
                let that = this;
                this.table.on('page', function () {
                    that.selected = [];
                    that.$emit('input', that.selected);
                })
            },
        },
        beforeDestroy: function () {
            this.table.destroy();
        }
    }
</script>

<style scoped>

</style>
