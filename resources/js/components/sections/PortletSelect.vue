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
            <option disabled="disabled" selected="selected">{{ lang.get('pages.buttons.select') }}</option>
            <slot></slot>

        </select>

        <feedback :show="errors.has( name ) || hasErrors.has( name )">
            {{ errors.first( name ) || hasErrors.first( name ) }}
        </feedback>
    </div>
</template>

<script>
    import {Errors} from "../../services/Errors";
    import {mixinSelect2} from "../../mixins/mixin-select2";

    export default {
        name: "PortletSelect",
        mixins: [ mixinSelect2 ],
        props: {
            options: {
                type: [Array, Object]
            },
            data: {
                type: [ Array, Object ],
                default: () => { return [] }
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
            if ( this.data.length > 0 ) {
                this.options.data = this.data;
            }
            if ( this.options.ajax ) {
                this.options.ajax.delay = 250;
                this.options.ajax.dataType = 'json';
                this.options.ajax.beforeSend = function (request) {
                    request.setRequestHeader("Authorization", `${that.$store.getters.getToken}`);
                    request.setRequestHeader("Accept", 'application/json');
                    request.setRequestHeader("Content-Type", 'application/json');
                };
                this.options.minimumInputLength = 1;
                this.options.cache = false;
            }
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
                $(this.$refs.select2Input).select2( this.options ).val(value).trigger('change')
            },
            data: function (data) {
                // update options
                if ( this.data.length > 0 ) {
                    this.options.data = data;
                    $(this.$refs.select2Input).select2('destroy');
                    $(this.$refs.select2Input).empty();
                    $(this.$refs.select2Input).select2( this.options ).val(null).trigger('change');
                }
            }
        },
    }
</script>

<style scoped>

</style>
