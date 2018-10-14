export const MixinTooltip = {
    name: 'mixin-tooltip',
    mounted: function () {
        this.initTooltips();
    },
    methods: {
        initTooltips: function () {
            let that = this;
            $('[data-toggle="m-tooltip"]').each(function() {
                that.destroyTooltip($(this))
                that.$nextTick(() => {
                    that.initTooltip($(this));
                })
            });
        },
        initTooltip: function(el) {
            let skin = el.data('skin') ? 'm-tooltip--skin-' + el.data('skin') : '';
            let width = el.data('width') == 'auto' ? 'm-tooltop--auto-width' : '';
            let triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
            let placement = el.data('placement') ? el.data('placement') : 'left';

            el.tooltip({
                trigger: triggerValue,
                template: '<div class="m-tooltip ' + skin + ' ' + width + ' tooltip" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
            });
        },
        destroyTooltip: function (el) {
            //el.tooltip('destroy');
        }
    }
};