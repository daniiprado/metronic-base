<template>
    <!-- BEGIN: Topbar -->
    <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general m-stack--fluid">
        <div class="m-stack__item m-topbar__nav-wrapper">
            <ul class="m-topbar__nav m-nav m-nav--inline">

                <!--[html-partial:include:{"file":"partials\/_topbar-search-dropdown.html"}]/-->
                <!--
                <top-bar-search></top-bar-search>
                -->

                <!--[html-partial:include:{"file":"partials\/_topbar-notifications.html"}]/-->
                <!--
                <top-bar-notifications></top-bar-notifications>
                -->

                <!--[html-partial:include:{"file":"partials\/_topbar-quick-actions.html"}]/-->
                <!--
                <top-bar-quick-actions></top-bar-quick-actions>
                -->
                <!--[html-partial:include:{"file":"partials\/_topbar-languages.html"}]/-->
                <top-bar-languages></top-bar-languages>

                <!--[html-partial:include:{"file":"partials\/_topbar-user-profile.html"}]/-->
                <top-navbar-user></top-navbar-user>
                <!--
                <li id="m_quick_sidebar_toggle" class="m-nav__item">
                    <a href="javascript:;" class="m-nav__link m-dropdown__toggle">
                    <span class="m-nav__link-icon">
                        <i class="flaticon-grid-menu"></i>
                    </span>
                    </a>
                </li>
                -->
            </ul>
        </div>
    </div>
    <!-- END: Topbar -->
</template>

<script>
    export default {
        name: "TopBar",
        data: () => {
            return {
                topbarAside: $('#m_quick_sidebar'),
                topbarAsideTabs: $('#m_quick_sidebar_tabs'),
                topbarAsideContent: null,
            }
        },
        mounted: function () {
            this.topbarAsideContent = this.topbarAside.find('.m-quick-sidebar__content');
            this.$nextTick(() => {
                this.initOffcanvas();
            })
        },
        methods: {
            initMessages: function() {
                let messages = mUtil.find( mUtil.get('m_quick_sidebar_tabs_messenger'),  '.m-messenger__messages');
                let form = $('#m_quick_sidebar_tabs_messenger .m-messenger__form');
                let that = this;
                mUtil.scrollerInit(messages, {
                    disableForMobile: true,
                    resetHeightOnDestroy: false,
                    handleWindowResize: true,
                    height: function() {
                        let height = that.topbarAside.outerHeight(true) -
                            that.topbarAsideTabs.outerHeight(true) -
                            form.outerHeight(true) - 120;

                        return height;
                    }
                });
            },
            initSettings: function() {
                let settings = mUtil.find( mUtil.get('m_quick_sidebar_tabs_settings'),  '.m-list-settings');
                let that = this;

                if (!settings) {
                    return;
                }

                mUtil.scrollerInit(settings, {
                    disableForMobile: true,
                    resetHeightOnDestroy: false,
                    handleWindowResize: true,
                    height: function() {
                        return mUtil.getViewPort().height - that.topbarAsideTabs.outerHeight(true) - 60;
                    }
                });
            },
            initLogs: function() {
                let logs = mUtil.find( mUtil.get('m_quick_sidebar_tabs_logs'),  '.m-list-timeline');
                let that = this;

                if (!logs) {
                    return;
                }

                mUtil.scrollerInit(logs, {
                    disableForMobile: true,
                    resetHeightOnDestroy: false,
                    handleWindowResize: true,
                    height: function() {
                        return mUtil.getViewPort().height - that.topbarAsideTabs.outerHeight(true) - 60;
                    }
                });
            },
            initOffcanvasTabs: function() {
                this.initMessages();
                this.initSettings();
                this.initLogs();
            },
            initOffcanvas: function() {
                let topbarAsideObj = new mOffcanvas('m_quick_sidebar', {
                    overlay: true,
                    baseClass: 'm-quick-sidebar',
                    closeBy: 'm_quick_sidebar_close',
                    toggleBy: 'm_quick_sidebar_toggle'
                });
                let that = this;

                // run once on first time dropdown shown
                topbarAsideObj.one('afterShow', function() {
                    mApp.block(that.topbarAside);

                    setTimeout(function() {
                        mApp.unblock(that.topbarAside);

                        that.topbarAsideContent.removeClass('m--hide');

                        that.initOffcanvasTabs();
                    }, 1000);
                });
            }
        }
    }
</script>

<style scoped>

</style>
