<template>
    <draggable-row>
        <div class="col-lg-6 offset-lg-3">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.permissions.title', 0, {prefix: lang.get('pages.buttons.create')})">
                <template slot="actions">
                    <action-item>
                        <portlet-tool tool="remove"></portlet-tool>
                    </action-item>
                </template>

                <form @submit.prevent="onSubmit" class="m-form m-form--fit m-form--label-align-right">
                    <div class="m-portlet__body">

                        <portlet-input :value="form.name" v-model.trim="form.name"
                                       :has-errors="form.errors"
                                       validation="required|alpha_dash|min:3|max:30"
                                       name="name"
                                       :input-attrs="{'minlength': 3, 'maxlength': 30, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.display_name" v-model="form.display_name"
                                       :has-errors="form.errors"
                                       validation="required|alpha_spaces|min:3|max:60"
                                       name="display_name"
                                       :input-attrs="{'minlength': 3, 'maxlength': 30, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-input :value="form.description" v-model="form.description"
                                       :has-errors="form.errors"
                                       validation="required|alpha_spaces|min:3|max:191"
                                       name="description"
                                       :input-attrs="{'minlength': 6, 'maxlength': 191, 'required': true, 'autocomplete': 'off' }">
                        </portlet-input>

                        <portlet-select :options="modules"
                                        :value="form.module_id"
                                        v-model.number="form.module_id"
                                        :has-errors="form.errors"
                                        :input-attrs="{'required': true}"
                                        name="module_id" validation="required">
                        </portlet-select>

                        <portlet-select :options="submodules"
                                        :data="options"
                                        :value="form.submodule_id"
                                        v-model.number="form.submodule_id"
                                        :has-errors="form.errors"
                                        :input-attrs="{'required': true}"
                                        name="submodule_id" validation="required">
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
    import {Permission} from "../../../services/models/Permission";
    import {ModuleSubmodule} from "../../../services/models/ModuleSubmodule";
    import {API} from "../../../services/Api";
    import swal from 'sweetalert2'

    export default {
        name: "CreateUser",
        data: () => {
            return {
                lang: lang,
                loading: false,
                portlet_form: null,
                form: new Permission({
                    name: null,
                    display_name: null,
                    description: null,
                    module_id: null,
                    submodule_id: null
                }),
                modules: {
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                    ajax: {
                        url: API.END_POINTS.SECURITY.MODULES.ROOT,
                        data: function (params) {
                            let query = {
                                query: params.term,
                                per_page: 15,
                            }
                            return query;
                        },
                        processResults: function (data, params) {
                            return {
                                results: data.data.map( (item) => {
                                    return {
                                        id: item.id,
                                        text: item.name
                                    }
                                }),
                            }
                        },
                    }
                },
                submodules: {
                    disabled: true,
                    placeholder: lang.get('pages.buttons.select'),
                    allowClear: true,
                    dir: mUtil.isRTL() ? "rtl" : null,
                },
                options: []
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
                    that.$router.push({ name: 'permissions'  })
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
        },
        watch: {
            form: {
                handler: function(form) {
                    if ( typeof form.module_id === 'number' && typeof form.submodule_id !== 'number') {
                        (new ModuleSubmodule(form.module_id, {})).index()
                            .then((response) => {
                                this.submodules.disabled = false;
                                this.options = response.data.map((submodule) => {
                                    return {
                                        id: submodule.id,
                                        text: submodule.name
                                    }
                                })
                            })
                            .catch(() => {
                                this.options = [];
                                this.submodules.disabled = true;
                            })
                    } else if ( typeof form.module_id !== 'number' &&  typeof form.submodule_id === 'number') {
                        this.options = [];
                        this.submodules.disabled = true;
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
