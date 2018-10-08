import VueQrcode from '@xkeshi/vue-qrcode';
const GlobalComponents = {
    install(Vue) {
        Vue.component('login', () => import(/* webpackChunkName: "global" */ './views/auth/Login.vue'));
        Vue.component('portlet-wizard-step', () => import(/* webpackChunkName: "global" */ './components/sections/WizardStep'));
        Vue.component('portlet-wizard', () => import(/* webpackChunkName: "global" */ './components/sections/PortletWizard'));
        Vue.component('portlet-date-time', () => import(/* webpackChunkName: "global" */ './components/sections/DateTimePicker'));
        Vue.component('portlet-select', () => import(/* webpackChunkName: "global" */ './components/sections/PortletSelect'));
        Vue.component('portlet-submit', () => import(/* webpackChunkName: "global" */ './components/sections/SubmitButton'));
        Vue.component('login-layout', () => import(/* webpackChunkName: "global" */'./components/sections/LoginLayout'));
        Vue.component('dashboard-layout', () => import(/* webpackChunkName: "global" */'./components/sections/DashboardLayout'));
        Vue.component('quick-sidebar', () => import(/* webpackChunkName: "global" */'./components/sections/QuickSideBar'));
        Vue.component('scroll-top', () => import(/* webpackChunkName: "global" */'./components/sections/ScrollTop'));
        Vue.component('layout-tolltips', () => import(/* webpackChunkName: "global" */'./components/sections/LayoutToolTips'));
        Vue.component('loader-base', () => import(/* webpackChunkName: "global" */'./components/sections/LoaderBase'));

        Vue.component('top-navbar-user', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBarUserProfile'));
        Vue.component('top-bar-search', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBarSearch'));
        Vue.component('top-bar-notifications', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBarNotifications'));
        Vue.component('top-bar-quick-actions', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBarQuickActions'));
        Vue.component('top-bar-languages', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBarLanguages'));
        Vue.component('top-bar-languages', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBarLanguages'));
        Vue.component('top-bar', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/TopBar'));
        Vue.component('brand', () => import(/* webpackChunkName: "global" */'./components/sections/topbar/Brand'));

        Vue.component('header-base', () => import(/* webpackChunkName: "global" */'./components/sections/HeaderBase'));
        Vue.component('hor-menu', () => import(/* webpackChunkName: "global" */'./components/sections/HorMenu'));
        Vue.component('sub-header', () => import(/* webpackChunkName: "global" */'./components/sections/Subheader'));

        Vue.component('menu-left', () => import(/* webpackChunkName: "global" */'./components/sections/aside/Aside'));
        Vue.component('aside-left', () => import(/* webpackChunkName: "global" */'./components/sections/aside/AsideLeft.vue'));
        Vue.component('aside-section', () => import(/* webpackChunkName: "global" */'./components/sections/aside/AsideSection.vue'));
        Vue.component('aside-menu', () => import(/* webpackChunkName: "global" */'./components/sections/aside/AsideMenu.vue'));
        Vue.component('aside-menu-sub-menu', () => import(/* webpackChunkName: "global" */'./components/sections/aside/AsideMenuWithSubMenu.vue'));
        Vue.component('aside-menu-item', () => import(/* webpackChunkName: "global" */'./components/sections/aside/AsideMenuItem.vue'));
        Vue.component('aside-menu-badge', () => import(/* webpackChunkName: "global" */'./components/sections/aside/MenuBadge.vue'));

        Vue.component('vue-footer', () => import(/* webpackChunkName: "global" */'./components/sections/Footer.vue'));
        Vue.component('draggable-row', () => import(/* webpackChunkName: "global" */'./components/sections/DraggableRow.vue'));

        Vue.component('portlet', () => import(/* webpackChunkName: "global" */'./components/sections/Portlet.vue'));
        Vue.component('empty-portlet', () => import(/* webpackChunkName: "global" */'./components/sections/EmptyPortlet.vue'));
        Vue.component('action-item', () => import(/* webpackChunkName: "global" */'./components/sections/aside/ActionItem.vue'));
        Vue.component('portlet-tool', () => import(/* webpackChunkName: "global" */'./components/sections/PortletTool.vue'));
        Vue.component('portlet-form', () => import(/* webpackChunkName: "global" */'./components/sections/PortletForm.vue'));
        Vue.component('portlet-input', () => import(/* webpackChunkName: "global" */'./components/sections/PortletInput.vue'));
        Vue.component('data-table', () => import(/* webpackChunkName: "global" */'./components/sections/DataTable.vue'));
        Vue.component('portlet-dropdown-actions', () => import(/* webpackChunkName: "global" */'./components/sections/PortletDropdownActions.vue'));
        Vue.component('feedback', () => import(/* webpackChunkName: "global" */'./components/sections/Feedback.vue'));
        Vue.component('qrcode', VueQrcode);
    }
};

export default GlobalComponents;
