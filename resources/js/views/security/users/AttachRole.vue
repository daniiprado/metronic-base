<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="m-portlet m-portlet--tabs">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                {{ lang.get('pages.attach_role.title', {user: user_name}) }}
                            </h3>
                        </div>
                    </div>
                    <div class="m-portlet__head-tools">
                        <ul class="nav nav-tabs m-tabs m-tabs-line   m-tabs-line--right m-tabs-line-danger" role="tablist">
                            <li class="nav-item m-tabs__item">
                                <a class="nav-link m-tabs__link active" @click="onSubmit" data-toggle="tab" href="#m_portlet_tab_1_1" role="tab">
                                    Asignar Roles
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="m-portlet__body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="m_portlet_tab_1_1">
                            <div class="col-md-6 offset-md-3" v-for="data in roles">
                                <div class="m-section">
                                <span class="m-section__sub">
                                    Module: {{ data.name }}
                                </span>
                                    <div class="m-section__content">
                                        <div class="m-demo" data-code-preview="true" data-code-html="true" data-code-js="false">
                                            <div class="m-demo__preview">
                                                <!--begin::Form-->
                                                <form class="m-form">
                                                    <div class="m-form__group form-group row" :key="data.id">
                                                        <label class="col-6 col-form-label">{{ data.name }}</label>
                                                        <div class="col-6">
                                                        <span class="m-switch m-switch--icon">
                                                            <label>
                                                                <input type="checkbox" :checked="checked(data.id)" :value="{id: data.id}" v-model="form.roles">
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
    import {UserRole} from "../../../services/models/UserRole";
    import {Role} from "../../../services/models/Role";
    import swal from 'sweetalert2'

    export default {
        name: "AttachRole",
        data: () => {
            return {
                lang: lang,
                form: {},
                user_name: null,
                loading: false,
                role: new Role({}),
                roles: [],
            }
        },
        created: function () {
            this.setRoles();
        },
        mounted: function () {
            this.getRoles();
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
                        this.form.store( this.$route.params.id )
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
            /** Permissions **/
            setRoles: function () {
                this.form = new UserRole(
                    this.$route.params.id,
                    {
                        roles: []
                    }
                );
                this.form.index( this.$route.params.id )
                    .then( (response) => {
                        this.user_name = response.data.name;
                        this.form.roles = response.data.roles.map((role) => {
                            return {
                                id: role.id
                            }
                        });
                    })
                    .catch( error => {
                        console.log(error)
                    })
            },
            getRoles: function () {
                this.role.index()
                    .then((response) => {
                        this.roles = response.data.map((role) => {
                            return {
                                id: role.id,
                                name: role.display_name,
                                description: role.description
                            }
                        })

                    })
            },
            checked: function ( val ) {
                return (this.form.roles) ? this.form.roles.indexOf(val) !== -1 : false;
            },
        },
    }
</script>

<style scoped>

</style>
