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
                            <div class="col-md-6">
                                <portlet-input :value="form.requested_at" v-model="form.requested_at"
                                               :has-errors="form.errors"
                                               validation="required"
                                               name="requested_at"
                                               :input-attrs="{'minlength': 19, 'maxlength': 19, 'readonly': true, 'required': true, 'autocomplete': 'off' }">
                                </portlet-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <!--
                            <portlet-select :value="form.status_id" v-model.number="form.status_id"
                                            :options="options"
                                            :data="options.data"
                                            :has-errors="form.errors"
                                            validation="required|numeric"
                                            name="status_id"
                                            :input-attrs="{'required': true }">

                            </portlet-select>
                            -->
                        </div>
                    </div>
                    <div class="m-portlet__foot m-portlet__foot--fit">
                        <div class="m-form__actions m-form__actions--solid m-form__actions--right">
                            <portlet-submit :loadiing="loading" :form="form"></portlet-submit>
                            <button type="reset" class="btn btn-secondary">Cancel</button>
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
                    //status_id: null,
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
                    that.$router.push({ name: 'companies'  })
                });
            },
            onSubmit: function () {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
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
            }
        },
        watch: {
            form: function (form) {
                console.log(form);
            }
        }
    }
</script>

<style scoped>

</style>
