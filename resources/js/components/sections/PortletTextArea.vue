<template>
    <div class="form-group m-form__group" :class="{'has-danger': ( errors.has( name ) || hasErrors.has( name ) ) }">
        <label :for="name"> {{ inputName | capitalize }} </label>

        <textarea v-bind="inputAttrs"
                  autocomplete="off"
                  :name="name"
                  :value="value"
                  @input="$emit('input', $event.target.value)"
                  v-validate="validation"
                  :data-vv-as="inputName"
                  class="form-control m-input m_maxlength"
                  :placeholder="inputName.capitalize()"
                  rows="3">

        </textarea>

        <feedback :show="errors.has( name ) || hasErrors.has( name )">
            {{ errors.first( name ) || hasErrors.first( name ) }}
        </feedback>
        <slot></slot>
    </div>
</template>

<script>
    import {Errors} from "../../services/Errors";

    export default {
        name: "PortletTextArea",
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
            },
            col: {
                type: String,
                default: '12'
            }
        },
        data: () => {
            return {
                lang: lang,
            }
        },
        mounted: function () {
            $('.m_maxlength').maxlength({
                threshold: 5,
                alwaysShow: true,
                warningClass: "m-badge m-badge--primary m-badge--rounded m-badge--wide",
                limitReachedClass: "m-badge m-badge--brand m-badge--rounded m-badge--wide",
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
