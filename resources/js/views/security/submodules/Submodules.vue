<template>
    <draggable-row>
        <div class="col-lg-12">
            <portlet @onPortlet="onPortlet" id="m_portlet_tools_modules" :title="lang.choice('pages.submodules.title', 2)">
                <template slot="actions">
                    <action-item v-if="selected.length === 1">
                        <a href="javascript:;"
                           @click.prevent="onEdit"
                           data-skin="light" data-toggle="m-tooltip" data-placement="top" title="" :data-original-title="lang.get('pages.buttons.edit')"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-pencil"></i>
                        </a>
                    </action-item>
                    <action-item v-if="selected.length > 0" >
                        <a href="javascript:;"
                           data-skin="light" data-toggle="m-tooltip" data-placement="top" title="" :data-original-title="lang.get('pages.buttons.delete')"
                           @click.prevent="onDelete"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-trash"></i>
                        </a>
                    </action-item>
                    <portlet-dropdown-actions>
                        {{ lang.get('pages.buttons.export_tools') }}
                        <template slot="items">
                            <li class="m-nav__item">
                                <router-link class="m-nav__link" :to="{ name: 'modules.create' }">
                                    <i class="m-nav__link-icon la la-plus-circle"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.add')">Create</span>
                                </router-link>
                            </li>
                            <li v-if="selected.length === 1" class="m-nav__item">
                                <a href="#" class="m-nav__link">
                                    <i class="m-nav__link-icon la la-pencil"></i>
                                    <span class="m-nav__link-text" @click.prevent="onEdit" v-text="lang.get('pages.buttons.edit')">Edit</span>
                                </a>
                            </li>
                            <li v-if="selected.length > 0"  @click.prevent="onDelete" class="m-nav__item">
                                <a href="#" class="m-nav__link">
                                    <i class="m-nav__link-icon la la-trash"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.delete')">Delete</span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="#" class="m-nav__link" @click.prevent="onPrint" id="export_print">
                                    <i class="m-nav__link-icon la la-print"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.print')">Print</span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="#" class="m-nav__link" @click.prevent="onCopy" id="export_copy">
                                    <i class="m-nav__link-icon la la-copy"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.copy')">Copy</span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="#" class="m-nav__link" @click.prevent="onExcel" id="export_excel">
                                    <i class="m-nav__link-icon la la-file-excel-o"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.excel')">Excel</span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="#" class="m-nav__link" @click.prevent="onCSV" id="export_csv">
                                    <i class="m-nav__link-icon la la-file-text-o"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.csv')">CSV</span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="#" class="m-nav__link" @click.prevent="onPDF" id="export_pdf">
                                    <i class="m-nav__link-icon la la-file-pdf-o"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.pdf')">PDF</span>
                                </a>
                            </li>
                        </template>
                    </portlet-dropdown-actions>
                </template>
                <data-table id="m_datatable_countries" :options="options" @onDatatable="onDatatable" v-model="selected">
                </data-table>
            </portlet>
        </div>
        <div class="col-lg-12">
            <empty-portlet></empty-portlet>
        </div>
    </draggable-row>
</template>

<script>
    import swal from 'sweetalert2'
    import {Submodule} from "../../../services/models/Submodule";

    export default {
        name: "Submodules",
        data: () => {
            return {
                lang: lang,
                selected: [],
                portlet: null,
                datatable: null,
                options: {
                    ajax: {
                        url: '/api/submodule',
                    },
                    columns: [
                        {
                            data: 'id',
                            name: 'id',
                            width: '5%',
                        },
                        {
                            data: 'name',
                            name: 'name',
                            title: lang.choice('pages.submodules.title', 2),
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                        },
                        {
                            data: 'module',
                            name: 'module',
                            title: lang.choice('pages.modules.title', 2),
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                        },
                        {
                            data: 'module_id',
                            name: 'module_id',
                            visible: false
                        }
                    ],
                    buttons: [
                        {
                            extend: 'print',
                            exportOptions: {
                                columns: [ 1, 2 ]
                            }
                        },
                        {
                            extend: 'copyHtml5',
                            exportOptions: {
                                columns: [ 1, 2 ]
                            }
                        },
                        {
                            extend: 'excelHtml5',
                            exportOptions: {
                                columns: [ 1, 2 ]
                            }
                        },
                        {
                            extend: 'csvHtml5',
                            exportOptions: {
                                columns: [ 1, 2 ]
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            orientation: 'portrait',
                            pageSize: 'LETTER',
                            exportOptions: {
                                columns: [ 1, 2 ]
                            }
                        },
                    ],
                },
                form: new Submodule({
                    name: null,
                    module_id: null
                })
            }
        },
        mounted: function () {
            mApp.initTooltips();
        },
        methods: {
            /** Actions for Portlet **/
            onPortlet: function (portlet) {
                this.portlet = portlet;
                this.onReload();
            },
            onReload: function () {
                if ( this.portlet !== null ) {
                    let that = this;
                    this.portlet.on('reload', function () {
                        that.datatable.ajax.reload(false);
                    });
                }
            },
            /** Actions for Datatable **/
            onDatatable: function (datatable) {
                this.datatable = datatable;
            },
            onPDF: function () {
                this.datatable.button(4).trigger();
            },
            onCSV: function () {
                this.datatable.button(3).trigger();
            },
            onExcel: function () {
                this.datatable.button(2).trigger();
            },
            onCopy: function () {
                this.datatable.button(1).trigger();
            },
            onPrint: function () {
                this.datatable.button(0).trigger();
            },
            onDelete: function () {
                let that = this;
                let message = this.lang.choice('pages.messages.comfirm_delete', this.selected.length, { quantity: this.selected.length } );
                swal({
                    title: this.lang.get('pages.messages.warning'),
                    text: message,
                    type: "warning",
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        that.selected.map( (item) => {
                            that.form.destroy( item.id )
                                .then((response) => {
                                    that.datatable.ajax.reload(false);
                                    console.log( response.message )
                                })
                                .catch((error) => {
                                    swal(error.error, {
                                        type: "success",
                                    });
                                })
                        })
                    },
                    allowOutsideClick: () => !swal.isLoading()
                }).then((result) => {
                    that.datatable.ajax.reload(false);
                    that.selected = [];
                    if (result.value) {
                        swal({
                            title: this.lang.get('pages.messages.success'),
                            text: this.lang.get('pages.responses.deleted'),
                            type: "success",
                        })
                    }
                })
            },
            onEdit: function () {
                this.$router.push({ name: 'submodules.edit', params: { id: this.selected[0].id } })
            }
        },
        beforeDestroy: function () {
            this.datatable.destroy();
            this.selected = [];
            this.portlet = null;
            this.datatable = null;

        }
    }
</script>

<style scoped>

</style>
