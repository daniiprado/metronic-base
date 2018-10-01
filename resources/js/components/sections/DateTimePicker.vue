<template>
    <div class="form-group m-form__group" :class="{'has-danger': ( errors.has( name ) || hasErrors.has( name ) ) }">
        <label :for="name"> {{ inputName | capitalize }} </label>
        <input type="text" :id="name"
               v-bind="inputAttrs"
               autocomplete="off"
               :name="name"
               :value="value"
               v-validate="validation"
               :data-vv-as="inputName"
               class="form-control"
               :ref="name"
               :placeholder="inputName.capitalize()">
        <slot></slot>
        <feedback :show="errors.has( name ) || hasErrors.has( name )">
            {{ errors.first( name ) || hasErrors.first( name ) }}
        </feedback>
    </div>
</template>

<script>
    import {Errors} from "../../services/Errors";


    export default {
        name: "DateTimePicker",
        props: {
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
        mounted: function () {
            let that = this;
            $(`#${this.name}`).datetimepicker({
                clearBtn: true,
                language: 'es',
                todayBtn: true,
                todayHighlight: true,
                autoclose: true,
                format: 'yyyy-mm-dd hh:ii:ss'
            }).on('changeDate', function(e) {
                that.$emit('input', this.value)
            });
        },
        computed: {
            inputName: function () {
                return this.lang.get(`validation.attributes.${this.name}`)
            },
        },
        filters: {
            capitalize: function (value) {
                return value.capitalize();
            }
        }
    }
</script>

<style scoped>

</style>
