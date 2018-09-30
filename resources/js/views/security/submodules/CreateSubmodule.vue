<template>
    <draggable-row>
        <div class="col-lg-6 offset-lg-3">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.submodules.title', 0, {prefix: lang.get('pages.buttons.create')})">
            <template slot="actions">
                <action-item>
                    <portlet-tool tool="remove"></portlet-tool>
                </action-item>
            </template>

            <form @submit.prevent="onSubmit" class="m-form m-form--fit m-form--label-align-right">
                <div class="m-portlet__body">

                    <portlet-select :options="select"
                                    :value="form.module_id"
                                    v-model="form.module_id"
                                    :has-errors="form.errors"
                                    :input-attrs="{'required': true}"
                                    name="module_id" validation="required">
                    </portlet-select>

                    <portlet-input :value="form.name" v-model="form.name"
                                   :has-errors="form.errors"
                                   validation="required|alpha_spaces|min:3|max:60"
                                   name="name"
                                   :input-attrs="{'minlength': 3, 'maxlength': 60, 'required': true, 'autocomplete': 'off' }">
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
    import {Submodule} from "../../../services/models/Submodule";
    import {API} from "../../../services/Api";
    import swal from 'sweetalert2';
    export default {
        name: "CreateSubmodule",
        data: () => {
            return {
                lang: lang,
                loading: false,
                portlet_form: null,
                form: new Submodule({
                    name: null,
                    module_id: null
                }),
                options: [],
                select: {
                    ajax: {
                        url: API.END_POINTS.SECURITY.MODULES.ROOT,
                        data: function (params) {
                            let query = {
                                query: params.term,
                                per_page: 15,
                                page: params.page || 1,
                            }
                            return query;
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
                }
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
                    that.$router.push({ name: 'submodules'  })
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
                })
            },
        }
    }
</script>

<style scoped>

</style>
