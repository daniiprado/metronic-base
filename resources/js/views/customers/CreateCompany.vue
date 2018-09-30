<!--
  - Copyright (c) 2017 - 2018. Daniel Prado. All Rights Reserved. All material on this project, including design, text, images, logos, code and sounds, are owned by Daniel Prado, either through copyright or trademark, unless otherwise indicated. Content may not be copied, reproduced, transmitted, distributed, downloaded or transferred in any form or by any means without Daniel Prado's prior written consent, and with express attribution to Daniel Prado. The only exception is that one temporary copy may be downloaded into a single computer's memory and one unaltered permanent copy may be used by the viewer for personal and non-commercial use only, with an attached copy of Daniel Prado's Disclaimer Notice. No part of the downloaded copy may be subsequently reproduced, disseminated or transferred. Copyright infringement is a violation of federal law subject to criminal and civil penalties. (For permission to reprint, please contact Daniel Prado at (+571) 318-603-7095 or via email at danii.prado@outlook.com.ar)
  -->

<template>
    <draggable-row>
        <div class="col-lg-6 offset-lg-3">
            <portlet-form @onPortletForm="onPortletForm" id="m_portlet_tools_form" :title="lang.choice('pages.company.title', 0, {prefix: lang.get('pages.buttons.create')})">
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
        name: "CreateModule",
        data: () => {
            return {
                lang: lang,
                loading: false,
                portlet_form: null,
                form: new Company({
                    name: null,
                    nit: null,
                    phone: null
                })
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
            }
        }
    }
</script>

<style scoped>

</style>
