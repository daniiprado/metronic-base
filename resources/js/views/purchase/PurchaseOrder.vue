<template>
    <draggable-row>
        <div class="col-lg-12">
            <portlet @onPortlet="onPortlet" id="m_portlet_tools_modules" :title="lang.choice('pages.purchase_order.title', 2)">
                <template slot="actions">
                    <action-item v-if="selected.length === 1 && $auth.can('view-purchase-order-details')">
                        <a href="javascript:;"
                           @click.prevent="onDetails"
                           data-skin="dark" data-toggle="m-tooltip" data-placement="top" :title="lang.get('pages.buttons.details')"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-eye"></i>
                        </a>
                    </action-item>
                    <action-item v-if="selected.length === 1 && $auth.can('edit-purchase-order')">
                        <a href="javascript:;"
                           @click.prevent="onEdit"
                           data-skin="dark" data-toggle="m-tooltip" data-placement="top" :title="lang.get('pages.buttons.edit')"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-pencil"></i>
                        </a>
                    </action-item>
                    <action-item v-if="selected.length > 0 && $auth.can('delete-purchase-order')" >
                        <a href="javascript:;"
                           data-skin="dark" data-toggle="m-tooltip" data-placement="top" :title="lang.get('pages.buttons.delete')"
                           @click.prevent="onDelete"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="la la-trash"></i>
                        </a>
                    </action-item>
                    <action-item v-if="selected.length > 0 && $auth.can('generate-qrcode')" >
                        <a href="#m_modal_qr" data-toggle="modal" data-target="#m_modal_qr"
                           @click.prevent="onQR"
                           data-skin="dark"
                           data-placement="top" title=""
                           :data-original-title="lang.get('pages.buttons.qr')"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="fas fa-qrcode"></i>
                        </a>
                    </action-item>
                    <action-item v-if="selected.length > 0 && $auth.can('generate-barcodes')" >
                        <a href="#m_modal_bar" data-toggle="modal" data-target="#m_modal_bar"
                           @click.prevent="onBarcode"
                           data-skin="dark" data-placement="top" title="" :data-original-title="lang.get('pages.buttons.bar')"
                           class="m-portlet__nav-link btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                            <i class="fas fa-barcode"></i>
                        </a>
                    </action-item>
                    <portlet-dropdown-actions>
                        {{ lang.get('pages.buttons.export_tools') }}
                        <template slot="items">
                            <li v-if="$auth.can('create-purchase-order')" class="m-nav__item">
                                <router-link class="m-nav__link" :to="{ name: 'purchase.orders.create' }">
                                    <i class="m-nav__link-icon la la-plus-circle"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.add')">Create</span>
                                </router-link>
                            </li>
                            <li v-if="selected.length === 1 && $auth.can('edit-purchase-order')" class="m-nav__item">
                                <a href="#" class="m-nav__link">
                                    <i class="m-nav__link-icon la la-pencil"></i>
                                    <span class="m-nav__link-text" @click.prevent="onEdit" v-text="lang.get('pages.buttons.edit')">Edit</span>
                                </a>
                            </li>
                            <li v-if="selected.length > 0 && $auth.can('delete-purchase-order')"  @click.prevent="onDelete" class="m-nav__item">
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
                            <li v-if="selected.length > 0 && $auth.can('generate-qrcode')" class="m-nav__item">
                                <a href="#m_modal_qr" data-toggle="modal" data-target="#m_modal_qr" class="m-nav__link" @click.prevent="onQR" id="export_qr">
                                    <i class="m-nav__link-icon fas fa-qrcode"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.qr')">QR</span>
                                </a>
                            </li>
                            <li v-if="selected.length > 0 && $auth.can('generate-barcodes')" class="m-nav__item">
                                <a href="#m_modal_bar" data-toggle="modal" data-target="#m_modal_bar" class="m-nav__link" @click.prevent="onBarcode" id="export_bar">
                                    <i class="m-nav__link-icon fas fa-barcode"></i>
                                    <span class="m-nav__link-text" v-text="lang.get('pages.buttons.bar')">Barcode</span>
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

        <!--begin::Modal-->
        <div v-if="$auth.can('generate-qrcode')" class="modal fade" id="m_modal_qr" tabindex="-1" role="dialog" aria-labelledby="log_content" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">QR Codes</h5>
                        <button type="button" @click="onClose" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" id="print_that">
                            <div class="col-md-6" v-for="qr in qr_codes">
                                <p>Número de Orden: {{ qr.id }}</p>
                                <qrcode :value="qr.url" :options="{ size: 300, level: 'H' }" tag="img"></qrcode>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="onPrintImages('print_that')" class="btn btn-primary" v-text="lang.get('pages.buttons.print')">Print</button>
                        <button type="button" data-dismiss="modal"  @click="onClose" class="btn btn-default" v-text="lang.get('pages.buttons.cancel')">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end::Modal-->

        <!--begin::Modal-->
        <div v-if="$auth.can('generate-barcodes')" class="modal fade" id="m_modal_bar" tabindex="-1" role="dialog" aria-labelledby="log_content" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="">Barcodes</h5>
                        <button type="button" class="close" @click="onClose" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" id="print_bar">
                            <div class="col-md-6" v-for="bar in bar_codes">
                                <p>Número de Orden: {{ bar.id }}</p>
                                <vue-barcode :value="bar.id"></vue-barcode>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="onPrintImages('print_bar')" class="btn btn-primary" v-text="lang.get('pages.buttons.print')">Print</button>
                        <button type="button" data-dismiss="modal"  @click="onClose" class="btn btn-default" v-text="lang.get('pages.buttons.cancel')">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end::Modal-->

    </draggable-row>
</template>

<script>
    import VueBarcode from 'vue-barcode';
    import {PurchaseOrder} from "../../services/models/PurchaseOrder";
    import {API} from "../../services/Api";
    import swal from 'sweetalert2'
    import moment from 'moment-timezone';
    import {MixinTooltip} from "../../mixins/mixin-tooltip";

    export default {
        name: "PurchaseOrder",
        mixins: [ MixinTooltip ],
        components: {
            VueBarcode
        },
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
                },
                qr_codes: [],
                bar_codes: [],
            }
        },
        mounted: function () {
            mApp.initTooltips();
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
            onQR: function () {
                this.qr_codes = this.selected.map((qr) => {
                    return {
                        'id': qr.id,
                        'url': window.location.protocol+'//'+ window.location.host + '/purchase-order/' + qr.id + '/products-order'
                    }
                });
            },
            onBarcode: function () {
                this.bar_codes = this.selected.map((qr) => {
                    return {
                        'id': qr.id,
                        'url': window.location.protocol+'//'+ window.location.host + '/purchase-order/' + qr.id + '/products-order'
                    }
                });
            },
            onPrintImages: function (id) {
                this.$htmlToPaper( id );
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

                                })
                                .catch((error) => {
                                    swal(error.error, {
                                        type: "error",
                                    });
                                })
                        });
                        that.selected = [];
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
                this.$router.push({ name: 'purchase.orders.edit', params: { id: this.selected[0].id } })
            },
            onDetails: function () {
                this.$router.push({ name: 'purchase.orders.details', params: { id: this.selected[0].id } })
            },
            onClose: function () {
                this.qr_codes  = [];
                this.bar_codes = [];
            }
        },
        watch: {
            selected: function (selected) {
                this.initTooltips();
            }
        },
        beforeDestroy: function () {
            this.datatable.destroy();
            this.selected  = [];
            this.qr_codes  = [];
            this.bar_codes = [];
            this.portlet = null;
            this.datatable = null;
        }
    }
</script>

<style scoped>

</style>
