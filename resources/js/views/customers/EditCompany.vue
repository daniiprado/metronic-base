<template>
    <draggable-row>
        <div class="col-lg-6 offset-lg-3">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form_edit" :title="lang.choice('pages.company.title', 0, {prefix: lang.get('pages.buttons.edit')})">
                <template slot="actions">
                    <action-item>
                        <portlet-tool tool="remove"></portlet-tool>
                    </action-item>
                </template>

                <form @submit.prevent="onSubmit" class="m-form m-form--fit m-form--label-align-right">
                    <div class="m-portlet__body">

                        <portlet-input :value="form.name" v-model="form.name"
                                       :has-errors="form.errors"
                                       validation="required|alpha_spaces|min:3"
                                       name="name"
                                       :input-attrs="{'minlength': 3, 'maxlength': 60, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.nit" v-model="form.nit"
                                       :has-errors="form.errors"
                                       validation="required|min:3|max:12"
                                       name="nit"
                                       :input-attrs="{'minlength': 3, 'maxlength': 12, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.phone" v-model="form.phone"
                                       :has-errors="form.errors"
                                       validation="required|min:7|max:12"
                                       name="phone"
                                       :input-attrs="{'minlength': 7, 'maxlength': 12, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

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
    import swal from 'sweetalert2'
    import {Company} from "../../services/models/Company";

    export default {
        name: "EditCompany",
        data: () => {
            return {
                lang: lang,
                portlet_form: null,
                form: new Company({
                    name: null,
                    nit: null,
                    phone: null
                }),
                loading: false
            }
        },
        created: function () {
            this.form.show( this.$route.params.id )
                .then( (response) => {
                    this.form.name = response.data.name
                    this.form.nit = response.data.nit
                    this.form.phone = response.data.phone
                })
                .catch( error => {
                    console.log(error)
                })
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
                    that.$router.push({ name: 'companies'  })
                });
            },
            onSubmit: function () {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        mApp.blockPage();
                        this.form.update( this.$route.params.id )
                            .then( (response) => {
                                this.loading = true;
                                mApp.unblockPage();
                                swal({
                                    type: 'success',
                                    title: this.lang.get('pages.messages.success'),
                                    text: response.message
                                })
                                    .then(() => {
                                        this.loading = false;
                                        this.$router.push({ name: 'companies' })
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
                })
            },
        }
    }
</script>

<style scoped>

</style>
