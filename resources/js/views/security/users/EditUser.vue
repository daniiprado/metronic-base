<template>
    <draggable-row>
        <div class="col-lg-6 offset-lg-3">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.users.title', 0, {prefix: lang.get('pages.buttons.create')})">
                <template slot="actions">
                    <action-item>
                        <portlet-tool tool="remove"></portlet-tool>
                    </action-item>
                </template>

                <form @submit.prevent="onSubmit" class="m-form m-form--fit m-form--label-align-right">
                    <div class="m-portlet__body">

                        <portlet-input :value="form.name" v-model="form.name"
                                       :has-errors="form.errors"
                                       validation="required|alpha_spaces|min:3|max:60"
                                       name="name"
                                       :input-attrs="{'minlength': 3, 'maxlength': 191, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.email" v-model="form.email"
                                       type="email"
                                       :has-errors="form.errors"
                                       validation="required|email"
                                       name="email"
                                       :input-attrs="{'minlength': 3, 'maxlength': 80, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.password" v-model.trim="form.password"
                                       type="password"
                                       :has-errors="form.errors"
                                       validation="required|max:16|min:6|confirmed:password_confirmation"
                                       name="password"
                                       :input-attrs="{'minlength': 6, 'maxlength': 16, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.password_confirmation" v-model.trim="form.password_confirmation"
                                       type="password"
                                       :has-errors="form.errors"
                                       validation="required|min:6|max:16"
                                       name="password_confirmation"
                                       :input-attrs="{'minlength': 6, 'maxlength': 16, 'required': true, 'autocomplete': 'off' }">
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
    import {User} from "../../../services/models/User";
    import {API} from "../../../services/Api";
    import swal from 'sweetalert2'
    export default {
        name: "EditUser",
        data: () => {
            return {
                lang: lang,
                portlet_form: null,
                form: new User({
                    name: null,
                    email: null,
                    company_id: null
                }),
                loading: false,
                select: {}
            }
        },
        created: function () {
            mApp.blockPage();
            this.form.show( this.$route.params.id )
                .then( (response) => {
                    this.form.name = response.data.name
                    this.form.email = response.data.email
                    this.form.company_id = response.data.company_id
                })
                .then(() => {
                    mApp.unblockPage();
                })
                .catch( error => {
                    mApp.unblockPage();
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
                    that.$router.push({ name: 'users'  })
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
                                        this.$router.push({ name: 'users' })
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
        },
    }
</script>

<style scoped>

</style>
