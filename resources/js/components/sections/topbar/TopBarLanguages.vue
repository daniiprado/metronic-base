<template>
    <li class="m-nav__item m-topbar__languages m-dropdown m-dropdown--small m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-right m-dropdown--mobile-full-width" m-dropdown-toggle="click">
        <a href="#" class="m-nav__link m-dropdown__toggle">
        <span class="m-nav__link-text">
            <img class="m-topbar__language-selected-img" :src="es.flag">
        </span>
        </a>
        <div class="m-dropdown__wrapper"><span
            class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
            <div class="m-dropdown__inner">
                <div class="m-dropdown__header m--align-center"
                     :style="bg">
                    <span class="m-dropdown__header-subtitle">Select your language</span></div>
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="m-nav m-nav--skin-light">
                            <li class="m-nav__item m-nav__item--active">
                                <a href="javascript:;" class="m-nav__link m-nav__link--active">
                                    <span class="m-nav__link-icon">
                                        <img class="m-topbar__language-img" :src="en.flag">
                                    </span>
                                    <span class="m-nav__link-title m-topbar__language-text m-nav__link-text" v-text="en.name"></span>
                                </a>
                            </li>
                            <li class="m-nav__item">
                                <a href="javascript:;" class="m-nav__link">
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
    export default {
        name: "TopBarLanguages",
        data: () => {
            return {
                bg: 'background: url('+ require('./../../../assets/img/misc/quick_actions_bg.jpg') +'); background-size: cover;',
                es: {
                    name: 'Español',
                    flag: require('./../../../assets/img/flags/016-spain.svg')
                },
                en: {
                    name: 'English',
                    flag: require('./../../../assets/img/flags/020-flag.svg')
                },
            }
        }
    }
</script>

<style scoped>

</style>
