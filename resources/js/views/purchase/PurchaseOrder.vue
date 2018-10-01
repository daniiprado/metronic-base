<template>
    <draggable-row>
        <div class="col-lg-12">
            <portlet @onPortlet="onPortlet" id="m_portlet_tools_modules" :title="lang.choice('pages.purchase_order.title', 2)">
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
                                <router-link class="m-nav__link" :to="{ name: 'purchase.orders.create' }">
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
    import {PurchaseOrder} from "../../services/models/PurchaseOrder";
    import {API} from "../../services/Api";
    import swal from 'sweetalert2'
    import moment from 'moment-timezone';

    export default {
        name: "PurchaseOrder",
        data: () => {
            return {
                lang: lang,
                selected: [],
                portlet: null,
                form: new PurchaseOrder({
                    delivery_address: null,
                    delivery_at: null,
                    requested_at: null,
                    status_id: null,
                }),
                datatable: null,
                options: {
                    ajax: {
                        url: API.END_POINTS.PURCHASE.PURCHASE_ORDER.DATATABLE,
                    },
                    columns: [
                        {
                            data: 'id',
                            name: 'id',
                            width: '5%',
                        },
                        {
                            data: 'delivery_address',
                            name: 'delivery_address',
                            title: lang.get('validation.attributes.delivery_address').capitalize(),
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                        },
                        {
                            data: 'user',
                            name: 'user',
                            title: lang.get('validation.attributes.user').capitalize(),
                            searchable: true,
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                        },
                        {
                            data: 'status',
                            name: 'status',
                            title: lang.get('validation.attributes.status').capitalize(),
                            searchable: true,
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                        },
                        {
                            data: 'products_order_count',
                            name: 'products_order_count',
                            title: lang.get('validation.attributes.products_order_count').capitalize(),
                            sortable: false,
                            filterable: false, // disable or enable filtering
                            searchable: false,
                            width: '20%',
                        },
                        {
                            data: 'delivery_at',
                            name: 'delivery_at',
                            title: lang.get('validation.attributes.delivery_at').capitalize(),
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                            render: function (data, type, row) {
                                return moment( data ).isValid() ? moment(data).format('YYYY-MM-DD') : null;
                            }
                        },
                        {
                            data: 'requested_at',
                            name: 'requested_at',
                            title: lang.get('validation.attributes.requested_at').capitalize(),
                            sortable: true,
                            filterable: true, // disable or enable filtering
                            width: '20%',
                            render: function (data, type, row) {
                                return moment( data ).isValid() ? moment(data).format('YYYY-MM-DD') : null;
                            }
                        },
                        {
                            data: 'status_id',
                            name: 'status_id',
                            visible: false,
                        },
                        {
                            data: 'user_id',
                            name: 'user_id',
                            visible: false,
                        }
                    ],
                    buttons: [
                        {
                            extend: 'print',
                            exportOptions: {
                                columns: [ 1, 2, 3, 4, 5 ]
                            }
                        },
                        {
                            extend: 'copyHtml5',
                            exportOptions: {
                                columns: [ 1, 2, 3, 4, 5 ]
                            }
                        },
                        {
                            extend: 'excelHtml5',
                            exportOptions: {
                                columns: [ 1, 2, 3, 4, 5 ]
                            }
                        },
                        {
                            extend: 'csvHtml5',
                            exportOptions: {
                                columns: [ 1, 2, 3, 4, 5 ]
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            orientation: 'portrait',
                            pageSize: 'LETTER',
                            exportOptions: {
                                columns: [ 1, 2, 3, 4, 5 ]
                            }
                        },
                    ],
                }
            }
        },
        methods: {
            /** Actions for Portlet **/
            onPortlet: function (portlet) {
                this.portlet = portlet;
                if ( this.portlet !== null ) {
                    this.onReload();
                }
            },
            onReload: function () {
                let that = this;
                this.portlet.on('reload', function () {
                    that.selected = [];
                    that.datatable.ajax.reload(false);
                });
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
                //this.$router.push({ name: 'products.edit', params: { id: this.selected[0].id } })
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
