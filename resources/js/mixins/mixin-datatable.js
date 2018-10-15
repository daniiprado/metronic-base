import Vue from 'vue';
import Auth from './../packages/auth/Auth'
import store from "./../store";
Vue.use(Auth);
export const mixinDataTable = {
    name: 'mixin-data-table',
    data: () => {
        return {
            lang: Cookies.get('lang') || 'es',
            langSource: {
                es: {
                    sProcessing: "Procesando...",
                    sLengthMenu: "Mostrar _MENU_ registros",
                    sZeroRecords: "No se encontraron resultados",
                    sEmptyTable: "Ningún dato disponible en esta tabla",
                    sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                    sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                    sInfoPostFix: "",
                    sSearch: "Buscar:",
                    sUrl: "",
                    sInfoThousands: ",",
                    sLoadingRecords: "Cargando...",
                    language: {
                        paginate: {
                            first: '<i class="la la-angle-double-left"></i>',
                            last: '<i class="la la-angle-double-right"></i>',
                            next: '<i class="la la-angle-right"></i>',
                            previous: '<i class="la la-angle-left"></i>'
                        }
                    },
                    oAria: {
                        sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                        sSortDescending: ": Activar para ordenar la columna de manera descendente",
                    },
                },
                en: {
                    sEmptyTable: "No data available in table",
                    sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                    sInfoEmpty: "Showing 0 to 0 of 0 entries",
                    sInfoFiltered: "(filtered from _MAX_ total entries)",
                    sInfoPostFix: "",
                    sInfoThousands: ",",
                    sLengthMenu: "Show _MENU_ entries",
                    sLoadingRecords: "Loading...",
                    sProcessing: "Processing...",
                    sSearch: "Search:",
                    sZeroRecords: "No matching records found",
                    language: {
                        paginate: {
                            first: '<i class="la la-angle-double-left"></i>',
                            last: '<i class="la la-angle-double-right"></i>',
                            next: '<i class="la la-angle-right"></i>',
                            previous: '<i class="la la-angle-left"></i>'
                        }
                    },
                    oAria: {
                        sSortAscending: ": activate to sort column ascending",
                        sSortDescending: ": activate to sort column descending"
                    }
                },
            },
            settings: {
                dom:
                    "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                    "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                ajax: {
                    beforeSend: null,
                    error: function (XMLHttpRequest) {
                        mApp.unblockPage();
                        if (XMLHttpRequest.status === 401) {
                            store.dispatch('logout')
                                .then(() => {
                                    Vue.auth.destroyCookie()
                                })
                                .then(() => {
                                    window.location.reload();
                                })
                        }
                    }
                },
                columnDefs: [
                    {
                        targets: 0,
                        orderable: false,
                        checkboxes: {
                            selectRow: true,
                            stateSave: true
                        },
                        render: function(data, type, full, meta) {
                            return `<label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                                        <input type="checkbox" value="" class="m-checkable">
                                        <span></span>
                                    </label>`;
                        },
                    },
                ],
                order: [[1, 'asc']],
                rowId: 'id',
                stateSave: true,
                responsive: true,
                colReorder: true,
                deferRender: true,
                processing: true,
                serverSide: true,
                searchDelay: 500,
                select: {
                    style: 'multi',
                    selector: 'td:first-child .m-checkable',
                    blurable: true,
                },
                headerCallback: function(thead, data, start, end, display) {
                    thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand">
                        <input type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
                },
                initComplete: function () {
                    mApp.unblockPage();
                },
                buttons: [
                    'print',
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5',
                ],
            },
        }
    },
    mounted: function () {
        this.settingsDataTable();
    },
    methods: {
        settingsDataTable: function () {
            if (mUtil.isRTL()) {
                this.langSource[ this.lang ] = {
                    language: {
                        paginate: {
                            first: '<i class="la la-angle-double-right"></i>',
                            last: '<i class="la la-angle-double-left"></i>',
                            next: '<i class="la la-angle-left"></i>',
                            previous: '<i class="la la-angle-right"></i>'
                        }
                    },
                }
            }
            let self = this;

            this.settings.language = self.langSource[ self.lang ];
            this.settings.ajax.beforeSend = function (request) {
                mApp.blockPage();
                request.setRequestHeader("Authorization", self.$store.getters.getToken);
                request.setRequestHeader("Accept", 'application/json');
                request.setRequestHeader("Content-Type", 'application/json');
            };
            $.extend( true, $.fn.dataTable.defaults, self.settings );
        },
    }
};
