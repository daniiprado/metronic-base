export const mixinSelect2 = {
    name: "mixin-select2",
    data: () => {
        return {
            defaults: {
                dir: mUtil.isRTL() ? "rtl" : null,
                language: 'es',
                placeholder: lang.get('pages.buttons.select'),
                allowClear: true
            }
        }
    },
    mounted: function () {
        $.fn.select2.defaults = this.defaults;
    }
}
