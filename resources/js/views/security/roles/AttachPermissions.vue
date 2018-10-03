<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="m-portlet m-portlet--tabs">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                {{ lang.get('pages.attach.title', {role: rol_name}) }}
                                <small> {{ description }} </small>
                            </h3>
                        </div>
                    </div>
                    <div class="m-portlet__head-tools">
                        <ul class="nav nav-tabs m-tabs m-tabs-line   m-tabs-line--right m-tabs-line-danger" role="tablist">
                            <li class="nav-item m-tabs__item">
                                <a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_portlet_tab_1_1" role="tab">
                                    Permisos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="m-portlet__body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="m_portlet_tab_1_1">
                            <div class="col-md-6 offset-md-3" v-for="data in permissions">
                                <div class="m-section">
                                <span class="m-section__sub">
                                    Module: {{ data.module }}
                                </span>
                                    <div class="m-section__content">
                                        <div class="m-demo" data-code-preview="true" data-code-html="true" data-code-js="false">
                                            <div class="m-demo__preview">
                                                <!--begin::Form-->
                                                <form class="m-form">
                                                    <div class="m-form__group form-group row" v-for="perm in data.perms" :key="perm.id">
                                                        <label class="col-6 col-form-label">{{ perm.display_name }}</label>
                                                        <div class="col-6">
                                                        <span class="m-switch m-switch--icon">
                                                            <label>
                                                                <input type="checkbox" :checked="checked(perm.id)" :value="perm.id" v-model="form.permissions">
                                                                <span></span>
                                                            </label>
                                                        </span>
                                                        </div>
                                                    </div>
                                                </form>
                                                <!--end::Form-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {RolePermission} from "../../../services/models/RolePermission";
    import {Module} from "../../../services/models/Module";

    export default {
        name: "AttachPermissions",
        data: () => {
            return {
                lang: lang,
                form: {},
                rol_name: null,
                description: null,
                loading: false,
                modules: new Module({}),
                permissions: [],
            }
        },
        created: function () {
            this.setPermissions();
        },
        mounted: function () {
            this.getPermissions();
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
            /** Permissions **/
            setPermissions: function () {
                this.form = new RolePermission(
                    this.$route.params.id,
                    {
                        permissions: []
                    }
                );
                this.form.index( this.$route.params.id )
                    .then( (response) => {
                        this.rol_name = response.data.display_name;
                        this.description = response.data.description;
                        this.form.permissions = response.data.permissions.map((permission) => {
                            return permission.id
                        });
                    })
                    .catch( error => {
                        console.log(error)
                    })
            },
            getPermissions: function () {
                this.modules.index()
                    .then((response) => {
                        this.permissions = response.data.map((perm) => {
                            return {
                                module: perm.name,
                                perms: perm.permissions
                            }
                        })
                    })
            },
            checked: function ( val ) {
                return this.form.permissions.indexOf(val) !== -1;
            }
        },

    }
</script>

<style scoped>

</style>
