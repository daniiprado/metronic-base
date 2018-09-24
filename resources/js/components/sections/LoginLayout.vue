<template>
    <div class="m-login m-login--signin  m-login--5" id="m_login" :style="`background-image: url(${bg});`">
        <div class="m-login__wrapper-1 m-portlet-full-height">
            <div class="m-login__wrapper-1-1">
                <div class="m-login__contanier">
                    <div class="m-login__content">
                        <div class="m-login__logo">
                            <a href="#">
                                <img :src="logo">
                            </a>
                        </div>
                        <div class="m-login__title">
                            <h3>{{ brand }}</h3>
                        </div>
                        <div class="m-login__desc">
                            Amazing Stuff is Lorem Here.Grownng Team
                        </div>
                    </div>
                </div>
                <div class="m-login__border">
                    <div></div>
                </div>
            </div>
        </div>
        <div class="m-login__wrapper-2 m-portlet-full-height">
            <div class="m-login__contanier">
                <div class="m-login__signin">
                    <div class="m-login__head">
                        <h3 class="m-login__title">Login To Your Account</h3>
                    </div>
                    <login action="/login"></login>
                </div>
                <div class="m-login__forget-password">
                    <div class="m-login__head">
                        <h3 class="m-login__title">Forgotten Password ?</h3>
                        <div class="m-login__desc">Enter your email to reset your password:</div>
                    </div>
                    <form class="m-login__form m-form" action="">
                        <div class="form-group m-form__group">
                            <input class="form-control m-input" type="text" placeholder="Email" name="email" id="m_email" autocomplete="off">
                        </div>
                        <div class="m-login__form-action">
                            <button id="m_login_forget_password_submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air">Request</button>
                            <button id="m_login_forget_password_cancel" class="btn btn-outline-focus m-btn m-btn--pill m-btn--custom ">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {API} from "../../services/Api";

    export default {
        name: "LoginLayout",
        data: () => {
            return {
                brand: API.APP_NAME,
                logo: require('./../../assets/img/logos/logo-2.png'),
                bg: require('./../../assets/img/bg/bg-3.jpg'),
            }
        }
    }
</script>

<style scoped>

</style>
