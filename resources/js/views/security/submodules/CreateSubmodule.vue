<template>
    <draggable-row>
        <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.submodules.title', 0, {prefix: lang.get('pages.buttons.create')})">
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

                </div>
                <div class="m-portlet__foot m-portlet__foot--fit">
                    <div class="m-form__actions">
                        <button type="submit"
                                :class="{ 'm-loader m-loader--right m-loader--light': loading }"
                                :disabled="loading || form.errors.any() || errors.any()"
                                class="btn btn-primary">
                            Submit
                        </button>
                        <button type="reset" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </form>

        </portlet-form>
    </draggable-row>
</template>

<script>

    export default {
        name: "CreateSubmodule",
        data: () => {
            return {
                lang: lang,
                loading: false,
                portlet_form: null,
                form: new Form({
                    name: null,
                    module_id: null
                }),
                options: []
            }
        },
        created: function () {
            
        },
        mounted: function () {
            mApp.initTooltips();
        },
        methods: {
            /** Actions for create Modules **/
            onPortletForm: function (portlet) {
                this.portlet_form = portlet;
                this.onReloadForm();
                this.onRemoveForm();
            },
            onReloadForm: function () {
                if (this.portlet_form !== null) {
                    let that = this;
                    this.portlet_form.on('reload', function (portlet) {
                        that.form.reset();
                        that.errors.clear();
                    });
                }
            },
            onRemoveForm: function () {
                if ( this.portlet_form !== null ) {
                    let that = this;
                    this.portlet_form.on('beforeRemove', function (portlet) {
                        that.$router.push({ name: 'modules'  })
                    });
                }
            },
            onSubmit: function () {
                this.$validator.validateAll().then( (result) => {
                    if (result) {
                        this.loading = true;
                        mApp.blockPage();
                        this.form.post('/api/module')
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
