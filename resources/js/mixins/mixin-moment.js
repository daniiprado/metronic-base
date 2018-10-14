import moment from 'moment-timezone';
import 'moment-timezone'
import Cookies from 'js-cookie';

export const MixinMoment = {
    name: 'mixin-moment',
    data: () => {
        return {
            locale: Cookies.get('locale') || 'es',
            tz: Cookies.get('locale') || 'America/Bogota',
        }
    },
    created() {
        moment().tz( this.tz ).locale( this.locale );
    },
    methods: {
        nowYear: function () {
            return moment().year();
        },
        duration: function ( seconds ) {
            return moment().duration( seconds, 'seconds' ).format('D')
        },
        humanize: function (date) {
            if (typeof date === 'object') {
                return (date && moment(date.date).isValid() ) ? moment(date.date).tz(date.timezone).locale( this.locale ).format("ddd, MMM YYYY, hA") : null;
            }
            return (date && moment(date).isValid() ) ? moment(date.date).tz( this.tz ).locale( this.locale ).format("ddd, MMM YYYY, hA") : null;
        },
        input: function (date) {
            if (typeof date === 'object') {
                return (date && moment(date.date).isValid() ) ? moment(date.date).tz(date.timezone).locale( this.locale ).format("YYYY-MM-DD HH:mm:ss") : null;
            }
            return (date && moment(date).isValid() ) ? moment(date.date).tz( this.tz ).locale( this.locale ).format("YYYY-MM-DD HH:mm:ss") : null;
        }
    }
};
