<template>
    <form @submit.prevent="onSubmit" class="m-login__form m-form" method="post" :action="action" @keydown="form.errors.clear( $event.target.name )">
        <div v-if="alert" class="m-alert m-alert--outline alert alert-danger" role="alert">
            <span v-text="alert"></span>
        </div>
        <slot></slot>
        <div class="form-group m-form__group" :class="{'has-danger': ( errors.has('email') || form.errors.has('email') ) }">
            <input class="form-control m-input" v-validate="'required|email'"
                   type="email"
                   v-model="form.email"
                   :placeholder="lang.get('validation.attributes.email').capitalize()"
                   name="email" autocomplete="off">
            <feedback :show="form.errors.has('email') || errors.has('email')">
                {{ errors.first('email') || form.errors.first('email') }}
            </feedback>
        </div>
        <div class="form-group m-form__group" :class="{'has-danger': form.errors.has('password') || errors.has('password') }">
            <input class="form-control m-input m-login__form-input--last" v-validate="'required'"
                   type="password"
                   v-model="form.password"
                   :placeholder="lang.get('validation.attributes.password').capitalize()"
                   @keydown="form.errors.clear('password')"
                   name="password">

            <feedback :show="form.errors.has('password') || errors.has('password')">
                {{ form.errors.first('password') || errors.first('password') }}
            </feedback>
        </div>
        <div class="row m-login__form-sub">
            <div class="col m--align-left">
                <label class="m-checkbox m-checkbox--focus">
                    <input type="checkbox" name="remember" v-model="form.remember">
                    {{ lang.get('validation.attributes.remember_me').capitalize() }}
                    <span></span>
                </label>
            </div>
            <div class="col m--align-right">
                <a href="javascript:;" id="m_login_forget_password" class="m-link" v-text="lang.get('pages.login.forget_password')"></a>
            </div>
        </div>
        <div class="m-login__form-action">
            <button id="m_login_signin_submit" type="submit"
                    class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air"
                    :class="{ 'm-loader m-loader--right m-loader--light': loading }"
                    :disabled="loading || form.errors.any() || errors.any()"
                    v-text="lang.get('pages.buttons.sign_in')">
            </button>
        </div>
    </form>
</template>

<script>
    import {MixinMoment} from "../../mixins/mixin-moment";
    import {Form} from "../../services/Form";

    export default {
        name: "Login",
        mixins: [MixinMoment],
        props: {
            action: {
                type: String,
                required: true
            }
        },
        mounted: function () {

        },
        data: () => {
            return {
                lang: lang,
                loading: false,
                form: new Form({
                    email: null,
                    password: null,
                    remember: false
                }),
                alert: null,
            }
        },
        methods: {
            onSubmit: function () {
                this.$validator.validateAll().then( (result) => {
                    if ( result ) {
                        this.loading = true;
                        this.$store.dispatch('login', this.form.data())
                            .then(() => {
                                this.$store.dispatch('auth_user')
                                    .then(() => {
                                        window.location = window.localStorage.getItem('next') || '/';
                                        window.localStorage.removeItem('next');
                                    })
                            })
                            .catch((error) => {
                                this.alert = this.lang.get('auth.failed');
                                this.loading = false;
                                this.onFail(error);
                            });
                    }
                });
            },

            onFail: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$auth.destroyCookie()
                    })
            }
        }
    }
</script>

<style scoped>

</style>
