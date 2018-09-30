<template>
    <div class="form-group m-form__group"  :class="{'has-danger': ( errors.has( name ) || hasErrors.has( name ) ) }">
        <label :for="name" v-text="inputName"></label>
        <select class="form-control m-select2"
                data-allow-clear="true"
                v-bind="inputAttrs"
                ref="select2Input"
                v-validate="validation"
                :id="name"
                :name="name">
            <slot></slot>

        </select>

        <feedback :show="errors.has( name ) || hasErrors.has( name )">
            {{ errors.first( name ) || hasErrors.first( name ) }}
        </feedback>
    </div>
</template>

<script>
    import {Errors} from "../../services/Errors";

    export default {
        name: "PortletSelect",
        props: {
            options: {
                type: [Array, Object]
            },
            inputAttrs: {
                type: [Array, Object]
            },
            validation: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            value: {
                default: null
            },
            hasErrors: {
                default: new Errors()
            }
        },
        data: () => {
            return {
                lang: lang,
            }
        },
        created: function () {
            let that = this;
            this.options.placeholder = this.lang.get('pages.buttons.select');
            this.options.allowClear = true;
            this.options.ajax.delay = 250;
            this.options.ajax.dataType = 'json';
            this.options.ajax.beforeSend = function (request) {
                request.setRequestHeader("Authorization", `${that.$store.getters.getToken}`);
                request.setRequestHeader("Accept", 'application/json');
                request.setRequestHeader("Content-Type", 'application/json');
            };
            this.options.minimumInputLength = 1;
            this.options.cache = false;
            this.options.dir = mUtil.isRTL() ? "rtl" : null;
        },
        mounted: function () {
            let that = this;
            $(this.$refs.select2Input)
                .val(this.value)
                .select2(this.options)
                .on('change', function () {
                    that.$emit('input', this.value)
                })
        },
        computed: {
            inputName: function () {
                return this.lang.get(`validation.attributes.${this.name}`).capitalize();
            },
        },
        destroyed: function () {
            $(this.$refs.select2Input).off().select2('destroy')
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$refs.select2Input).select2().val(value).trigger('change')
            }
        },
    }
</script>

<style scoped>

</style>
