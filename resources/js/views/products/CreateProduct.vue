<template>
    <draggable-row>
        <div class="col-lg-6 offset-lg-3">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.product.title', 0, {prefix: lang.get('pages.buttons.create')})">
                <template slot="actions">
                    <action-item>
                        <portlet-tool tool="remove"></portlet-tool>
                    </action-item>
                </template>

                <form @submit.prevent="onSubmit" class="m-form m-form--fit m-form--label-align-right">
                    <div class="m-portlet__body">
                        <portlet-input :value="form.code" v-model.trim="form.code"
                                       :has-errors="form.errors"
                                       validation="required|alpha_num|min:10|max:10"
                                       name="code"
                                       :input-attrs="{'minlength': 10, 'maxlength': 10, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>
                        <portlet-input :value="form.name" v-model="form.name"
                                       :has-errors="form.errors"
                                       validation="required|min:3|max:80"
                                       name="name"
                                       :input-attrs="{'minlength': 3, 'maxlength': 80, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>
                        <portlet-input :value="form.price" v-model="form.price"
                                       type="number"
                                       :has-errors="form.errors"
                                       validation="required|min_value:20|max_value:99999999|max:8|decimal:2"
                                       name="price"
                                       :input-attrs="{'min': 20, 'max': 99999999, size: 8, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>
                        <portlet-select :options="companies"
                                        :value="form.company_id"
                                        v-model.number="form.company_id"
                                        :has-errors="form.errors"
                                        :input-attrs="{'required': true}"
                                        name="company_id" validation="required">
                        </portlet-select>
                    </div>
                    <div class="m-portlet__foot m-portlet__foot--fit">
                        <div class="m-form__actions">
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
    import {Product} from "../../services/models/Product";
    import {Company} from "../../services/models/Company";
    import {API} from "../../services/Api";
    import swal from 'sweetalert2'
    import moment from 'moment-timezone'

    export default {
        name: "CreateProduct",
        data: () => {
            return {
                lang: lang,
                loading: false,
                portlet_form: null,
                form: new Product({
                    code: null,
                    name: null,
                    price: null,
                    company_id: null
                }),
                companies: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    ajax: {
                        url: API.END_POINTS.CUSTOMERS.COMPANY.ROOT,
                        data: function (params) {
                            return {
                                query: params.term,
                                per_page: 15,
                                page: params.page || 1,
                            };
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data.data.map( (item) => {
                                    return {
                                        id: item.id,
                                        text: item.name
                                    }
                                }),
                                pagination: {
                                    more: (params.page * 10) < data.meta.total
                                }
                            }
                        },
                    }
                },
            }
        },
        mounted: function () {
            mApp.initTooltips();
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
                    that.$router.push({ name: 'products'  })
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
                                }).then(() => {
                                        mUtil.scrollTop();
                                    })
                            })
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
