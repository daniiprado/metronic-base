<template>
    <li class="m-nav__item m-topbar__languages m-dropdown m-dropdown--small m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-right m-dropdown--mobile-full-width" m-dropdown-toggle="click">
        <a href="#" class="m-nav__link m-dropdown__toggle">
        <span class="m-nav__link-text">
            <img class="m-topbar__language-selected-img" :src="flag">
        </span>
        </a>
        <div class="m-dropdown__wrapper"><span
                class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__header m--align-center"
                     :style="bg">
                    <span class="m-dropdown__header-subtitle">{{ lang.get('pages.top-bar.language') }}</span></div>
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="m-nav m-nav--skin-light">
                            <li class="m-nav__item" :class="{ 'm-nav__item--active': selected === 'en' }">
                                <a href="javascript:;" class="m-nav__link" @click="onLang('en')" :class="{ 'm-nav__link--active': selected === 'en' }">
                                    <span class="m-nav__link-icon">
                                        <img class="m-topbar__language-img" :src="en.flag">
                                    </span>
                                    <span class="m-nav__link-title m-topbar__language-text m-nav__link-text" v-text="en.name"></span>
                                </a>
                            </li>
                            <li class="m-nav__item" :class="{ 'm-nav__item--active': selected === 'es' }">
                                <a href="javascript:;" class="m-nav__link" @click="onLang('es')" :class="{ 'm-nav__link--active': selected === 'es' }">
                                    <span class="m-nav__link-icon">
                                        <img class="m-topbar__language-img" :src="es.flag">
                                    </span>
                                    <span class="m-nav__link-title m-topbar__language-text m-nav__link-text" v-text="es.name"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        name: "TopBarLanguages",
        data: () => {
            return {
                lang: lang,
                bg: 'background: url('+ require('./../../../assets/img/misc/quick_actions_bg.jpg') +'); background-size: cover;',
                es: {
                    name: 'Español',
                    flag: require('./../../../assets/img/flags/016-spain.svg')
                },
                en: {
                    name: 'English',
                    flag: require('./../../../assets/img/flags/020-flag.svg')
                },
                selected: Cookies.get('lang') || 'es',
                flag: 'es',
            }
        },
        created: function () {
            this.flag = this.selected === 'es' ? this.es.flag : this.en.flag
        },
        methods: {
            onLang: function (name) {
                Cookies.set('lang', name);
                window.location.reload();
            }
        },
        watch: {
            flag: function (flag) {
                this.flag = flag;
            },
            selected: function (selected) {
                this.selected = selected;
            }
        }
    }
</script>

<style scoped>

</style>
