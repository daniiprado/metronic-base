<template>
    <draggable-row>
        <div class="col-lg-12">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.purchase_order.title', 0, {prefix: lang.get('pages.buttons.create')})">
                <template slot="actions">
                    <action-item>
                        <portlet-tool tool="remove"></portlet-tool>
                    </action-item>
                </template>

                <form @submit.prevent="onSubmit" class="m-form m-form--fit m-form--label-align-right m-form--group-seperator-dashed">
                    <div class="m-portlet__body">
                        <div class="row">
                            <div class="col-md-6">
                                <portlet-input :value="form.delivery_address" v-model="form.delivery_address"
                                               :has-errors="form.errors"
                                               validation="required|min:3|max:70"
                                               name="delivery_address"
                                               :input-attrs="{'minlength': 3, 'maxlength': 70, 'required': true, 'autocomplete': 'off' }">
                                </portlet-input>
                            </div>
                            <div class="col-md-6">
                                <portlet-select :value="form.business_unity_id" v-model.number="form.business_unity_id"
                                                :options="unity_options"
                                                :data="unity_options.data"
                                                :has-errors="form.errors"
                                                validation="required|numeric"
                                                name="business_unity_id"
                                                :input-attrs="{'required': true }">

                                </portlet-select>
                            </div>
                            <div class="col-md-6">
                                <portlet-select :value="form.provider_id" v-model.number="form.provider_id"
                                                :options="provider_options"
                                                :data="provider_options.data"
                                                :has-errors="form.errors"
                                                validation="required|numeric"
                                                name="provider_id"
                                                :input-attrs="{'required': true }">

                                </portlet-select>
                            </div>
                            <div class="col-md-6">
                                <portlet-date-time ref="delivery_at" :value="form.delivery_at" v-model="form.delivery_at"
                                                   :has-errors="form.errors"
                                                   validation="required|before:requested_at"
                                                   name="delivery_at"
                                                   :input-attrs="{'required': true, 'autocomplete': 'off' }">
                                </portlet-date-time>
                            </div>
                            <hr>
                            <div class="col-md-12">
                                <div v-if="show" class="m-alert m-alert--icon alert alert-danger" role="alert">
                                    <div class="m-alert__icon">
                                        <i class="flaticon-danger"></i>
                                    </div>
                                    <div class="m-alert__text">
                                        <strong v-text="lang.get('pages.messages.warning')"></strong>
                                        {{ lang.get('pages.messages.check_products') }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <portlet-select :value="selected" v-model.number="selected"
                                                :options="product_options"
                                                :data="products"
                                                :has-errors="form.errors"
                                                validation="numeric"
                                                name="products">

                                </portlet-select>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group m-form__group">
                                    <label v-text="lang.get('validation.attributes.quantity').capitalize()"></label>
                                    <div class="input-group">
                                        <input  v-model.number="quantity"
                                               type="number"
                                               :has-errors="form.errors"
                                               v-validate="'numeric'"
                                               name="quantity"
                                               class="form-control"
                                               :placeholder="lang.get('validation.attributes.quantity').capitalize()">
                                        <div class="input-group-append">
                                            <button class="btn btn-secondary" @click="onAddProduct" type="button" v-text="lang.get('pages.buttons.add_product')"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div v-if="form.products.length > 0" class="col-md-8 offset-md-2">
                                <div class="m-section">
                                    <div class="m-section__content">
                                        <div class="table-responsive">
                                            <table class="table m-table m-table--head-separator-primary">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th v-text="lang.get('validation.attributes.code').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.name').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.price').capitalize()"></th>
                                                    <th v-text="lang.get('validation.attributes.quantity').capitalize()"></th>
                                                    <th>Subtotal</th>
                                                    <th v-text="lang.get('pages.buttons.remove').capitalize()"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="product in form.products">
                                                    <td scope="row" v-text="product.product_id"></td>
                                                    <td v-text="product.code"></td>
                                                    <td v-text="product.name"></td>
                                                    <td v-text="`$ ${product.price}`"></td>
                                                    <td v-text="product.quantity"></td>
                                                    <td class="text-right" v-text="`$ ${product.subtotal}`"></td>
                                                    <td>
                                                        <a href="javascript:;" @click="onRemoveProduct(product.product_id)" class="btn btn-outline-danger m-btn m-btn--icon btn-sm m-btn--icon-only m-btn--pill m-btn--air">
                                                            <i class="fas fa-times"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="5" class="text-right">Total:</td>
                                                    <td class="text-right">$ {{ total }}</td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-portlet__foot m-portlet__foot--fit">
                        <div class="m-form__actions m-form__actions--solid m-form__actions--right">
                            <portlet-submit :loadiing="loading" :form="form"></portlet-submit>
                            <button type="reset" class="btn btn-secondary" v-text="lang.get('pages.buttons.cancel')"></button>
                        </div>
                    </div>
                </form>

            </portlet-form>
        </div>
    </draggable-row>
</template>

<script>
    import {PurchaseOrder} from "../../services/models/PurchaseOrder";
    import {BusinessUnity} from "../../services/models/BusinessUnity";
    import {Status} from "../../services/models/Status";
    import {API} from "../../services/Api";
    import swal from 'sweetalert2'
    import moment from 'moment-timezone';
    import {Company} from "../../services/models/Company";

    export default {
        name: "PurchaseOrderCreate",
        data: () => {
            return {
                lang: lang,
                loading: false,
                portlet_form: null,
                form: new PurchaseOrder({
                    delivery_address: null,
                    delivery_at: null,
                    requested_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    business_unity_id: null,
                    provider_id: null,
                    products: []
                }),
                //status: new Status({}),
                business_unity: new BusinessUnity({}),
                provider: new Company({}),
                options: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    minimumResultsForSearch: Infinity,
                    data: []
                },
                unity_options: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    minimumResultsForSearch: Infinity,
                    data: []
                },
                provider_options: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    minimumResultsForSearch: Infinity,
                    data: []
                },
                product_options: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    minimumResultsForSearch: Infinity,
                    data: []
                },
                products: [],
                selected: null,
                quantity: null,
                total: 0,
                show: false
            }
        },
        mounted: function () {
            mApp.initTooltips();
            //this.statusOptions();
            this.unityOptions();
            this.providerOptions();
        },
        methods: {
            /** Actions for create Modules **/
            onPortletForm: function (portlet) {
                this.portlet_form = portlet;
                if (this.portlet_form !== null) {
                    this.onReloadForm();
                    this.onRemoveForm();
                }
            },
            onReloadForm: function () {
                let that = this;
                this.portlet_form.on('reload', function (portlet) {
                    that.form.reset();
                    that.errors.clear();
                });
            },
            onRemoveForm: function () {
                let that = this;
                this.portlet_form.on('beforeRemove', function (portlet) {
                    that.$router.push({ name: 'purchase.orders'  })
                });
            },
            onSubmit: function () {
                this.$validator.validateAll().then( (result) => {
                    if (result && this.form.products.length > 0) {
                        this.show = false;
                        this.loading = true;
                        mApp.blockPage();
                        this.form.store()
                            .then( (response) => {
                                this.loading = false;
                                mApp.unblockPage();
                                swal({
                                    type: 'success',
                                    title: this.lang.get('pages.messages.success'),
                                    text: response.message
                                })
                            })
                            .catch( (error) => {
                                this.loading = false;
                                mApp.unblockPage();
                                swal({
                                    title: this.lang.get('pages.messages.error'),
                                    text: error.message,
                                    type: 'error'
                                })
                                    .then(() => {
                                        mUtil.scrollTop();
                                    })
                            })
                    }
                    if ( this.form.products.length < 1 ) {
                        this.show = true;
                    }
                });
            },
            statusOptions: function () {
                this.status.index()
                    .then( (response) => {
                        this.options.data = response.data.map((option) => {
                            return {
                                id: option.id,
                                text: option.name
                            }
                        });
                    })
                    .catch((error) => {
                        console.log( error )
                    })
            },
            unityOptions: function () {
                this.business_unity.index()
                    .then( (response) => {
                        this.unity_options.data = response.data.map((option) => {
                            return {
                                id: option.id,
                                text: option.name
                            }
                        });
                    })
                    .catch((error) => {
                        console.log( error )
                    })
            },
            providerOptions: function () {
                this.provider.index()
                    .then( (response) => {
                        this.provider_options.data = response.data.map((option) => {
                            return {
                                id: option.id,
                                text: option.name
                            }
                        });
                    })
                    .catch((error) => {
                        console.log( error )
                    })
            },
            onAddProduct: function () {
                let product = JSON.parse( this.selected );
                this.form.products.push({
                    product_id: product.id,
                    code: product.code,
                    price: product.price,
                    name: product.name,
                    quantity: this.quantity,
                    subtotal: product.price * this.quantity
                });
                this.total = 0;
                this.form.products.map((p) => {
                     this.setTotal( p.subtotal );
                });
                this.quantity = null;
                this.selected = [];
            },
            setTotal: function (value) {
                this.total += value;
            },
            onRemoveProduct: function (id) {
                this.form.products = this.form.products.filter( (product) => {
                    return product.product_id !== id
                })
            }
        },
        watch: {
            form: {
                handler: function (form) {
                    if ( typeof form.provider_id === 'number') {
                        this.provider.products( form.provider_id )
                            .then((response) => {
                                this.products = response.data.products.map((product) => {
                                    return {
                                        id: JSON.stringify(product),
                                        text: `${ product.code} | ${product.name} | $ ${product.price}`,
                                    }
                                })
                            })
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
