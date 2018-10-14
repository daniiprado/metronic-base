<template>

    <div class="row">
        <div class="col-lg-12">
            <div class="m-portlet">
                <div class="m-portlet__body m-portlet__body--no-padding">
                    <div class="m-invoice-2" id="invoice">
                        <div class="m-invoice__wrapper">
                            <div class="m-invoice__head">
                                <div class="m-invoice__container m-invoice__container--centered">
                                    <div class="m-invoice__logo">
                                        <a href="javascript:;">
                                            <h1>{{ lang.choice('pages.purchase_order.title', 0, {prefix: ''}) }} #{{ purchase.id }}</h1>
                                        </a>
                                        <a href="javascript:;">
                                            <qrcode :value="qr" :options="{ size: 100, level: 'H' }" tag="img"></qrcode>
                                        </a>
                                    </div>
                                    <span class="m-invoice__desc">
                                        <span>{{ lang.choice('pages.company.title', 0, { prefix: '' }) }}: {{ purchase.provider.name }}</span>
                                        <span>{{ lang.get('validation.attributes.nit').capitalize() }}: {{ purchase.provider.nit }}</span>
                                    </span>
                                    <div class="m-invoice__items">
                                        <div class="m-invoice__item">
                                            <span class="m-invoice__subtitle">{{ lang.get('validation.attributes.requested_at').capitalize() }}</span>
                                            <span class="m-invoice__text">{{ humanize(purchase.requested_at) }}</span>
                                        </div>
                                        <div class="m-invoice__item">
                                            <span class="m-invoice__subtitle">{{ lang.get('validation.attributes.delivery_at').capitalize() }}</span>
                                            <span class="m-invoice__text">{{ humanize(purchase.delivery_at) }}</span>
                                        </div>
                                        <div class="m-invoice__item">
                                            <span class="m-invoice__subtitle">{{ lang.get('validation.attributes.address').capitalize() }}</span>
                                            <span class="m-invoice__text">{{ purchase.delivery_address }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-invoice__body m-invoice__body--centered">
                                <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th v-text="lang.get('validation.attributes.code').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.name').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.price').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.requested_quantity').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.picked').capitalize()"></th>
                                                    <th>Subtotal</th>
                                                    <th v-text="lang.get('validation.attributes.details').capitalize()"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="product in purchase.products_order">
                                                    <td scope="row" v-text="product.product_id"></td>
                                                    <td v-text="product.product.code"></td>
                                                    <td width="30%" v-text="product.product.name"></td>
                                                    <td v-text="`$ ${product.price}`"></td>
                                                    <td class="text-center" v-text="product.quantity"></td>
                                                    <td class="text-center" v-text="product.picked"></td>
                                                    <td class="m--font-danger" v-text="`$ ${product.subtotal}`"></td>
                                                    <!--
                                                    <td>
                                                        <span class="m-switch m-switch--sm m-switch--icon">
                                                            <label>
                                                                <input type="checkbox" disabled="disabled" :checked="product.received" name="">
                                                                <span></span>
                                                            </label>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="m-switch m-switch--sm m-switch--icon">
                                                            <label>
                                                                <input type="checkbox" disabled="disabled" :checked="product.transit" name="">
                                                                <span></span>
                                                            </label>
                                                        </span>
                                                    </td>
                                                    -->
                                                    <td>
                                                        <a @click="onDetails(product)" href="#m_modal_issue" data-toggle="modal" data-target="#m_modal_issue">
                                                            <span class="m-badge" :class="{'m-badge--danger': product.issues_count > 0, 'm-badge--metal': product.issues_count === 0}" v-text="product.issues_count">0</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            </div>
                            <div class="m-invoice__footer">
                                <div class="m-invoice__table  m-invoice__table--centered table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>{{ lang.get('validation.attributes.business_unity_id').capitalize() }}</th>
                                            <th>{{ lang.get('validation.attributes.status').capitalize() }}</th>
                                            <th>{{ lang.get('validation.attributes.user').capitalize() }}</th>
                                            <th>TOTAL</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{{ purchase.business_unity.name }}</td>
                                            <td>
                                                <a href="#m_modal_status" class="m-link m-link--state m-link--success" data-target="#m_modal_status" data-toggle="modal">
                                                    {{ purchase.status.name }}
                                                </a>
                                            </td>
                                            <td>{{ purchase.user.name }}</td>
                                            <td class="m--font-danger">$ {{ total }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="m_modal_issue" tabindex="-1" role="dialog" aria-labelledby="log_content" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <form v-if="details" @submit.prevent="onIssue" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="">{{ lang.get('validation.attributes.issue').capitalize() }}</h5>
                        <button type="button" @click="onClose" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="m-form">
                                    <div class="m-form__group form-group row">
                                        <label class="col-12 col-form-label">{{ `${lang.get('validation.attributes.product').capitalize()}: ${details.product.name}` }}</label>
                                    </div>
                                    <div class="m-form__group form-group row">
                                        <label class="col-6 col-form-label">{{ `${lang.get('validation.attributes.requested_quantity').capitalize()}: ${details.quantity || 0}` }}</label>
                                        <label class="col-6 col-form-label">{{ `${lang.get('validation.attributes.picked').capitalize()}: ${details.picked || 0}` }}</label>
                                    </div>
                                    <div class="m-form__group form-group row">
                                        <label class="col-3 col-form-label">{{ `${lang.get('validation.attributes.done').capitalize()}:` }}</label>
                                        <div class="col-3">
                                            <span class="m-switch m-switch--sm m-switch--icon">
                                                <label>
                                                    <input type="checkbox" disabled="disabled" :checked="details.received" name="">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                        <label class="col-3 col-form-label">{{ `${lang.get('validation.attributes.in transit').capitalize()}:` }}</label>
                                        <div class="col-3">
                                            <span class="m-switch m-switch--sm m-switch--icon">
                                                <label>
                                                    <input type="checkbox" disabled="disabled" :checked="details.transit" name="">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <hr>

                                <p>{{ `${lang.get('validation.attributes.issue').capitalize()}:` }}</p>
                                <ul>
                                    <li v-for="issue in details.issues" :key="issue.id">{{ issue.issue }} <span class="m-badge m-badge--brand m-badge--wide"><small>{{ humanize(issue.created_at) }}</small></span> </li>
                                </ul>

                                <hr>

                                <portlet-text-area  v-if="$auth.can('add-purchase-order-issue')" :value="issue.issues" v-model="issue.issues"
                                                   :has-errors="issue.errors"
                                                   validation="required|min:3|max:3000"
                                                   name="issue"
                                                   :input-attrs="{'minlength': 3, 'maxlength': 3000, 'required': true, 'autocomplete': 'off' }">

                                </portlet-text-area>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <portlet-submit v-if="$auth.can('add-purchase-order-issue')" :loadiing="loading" :form="issue"></portlet-submit>
                        <button type="button" @click="onClose" data-dismiss="modal"  class="btn btn-default" v-text="lang.get('pages.buttons.cancel')">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="$auth.can('change-purchase-order-status')" class="modal fade" id="m_modal_status" tabindex="-1" role="dialog" aria-labelledby="log_content" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <form @submit.prevent="onSubmit" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ lang.get('validation.attributes.status').capitalize() }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="modal_status" class="m-form">
                                    <div class="col-md-12">
                                        <portlet-select :value="form.status_id" v-model.number="form.status_id"
                                                        :options="options"
                                                        :data="options.data"
                                                        :has-errors="form.errors"
                                                        validation="required|numeric"
                                                        name="status">

                                        </portlet-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <portlet-submit :loadiing="loading" :form="form"></portlet-submit>
                        <button type="button" data-dismiss="modal"  class="btn btn-default" v-text="lang.get('pages.buttons.cancel')">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
    import {PurchaseOrderProductOrder} from "../../services/models/PurchaseOrderProductOrder";
    import {MixinMoment} from "../../mixins/mixin-moment";
    import {Status} from "../../services/models/Status";
    import {PurchaseOrder} from "../../services/models/PurchaseOrder";
    import {ProductOrderIssue} from "../../services/models/ProductOrderIssue";

    export default {
        name: "PurchaseOrderDetails",
        mixins: [ MixinMoment ],
        data: () => {
            return {
                loading: false,
                lang: lang,
                portlet: null,
                total: 0,
                qr: null,
                purchase: {
                    business_unity: {id: 0, name: null},
                    business_unity_id: 0,
                    created_at: null,
                    deleted_at: null,
                    delivery_address: null,
                    delivery_at: null,
                    id: 0,
                    products_order: [],
                    provider: {id: 0, name: null, nit: null},
                    provider_id: 0,
                    requested_at: null,
                    status: {id: 0, name: null},
                    status_id: 0,
                    updated_at: null,
                    user: {id: 0, name: null},
                    user_id: 0,
                },
                details: null,
                status: new Status({}, { params: { query: 'received' } }),
                options: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    minimumResultsForSearch: Infinity,
                    data: []
                },
                form: new PurchaseOrder({
                    status_id: null
                }),
                issue: null
            }
        },
        created: function () {
            mApp.block('#m_modal_status .modal-content', {})
            this.status.index()
                .then((response) => {
                    this.options.data = response.data.map((option) => {
                        return {
                            id: option.id,
                            text: option.name
                        }
                    });
                })
                .then(() => {
                    mApp.unblock('#m_modal_status .modal-content', {})
                })
                .catch((error) => {
                    console.log(error);
                })
            this.$nextTick(() => {
                this.getPurchaseOrder();
            })
        },
        methods: {
            onPortlet: function (portlet) {
                this.portlet = portlet;
                if ( this.portlet !== null ) {
                    this.onRemoveForm();
                }
            },
            onRemoveForm: function () {
                let that = this;
                this.portlet_form.on('beforeRemove', function (portlet) {
                    that.$router.push({ name: 'purchase.orders'  })
                });
            },
            onPrintImages: function (id) {
                this.$htmlToPaper( id );
            },
            onDetails: function (details) {
                this.details = details;
                this.issue = new ProductOrderIssue( details.id, {
                    issues: []
                })
            },
            onClose: function () {
                this.details  = null;
            },
            getPurchaseOrder: function () {
                this.total = 0;
                mApp.blockPage();
                (new PurchaseOrderProductOrder( this.$route.params.id, {} )).index()
                    .then((response) => {
                        this.purchase = response;
                    })
                    .then(() => {
                        this.qr = this.purchase.id;
                        this.purchase.products_order.map((product) => {
                            this.total += product.subtotal;
                        });
                    })
                    .then(() => {
                        mApp.unblockPage();
                    })
                    .catch((error) => console.log( error ));
            },
            onSubmit: function () {
               this.$validator.validateAll()
                   .then((result) => {
                       if (result) {
                           mApp.block('#m_modal_status .modal-content', {})
                           this.form.status( this.$route.params.id )
                               .then((response) => {
                                   $('#m_modal_status').modal('hide')
                                   this.getPurchaseOrder()
                               })
                               .then(() => {
                                   mApp.unblock('#m_modal_status .modal-content', {})
                               })
                               .catch((error) => {
                                   mApp.unblock('#m_modal_status .modal-content', {})
                                   console.log(error)
                               })
                       }
                   })
            },
            onIssue: function () {
                this.$validator.validateAll()
                    .then((result) => {
                        if (result) {
                            mApp.block('#m_modal_issue .modal-content', {})
                            this.issue.store()
                                .then((response) => {
                                    $('#m_modal_issue').modal('hide')
                                    this.getPurchaseOrder()
                                })
                                .then(() => {
                                    mApp.unblock('#m_modal_issue .modal-content', {})
                                })
                                .catch((error) => {
                                    mApp.unblock('#m_modal_issue .modal-content', {})
                                    console.log( error )
                                })
                        }
                    })
            }
        },
    }
</script>

<style scoped>

</style>