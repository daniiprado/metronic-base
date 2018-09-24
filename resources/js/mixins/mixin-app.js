import Cookies from 'js-cookie';
//import mUtil from './../assets/framework/base/util';
import mPortlet from './../assets/framework/components/portlet';
import mOffcanvas from './../assets/framework/components/offcanvas';
import mMenu from './../assets/framework/components/menu';
import mToggle from './../assets/framework/components/toggle';
import mScrollTop from './../assets/framework/components/scroll-top';
import mQuicksearch from './../assets/framework/components/quicksearch';
import mHeader from './../assets/framework/components/header';
//import './../assets/framework/components/datatable';

//== Global variables
window.mUtilElementDataStore = {};
window.mUtilElementDataStoreID = 0;
window.mUtilDelegatedEventHandlers = {};
export const mUtil = {
    name: 'mUtil',
    data: () => {
        return {
            resizeHandlers: [],
            breakpoints: {
                sm: 544, // Small screen / phone
                md: 768, // Medium screen / tablet
                lg: 1024, // Large screen / desktop
                xl: 1200 // Extra large screen / wide desktop
            }
        }
    },
    methods: {
        _runResizeHandlers: function() {
            // reinitialize other subscribed elements
            for (var i = 0; i < this.resizeHandlers.length; i++) {
                var each = this.resizeHandlers[i];
                each.call();
            }
        },
        /**
         * Handle window resize event with some
         * delay to attach event handlers upon resize complete
         */
        _windowResizeHandler: function() {
            let that = this;
            this._runResizeHandlers();

            var timeout = false; // holder for timeout id
            var delay = 250; // delay after event is "complete" to run callback

            window.addEventListener('resize', function() {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    that._runResizeHandlers();
                }, delay); // wait 50ms until window resize finishes.
            });
        },

        /**
         * Class main initializer.
         * @param {object} options.
         * @returns null
         */
        //main function to initiate the theme
        init: function(options) {
            if (options && options.breakpoints) {
                this.breakpoints = options.breakpoints;
            }
            this._windowResizeHandler();
        },

        /**
         * Adds window resize event handler.
         * @param {function} callback function.
         */
        addResizeHandler: function(callback) {
            this.resizeHandlers.push(callback);
        },

        /**
         * Removes window resize event handler.
         * @param {function} callback function.
         */
        removeResizeHandler: function(callback) {
            for (var i = 0; i < this.resizeHandlers.length; i++) {
                if (callback === this.resizeHandlers[i]) {
                    delete this.resizeHandlers[i];
                }
            }
        },

        /**
         * Trigger window resize handlers.
         */
        runResizeHandlers: function() {
            this._runResizeHandlers();
        },

        resize: function() {
            if (typeof(Event) === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            } else {
                // for IE and other old browsers
                // causes deprecation warning on modern browsers
                var evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
        },

        /**
         * Get GET parameter value from URL.
         * @param {string} paramName Parameter name.
         * @returns {string}
         */
        getURLParam: function(paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }

            return null;
        },

        /**
         * Checks whether current device is mobile touch.
         * @returns {boolean}
         */
        isMobileDevice: function() {
            return (this.getViewPort().width < this.getBreakpoint('lg') ? true : false);
        },

        /**
         * Checks whether current device is desktop.
         * @returns {boolean}
         */
        isDesktopDevice: function() {
            return this.isMobileDevice() ? false : true;
        },

        /**
         * Gets browser window viewport size. Ref:
         * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
         * @returns {object}
         */
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

        /**
         * Checks whether given device mode is currently activated.
         * @param {string} mode Responsive mode name(e.g: desktop,
         *     desktop-and-tablet, tablet, tablet-and-mobile, mobile)
         * @returns {boolean}
         */
        isInResponsiveRange: function(mode) {
            var breakpoint = this.getViewPort().width;

            if (mode == 'general') {
                return true;
            } else if (mode == 'desktop' && breakpoint >= (this.getBreakpoint('lg') + 1)) {
                return true;
            } else if (mode == 'tablet' && (breakpoint >= (this.getBreakpoint('md') + 1) && breakpoint < this.getBreakpoint('lg'))) {
                return true;
            } else if (mode == 'mobile' && breakpoint <= this.getBreakpoint('md')) {
                return true;
            } else if (mode == 'desktop-and-tablet' && breakpoint >= (this.getBreakpoint('md') + 1)) {
                return true;
            } else if (mode == 'tablet-and-mobile' && breakpoint <= this.getBreakpoint('lg')) {
                return true;
            } else if (mode == 'minimal-desktop-and-below' && breakpoint <= this.getBreakpoint('xl')) {
                return true;
            }

            return false;
        },

        /**
         * Generates unique ID for give prefix.
         * @param {string} prefix Prefix for generated ID
         * @returns {boolean}
         */
        getUniqueID: function(prefix) {
            return prefix + Math.floor(Math.random() * (new Date()).getTime());
        },

        /**
         * Gets window width for give breakpoint mode.
         * @param {string} mode Responsive mode name(e.g: xl, lg, md, sm)
         * @returns {number}
         */
        getBreakpoint: function(mode) {
            return this.breakpoints[mode];
        },

        /**
         * Checks whether object has property matchs given key path.
         * @param {object} obj Object contains values paired with given key path
         * @param {string} keys Keys path seperated with dots
         * @returns {object}
         */
        isset: function(obj, keys) {
            var stone;

            keys = keys || '';

            if (keys.indexOf('[') !== -1) {
                throw new Error('Unsupported object path notation.');
            }

            keys = keys.split('.');

            do {
                if (obj === undefined) {
                    return false;
                }

                stone = keys.shift();

                if (!obj.hasOwnProperty(stone)) {
                    return false;
                }

                obj = obj[stone];

            } while (keys.length);

            return true;
        },

        /**
         * Gets highest z-index of the given element parents
         * @param {object} el jQuery element object
         * @returns {number}
         */
        getHighestZindex: function(el) {
            var elem = this.get(el),
                position, value;

            while (elem && elem !== document) {
                // Ignore z-index if position is set to a value where z-index is ignored by the browser
                // This makes behavior of this function consistent across browsers
                // WebKit always returns auto if the element is positioned
                position = this.css(elem, 'position');

                if (position === "absolute" || position === "relative" || position === "fixed") {
                    // IE returns 0 when zIndex is not specified
                    // other browsers return a string
                    // we ignore the case of nested elements with an explicit value of 0
                    // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                    value = parseInt(this.css(elem, 'z-index'));

                    if (!isNaN(value) && value !== 0) {
                        return value;
                    }
                }

                elem = elem.parentNode;
            }

            return null;
        },

        /**
         * Checks whether the element has any parent with fixed positionfreg
         * @param {object} el jQuery element object
         * @returns {boolean}
         */
        hasFixedPositionedParent: function(el) {
            while (el && el !== document) {
                position = this.css(el, 'position');

                if (position === "fixed") {
                    return true;
                }

                el = el.parentNode;
            }

            return false;
        },

        /**
         * Simulates delay
         */
        sleep: function(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        },

        /**
         * Gets randomly generated integer value within given min and max range
         * @param {number} min Range start value
         * @param {number} min Range end value
         * @returns {number}
         */
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
         * Checks whether Angular library is included
         * @returns {boolean}
         */
        isAngularVersion: function() {
            return window.Zone !== undefined ? true : false;
        },

        //== jQuery Workarounds

        //== Deep extend:  $.extend(true, {}, objA, objB);
        deepExtend: function(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];

                if (!obj)
                    continue;

                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object')
                            out[key] = this.deepExtend(out[key], obj[key]);
                        else
                            out[key] = obj[key];
                    }
                }
            }

            return out;
        },

        //== extend:  $.extend({}, objA, objB);
        extend: function(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i])
                    continue;

                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        out[key] = arguments[i][key];
                }
            }

            return out;
        },

        get: function(query) {
            var el;

            if (query === document) {
                return document;
            }

            if (!!(query && query.nodeType === 1)) {
                return query;
            }

            if (el = document.getElementById(query)) {
                return el;
            } else if (el = document.getElementsByTagName(query)) {
                return el[0];
            } else if (el = document.getElementsByClassName(query)) {
                return el[0];
            } else {
                return null;
            }
        },

        getByClass: function(query) {
            var el;

            if (el = document.getElementsByClassName(query)) {
                return el[0];
            } else {
                return null;
            }
        },

        /**
         * Checks whether the element has given classes
         * @param {object} el jQuery element object
         * @param {string} Classes string
         * @returns {boolean}
         */
        hasClasses: function(el, classes) {
            if (!el) {
                return;
            }

            var classesArr = classes.split(" ");

            for (var i = 0; i < classesArr.length; i++) {
                if (this.hasClass(el, this.trim(classesArr[i])) == false) {
                    return false;
                }
            }

            return true;
        },

        hasClass: function(el, className) {
            if (!el) {
                return;
            }

            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
        },

        addClass: function(el, className) {
            if (!el || typeof className === 'undefined') {
                return;
            }

            var classNames = className.split(' ');

            if (el.classList) {
                for (var i = 0; i < classNames.length; i++) {
                    if (classNames[i] && classNames[i].length > 0) {
                        el.classList.add(this.trim(classNames[i]));
                    }
                }
            } else if (!this.hasClass(el, className)) {
                for (var i = 0; i < classNames.length; i++) {
                    el.className += ' ' + this.trim(classNames[i]);
                }
            }
        },

        removeClass: function(el, className) {
            if (!el || typeof className === 'undefined') {
                return;
            }

            var classNames = className.split(' ');

            if (el.classList) {
                for (var i = 0; i < classNames.length; i++) {
                    el.classList.remove(this.trim(classNames[i]));
                }
            } else if (this.hasClass(el, className)) {
                for (var i = 0; i < classNames.length; i++) {
                    el.className = el.className.replace(new RegExp('\\b' + this.trim(classNames[i]) + '\\b', 'g'), '');
                }
            }
        },

        triggerCustomEvent: function(el, eventName, data) {
            if (window.CustomEvent) {
                var event = new CustomEvent(eventName, {
                    detail: data
                });
            } else {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, true, data);
            }

            el.dispatchEvent(event);
        },

        trim: function(string) {
            return string.trim();
        },

        eventTriggered: function(e) {
            if (e.currentTarget.dataset.triggered) {
                return true;
            } else {
                e.currentTarget.dataset.triggered = true;

                return false;
            }
        },

        remove: function(el) {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        },

        find: function(parent, query) {
            parent = this.get(parent);
            if (parent) {
                return parent.querySelector(query);
            }
        },

        findAll: function(parent, query) {
            parent = this.get(parent);
            if (parent) {
                return parent.querySelectorAll(query);
            }
        },

        insertAfter: function(el, referenceNode) {
            return referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        },

        parents: function(el, query) {
            function collectionHas(a, b) { //helper function (see below)
                for (var i = 0, len = a.length; i < len; i++) {
                    if (a[i] == b) return true;
                }

                return false;
            }

            function findParentBySelector(el, selector) {
                var all = document.querySelectorAll(selector);
                var cur = el.parentNode;

                while (cur && !collectionHas(all, cur)) { //keep going up until you find a match
                    cur = cur.parentNode; //go up
                }

                return cur; //will return null if not found
            }

            return findParentBySelector(el, query);
        },

        children: function(el, selector, log) {
            if (!el || !el.childNodes) {
                return;
            }

            var result = [],
                i = 0,
                l = el.childNodes.length;

            for (var i; i < l; ++i) {
                if (el.childNodes[i].nodeType == 1 && this.matches(el.childNodes[i], selector, log)) {
                    result.push(el.childNodes[i]);
                }
            }

            return result;
        },

        child: function(el, selector, log) {
            var children = this.children(el, selector, log);

            return children ? children[0] : null;
        },

        matches: function(el, selector, log) {
            var p = Element.prototype;
            var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };

            if (el && el.tagName) {
                return f.call(el, selector);
            } else {
                return false;
            }
        },

        data: function(element) {
            element = this.get(element);

            return {
                set: function(name, data) {
                    if (element.customDataTag === undefined) {
                        mUtilElementDataStoreID++;
                        element.customDataTag = mUtilElementDataStoreID;
                    }

                    if (mUtilElementDataStore[element.customDataTag] === undefined) {
                        mUtilElementDataStore[element.customDataTag] = {};
                    }

                    mUtilElementDataStore[element.customDataTag][name] = data;
                },

                get: function(name) {
                    return this.has(name) ? mUtilElementDataStore[element.customDataTag][name] : null;
                },

                has: function(name) {
                    return (mUtilElementDataStore[element.customDataTag] && mUtilElementDataStore[element.customDataTag][name]) ? true : false;
                },

                remove: function(name) {
                    if (this.has(name)) {
                        delete mUtilElementDataStore[element.customDataTag][name];
                    }
                }
            };
        },

        outerWidth: function(el, margin) {
            var width;

            if (margin === true) {
                var width = parseFloat(el.offsetWidth);
                width += parseFloat(this.css(el, 'margin-left')) + parseFloat(this.css(el, 'margin-right'));

                return parseFloat(width);
            } else {
                var width = parseFloat(el.offsetWidth);

                return width;
            }
        },

        offset: function(elem) {
            var rect, win;
            elem = this.get(elem);

            if ( !elem ) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error

            if ( !elem.getClientRects().length ) {
                return { top: 0, left: 0 };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;

            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },

        height: function(el) {
            return this.css(el, 'height');
        },

        visible: function(el) {
            return !(el.offsetWidth === 0 && el.offsetHeight === 0);
        },

        attr: function(el, name, value) {
            el = this.get(el);

            if (el == undefined) {
                return;
            }

            if (value !== undefined) {
                el.setAttribute(name, value);
            } else {
                return el.getAttribute(name);
            }
        },

        hasAttr: function(el, name) {
            el = this.get(el);

            if (el == undefined) {
                return;
            }

            return el.getAttribute(name) ? true : false;
        },

        removeAttr: function(el, name) {
            el = this.get(el);

            if (el == undefined) {
                return;
            }

            el.removeAttribute(name);
        },

        animate: function(from, to, duration, update, easing, done) {
            /**
             * TinyAnimate.easings
             *  Adapted from jQuery Easing
             */
            var easings = {};
            var easing;

            easings.linear = function(t, b, c, d) {
                return c * t / d + b;
            };

            easing = easings.linear;

            // Early bail out if called incorrectly
            if (typeof from !== 'number' ||
                typeof to !== 'number' ||
                typeof duration !== 'number' ||
                typeof update !== 'function') {
                return;
            }

            // Create mock done() function if necessary
            if (typeof done !== 'function') {
                done = function() {};
            }

            // Pick implementation (requestAnimationFrame | setTimeout)
            var rAF = window.requestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 50);
            };

            // Animation loop
            var canceled = false;
            var change = to - from;

            function loop(timestamp) {
                var time = (timestamp || +new Date()) - start;

                if (time >= 0) {
                    update(easing(time, from, change, duration));
                }
                if (time >= 0 && time >= duration) {
                    update(to);
                    done();
                } else {
                    rAF(loop);
                }
            }

            update(from);

            // Start animation loop
            var start = window.performance && window.performance.now ? window.performance.now() : +new Date();

            rAF(loop);
        },

        actualCss: function(el, prop, cache) {
            if (el instanceof HTMLElement === false) {
                return;
            }

            if (!el.getAttribute('m-hidden-' + prop) || cache === false) {
                var value;

                // the element is hidden so:
                // making the el block so we can meassure its height but still be hidden
                el.style.cssText = 'position: absolute; visibility: hidden; display: block;';

                if (prop == 'width') {
                    value = el.offsetWidth;
                } else if (prop == 'height') {
                    value = el.offsetHeight;
                }

                el.style.cssText = '';

                // store it in cache
                el.setAttribute('m-hidden-' + prop, value);

                return parseFloat(value);
            } else {
                // store it in cache
                return parseFloat(el.getAttribute('m-hidden-' + prop));
            }
        },

        actualHeight: function(el, cache) {
            return this.actualCss(el, 'height', cache);
        },

        actualWidth: function(el, cache) {
            return this.actualCss(el, 'width', cache);
        },

        getScroll: function(element, method) {
            // The passed in `method` value should be 'Top' or 'Left'
            method = 'scroll' + method;
            return (element == window || element == document) ? (
                self[(method == 'scrollTop') ? 'pageYOffset' : 'pageXOffset'] ||
                (browserSupportsBoxModel && document.documentElement[method]) ||
                document.body[method]
            ) : element[method];
        },

        css: function(el, styleProp, value) {
            el = this.get(el);

            if (!el) {
                return;
            }

            if (value !== undefined) {
                el.style[styleProp] = value;
            } else {
                var value, defaultView = (el.ownerDocument || document).defaultView;
                // W3C standard way:
                if (defaultView && defaultView.getComputedStyle) {
                    // sanitize property name to css notation
                    // (hyphen separated words eg. font-Size)
                    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
                } else if (el.currentStyle) { // IE
                    // sanitize property name to camelCase
                    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                        return letter.toUpperCase();
                    });
                    value = el.currentStyle[styleProp];
                    // convert other units to pixels on IE
                    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                        return (function(value) {
                            var oldLeft = el.style.left,
                                oldRsLeft = el.runtimeStyle.left;
                            el.runtimeStyle.left = el.currentStyle.left;
                            el.style.left = value || 0;
                            value = el.style.pixelLeft + "px";
                            el.style.left = oldLeft;
                            el.runtimeStyle.left = oldRsLeft;
                            return value;
                        })(value);
                    }
                    return value;
                }
            }
        },

        slide: function(el, dir, speed, callback, recalcMaxHeight) {
            if (!el || (dir == 'up' && this.visible(el) === false) || (dir == 'down' && this.visible(el) === true)) {
                return;
            }

            speed = (speed ? speed : 600);
            var calcHeight = this.actualHeight(el);
            var calcPaddingTop = false;
            var calcPaddingBottom = false;

            if (this.css(el, 'padding-top') && this.data(el).has('slide-padding-top') !== true) {
                this.data(el).set('slide-padding-top', this.css(el, 'padding-top'));
            }

            if (this.css(el, 'padding-bottom') && this.data(el).has('slide-padding-bottom') !== true) {
                this.data(el).set('slide-padding-bottom', this.css(el, 'padding-bottom'));
            }

            if (this.data(el).has('slide-padding-top')) {
                calcPaddingTop = parseInt(this.data(el).get('slide-padding-top'));
            }

            if (this.data(el).has('slide-padding-bottom')) {
                calcPaddingBottom = parseInt(this.data(el).get('slide-padding-bottom'));
            }

            if (dir == 'up') { // up
                el.style.cssText = 'display: block; overflow: hidden;';

                if (calcPaddingTop) {
                    this.animate(0, calcPaddingTop, speed, function(value) {
                        el.style.paddingTop = (calcPaddingTop - value) + 'px';
                    }, 'linear');
                }

                if (calcPaddingBottom) {
                    this.animate(0, calcPaddingBottom, speed, function(value) {
                        el.style.paddingBottom = (calcPaddingBottom - value) + 'px';
                    }, 'linear');
                }

                this.animate(0, calcHeight, speed, function(value) {
                    el.style.height = (calcHeight - value) + 'px';
                }, 'linear', function() {
                    callback();
                    el.style.height = '';
                    el.style.display = 'none';
                });


            } else if (dir == 'down') { // down
                el.style.cssText = 'display: block; overflow: hidden;';

                if (calcPaddingTop) {
                    this.animate(0, calcPaddingTop, speed, function(value) {
                        el.style.paddingTop = value + 'px';
                    }, 'linear', function() {
                        el.style.paddingTop = '';
                    });
                }

                if (calcPaddingBottom) {
                    this.animate(0, calcPaddingBottom, speed, function(value) {
                        el.style.paddingBottom = value + 'px';
                    }, 'linear', function() {
                        el.style.paddingBottom = '';
                    });
                }

                this.animate(0, calcHeight, speed, function(value) {
                    el.style.height = value + 'px';
                }, 'linear', function() {
                    callback();
                    el.style.height = '';
                    el.style.display = '';
                    el.style.overflow = '';
                });
            }
        },

        slideUp: function(el, speed, callback) {
            this.slide(el, 'up', speed, callback);
        },

        slideDown: function(el, speed, callback) {
            this.slide(el, 'down', speed, callback);
        },

        show: function(el, display) {
            el.style.display = (display ? display : 'block');
        },

        hide: function(el) {
            el.style.display = 'none';
        },

        addEvent: function(el, type, handler, one) {
            el = this.get(el);
            if (typeof el !== 'undefined') {
                el.addEventListener(type, handler);
            }
        },

        removeEvent: function(el, type, handler) {
            el = this.get(el);
            el.removeEventListener(type, handler);
        },

        on: function(element, selector, event, handler) {
            if (!selector) {
                return;
            }

            var eventId = this.getUniqueID('event');

            thisDelegatedEventHandlers[eventId] = function(e) {
                var targets = element.querySelectorAll(selector);
                var target = e.target;

                while (target && target !== element) {
                    for (var i = 0, j = targets.length; i < j; i++) {
                        if (target === targets[i]) {
                            handler.call(target, e);
                        }
                    }

                    target = target.parentNode;
                }
            }

            this.addEvent(element, event, mUtilDelegatedEventHandlers[eventId]);

            return eventId;
        },

        off: function(element, event, eventId) {
            if (!element || !mUtilDelegatedEventHandlers[eventId]) {
                return;
            }

            this.removeEvent(element, event, mUtilDelegatedEventHandlers[eventId]);

            delete mUtilDelegatedEventHandlers[eventId];
        },

        one: function onetime(el, type, callback) {
            el = this.get(el);

            el.addEventListener(type, function(e) {
                // remove event
                e.target.removeEventListener(e.type, arguments.callee);
                // call handler
                return callback(e);
            });
        },

        hash: function(str) {
            var hash = 0,
                i, chr;

            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }

            return hash;
        },

        animateClass: function(el, animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

            this.addClass(el, 'animated ' + animationName);

            this.one(el, animationEnd, function() {
                this.removeClass(el, 'animated ' + animationName);
            });

            if (callback) {
                this.one(el.animationEnd, callback);
            }
        },

        animateDelay: function(el, value) {
            var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
            for (var i = 0; i < vendors.length; i++) {
                this.css(el, vendors[i] + 'animation-delay', value);
            }
        },

        animateDuration: function(el, value) {
            var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
            for (var i = 0; i < vendors.length; i++) {
                this.css(el, vendors[i] + 'animation-duration', value);
            }
        },

        scrollTo: function(target, offset, duration) {
            var duration = duration ? duration : 500;
            var target = this.get(target);
            var targetPos = target ? this.offset(target).top : 0;
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var from, to;

            if (targetPos > scrollPos) {
                from = targetPos;
                to = scrollPos;
            } else {
                from = scrollPos;
                to = targetPos;
            }

            if (offset) {
                to += offset;
            }

            this.animate(from, to, duration, function(value) {
                document.documentElement.scrollTop = value;
                document.body.parentNode.scrollTop = value;
                document.body.scrollTop = value;
            }); //, easing, done
        },

        scrollTop: function(offset, duration) {
            this.scrollTo(null, offset, duration);
        },

        isArray: function(obj) {
            return obj && Array.isArray(obj);
        },

        ready: function(callback) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }
        },

        isEmpty: function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return true;
        },

        numberString: function(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },

        detectIE: function() {
            var ua = window.navigator.userAgent;

            // Test values; Uncomment to check result …

            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        },

        isRTL: function() {
            return (this.attr(this.get('html'), 'direction') == 'rtl');
        },

        //== Scroller
        scrollerInit: function(element, options) {
            //== Define init function
            function init() {
                var ps;
                var height;

                if (options.height instanceof Function) {
                    height = parseInt(options.height.call());
                } else {
                    height = parseInt(options.height);
                }

                //== Destroy scroll on table and mobile modes
                if (options.disableForMobile && this.isInResponsiveRange('tablet-and-mobile')) {
                    if (ps = this.data(element).get('ps')) {
                        if (options.resetHeightOnDestroy) {
                            this.css(element, 'height', 'auto');
                        } else {
                            this.css(element, 'overflow', 'auto');
                            if (height > 0) {
                                this.css(element, 'height', height + 'px');
                            }
                        }

                        ps.destroy();
                        ps = this.data(element).remove('ps');
                    } else if (height > 0){
                        this.css(element, 'overflow', 'auto');
                        this.css(element, 'height', height + 'px');
                    }

                    return;
                }

                if (height > 0) {
                    this.css(element, 'height', height + 'px');
                }

                this.css(element, 'overflow', 'hidden');

                //== Init scroll
                if (ps = this.data(element).get('ps')) {
                    ps.update();
                } else {
                    this.addClass(element, 'm-scroller');
                    ps = new PerfectScrollbar(element, {
                        wheelSpeed: 0.5,
                        swipeEasing: true,
                        wheelPropagation: false,
                        minScrollbarLength: 40,
                        suppressScrollX: this.isRTL() ? false : true
                    });

                    this.data(element).set('ps', ps);
                }
            }

            //== Init
            this.init();

            //== Handle window resize
            if (options.handleWindowResize) {
                this.addResizeHandler(function() {
                    this.init();
                });
            }
        },

        scrollerUpdate: function(element) {
            var ps;
            if (ps = this.data(element).get('ps')) {
                ps.update();
            }
        },

        scrollersUpdate: function(parent) {
            var scrollers = this.findAll(parent, '.ps');
            for (var i = 0, len = scrollers.length; i < len; i++) {
                this.scrollerUpdate(scrollers[i]);
            }
        },

        scrollerTop: function(element) {
            var ps;
            if (ps = this.data(element).get('ps')) {
                element.scrollTop = 0;
            }
        },

        scrollerDestroy: function(element) {
            var ps;
            if (ps = this.data(element).get('ps')) {
                ps.destroy();
                ps = this.data(element).remove('ps');
            }
        }


    }
};

export const mApp = {
    name: 'mApp',
    mixins: [ mUtil ],
    data: () => {
        return {
            colors: {
                brand:      '#716aca',
                metal:      '#c4c5d6',
                light:      '#ffffff',
                accent:     '#00c5dc',
                primary:    '#5867dd',
                success:    '#34bfa3',
                info:       '#36a3f7',
                warning:    '#ffb822',
                danger:     '#f4516c',
                focus:      '#9816f4'
            }
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        /**
         * Initializes bootstrap tooltip
         */
        initTooltip: function(el) {
            var skin = el.data('skin') ? 'm-tooltip--skin-' + el.data('skin') : '';
            var width = el.data('width') == 'auto' ? 'm-tooltop--auto-width' : '';
            var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';
            var placement = el.data('placement') ? el.data('placement') : 'left';

            el.tooltip({
                trigger: triggerValue,
                template: '<div class="m-tooltip ' + skin + ' ' + width + ' tooltip" role="tooltip">\
                                <div class="arrow"></div>\
                                <div class="tooltip-inner"></div>\
                            </div>'
            });
        },
        /**
         * Initializes bootstrap tooltips
         */
        initTooltips: function() {
            let that = this;
            // init bootstrap tooltips
            $('[data-toggle="m-tooltip"]').each(function() {
                that.initTooltip($(this));
            });
        },
        /**
         * Initializes bootstrap popover
         */
        initPopover: function(el) {
            let skin = el.data('skin') ? 'm-popover--skin-' + el.data('skin') : '';
            let triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

            el.popover({
                trigger: triggerValue,
                template: '\
                            <div class="m-popover ' + skin + ' popover" role="tooltip">\
                                <div class="arrow"></div>\
                                <h3 class="popover-header"></h3>\
                                <div class="popover-body"></div>\
                            </div>'
            });
        },
        /**
         * Initializes bootstrap popovers
         */
        initPopovers: function() {
            let that = this;
            // init bootstrap popover
            $('[data-toggle="m-popover"]').each(function() {
                that.initPopover($(this));
            });
        },
        /**
         * Initializes bootstrap file input
         */
        initFileInput: function() {
            // init bootstrap popover
            $('.custom-file-input').on('change',function(){
                var fileName = $(this).val();
                $(this).next('.custom-file-label').addClass("selected").html(fileName);
            });
        },
        /**
         * Initializes metronic portlet
         */
        initPortlet: function(el, options) {
            // init portlet tools
            let elem = $(el);
            let portlet = new mPortlet(elem[0], options);
        },
        /**
         * Initializes metronic portlets
         */
        initPortlets: function() {
            let that = this;
            // init portlet tools
            $('[m-portlet="true"]').each(function() {
                let el = $(this);
                if ( el.data('portlet-initialized') !== true ) {
                    that.initPortlet(el, {});
                    el.data('portlet-initialized', true);
                }
            });
        },
        /**
         * Initializes scrollable contents
         */
        initScrollers: function() {
            $('[data-scrollable="true"]').each(function(){
                var el = $(this);
                this.scrollerInit(this, {disableForMobile: true, handleWindowResize: true, height: function() {
                        if (this.isInResponsiveRange('tablet-and-mobile') && el.data('mobile-height')) {
                            return el.data('mobile-height');
                        } else {
                            return el.data('height');
                        }
                    }});
            });
        },
        /**
         * Initializes bootstrap alerts
         */
        initAlerts: function() {
            // init bootstrap popover
            $('body').on('click', '[data-close=alert]', function() {
                $(this).closest('.alert').hide();
            });
        },
        /**
         * Initializes Metronic custom tabs
         */
        initCustomTabs: function() {
            // init bootstrap popover
            $('[data-tab-target]').each(function() {
                if ($(this).data('tabs-initialized') == true ) {
                    return;
                }

                $(this).click(function(e) {
                    e.preventDefault();

                    var tab = $(this);
                    var tabs = tab.closest('[data-tabs="true"]');
                    var contents = $( tabs.data('tabs-contents') );
                    var content = $( tab.data('tab-target') );

                    tabs.find('.m-tabs__item.m-tabs__item--active').removeClass('m-tabs__item--active');
                    tab.addClass('m-tabs__item--active');

                    contents.find('.m-tabs-content__item.m-tabs-content__item--active').removeClass('m-tabs-content__item--active');
                    content.addClass('m-tabs-content__item--active');
                });

                $(this).data('tabs-initialized', true);
            });
        },
        hideTouchWarning: function() {
            jQuery.event.special.touchstart = {
                setup: function(_, ns, handle) {
                    if (typeof this === 'function')
                        if (ns.includes('noPreventDefault')) {
                            this.addEventListener('touchstart', handle, {passive: false});
                        } else {
                            this.addEventListener('touchstart', handle, {passive: true});
                        }
                },
            };
            jQuery.event.special.touchmove = {
                setup: function(_, ns, handle) {
                    if (typeof this === 'function')
                        if (ns.includes('noPreventDefault')) {
                            this.addEventListener('touchmove', handle, {passive: false});
                        } else {
                            this.addEventListener('touchmove', handle, {passive: true});
                        }
                },
            };
            jQuery.event.special.wheel = {
                setup: function(_, ns, handle) {
                    if (typeof this === 'function')
                        if (ns.includes('noPreventDefault')) {
                            this.addEventListener('wheel', handle, {passive: false});
                        } else {
                            this.addEventListener('wheel', handle, {passive: true});
                        }
                },
            };
        },
        /**
         * Main class initializer
         */
        init: function(options) {
            if (options && options.colors) {
                this.colors = options.colors;
            }
            this.initComponents();
        },
        initComponents: function () {
            this.hideTouchWarning();
            this.initScrollers();
            this.initTooltips();
            this.initPopovers();
            this.initAlerts();
            this.initPortlets();
            this.initFileInput();
            this.initCustomTabs();
        },

        /**
         * Blocks element with loading indiciator using http://malsup.com/jquery/block/
         * @param {object} target jQuery element object
         * @param {object} options
         */
        block: function(target, options) {
            var el = $(target);

            options = $.extend(true, {
                opacity: 0.03,
                overlayColor: '#000000',
                state: 'brand',
                type: 'loader',
                size: 'lg',
                centerX: true,
                centerY: true,
                message: '',
                shadow: true,
                width: 'auto'
            }, options);

            var skin;
            var state;
            var loading;

            if (options.type == 'spinner') {
                skin = options.skin ? 'm-spinner--skin-' + options.skin : '';
                state = options.state ? 'm-spinner--' + options.state : '';
                loading = '<div class="m-spinner ' + skin + ' ' + state + '"></div';
            } else {
                skin = options.skin ? 'm-loader--skin-' + options.skin : '';
                state = options.state ? 'm-loader--' + options.state : '';
                size = options.size ? 'm-loader--' + options.size : '';
                loading = '<div class="m-loader ' + skin + ' ' + state + ' ' + size + '"></div';
            }

            if (options.message && options.message.length > 0) {
                var classes = 'm-blockui ' + (options.shadow === false ? 'm-blockui-no-shadow' : '');

                html = '<div class="' + classes + '"><span>' + options.message + '</span><span>' + loading + '</span></div>';

                var el = document.createElement('div');
                this.get('body').prepend(el);
                this.addClass(el, classes);
                el.innerHTML = '<span>' + options.message + '</span><span>' + loading + '</span>';
                options.width = this.actualWidth(el) + 10;
                this.remove(el);

                if (target == 'body') {
                    html = '<div class="' + classes + '" style="margin-left:-'+ (options.width / 2) +'px;"><span>' + options.message + '</span><span>' + loading + '</span></div>';
                }
            } else {
                html = loading;
            }

            var params = {
                message: html,
                centerY: options.centerY,
                centerX: options.centerX,
                css: {
                    top: '30%',
                    left: '50%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none',
                    width: options.width
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.opacity,
                    cursor: 'wait',
                    zIndex: '10'
                },
                onUnblock: function() {
                    if (el && el[0]) {
                        this.css(el[0], 'position', '');
                        this.css(el[0], 'zoom', '');
                    }
                }
            };

            if (target == 'body') {
                params.css.top = '50%';
                $.blockUI(params);
            } else {
                var el = $(target);
                el.block(params);
            }
        },

        /**
         * Un-blocks the blocked element
         * @param {object} target jQuery element object
         */
        unblock: function(target) {
            if (target && target != 'body') {
                $(target).unblock();
            } else {
                $.unblockUI();
            }
        },

        /**
         * Blocks the page body element with loading indicator
         * @param {object} options
         */
        blockPage: function(options) {
            return this.block('body', options);
        },

        /**
         * Un-blocks the blocked page body element
         */
        unblockPage: function() {
            return this.unblock('body');
        },

        /**
         * Enable loader progress for button and other elements
         * @param {object} target jQuery element object
         * @param {object} options
         */
        progress: function(target, options) {
            var skin = (options && options.skin) ? options.skin : 'light';
            var alignment = (options && options.alignment) ? options.alignment : 'right';
            var size = (options && options.size) ? 'm-spinner--' + options.size : '';
            var classes = 'm-loader ' + 'm-loader--' + skin + ' m-loader--' + alignment + ' m-loader--' + size;

            this.unprogress(target);

            $(target).addClass(classes);
            $(target).data('progress-classes', classes);
        },

        /**
         * Disable loader progress for button and other elements
         * @param {object} target jQuery element object
         */
        unprogress: function(target) {
            $(target).removeClass($(target).data('progress-classes'));
        },

        /**
         * Gets state color's hex code by color name
         * @param {string} name Color name
         * @returns {string}
         */
        getColor: function(name) {
            return colors[name];
        }
    }
};

export const mLayout = {
    name: 'mLayout',
    mixins:[ mUtil, mApp ],
    data: () => {
        return {
            header: null,
            horMenu: null,
            asideMenu: null,
            asideMenuOffcanvas: null,
            horMenuOffcanvas: null,
            asideLeftToggle: null,
            asideLeftHide: null,
            scrollTop: null,
            quicksearch: null,
            mainPortlet: null,
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {

        init: function() {
            this.initHeader();
            this.initAside();
            this.initMainPortlet();
        },

        initHeader: function() {
            this.initStickyHeader();
            this.initHorMenu();
            this.initTopbar();
            this.initQuicksearch();
            this.initScrollTop();
        },

        initAside: function() {
            this.initLeftAside();
            this.initLeftAsideMenu();
            this.initLeftAsideToggle();
            this.initLeftAsideHide();

            this.onLeftSidebarToggle(function(e) {
                //== Update sticky portlet
                if (mainPortlet) {
                    mainPortlet.updateSticky();
                }

                //== Reload datatable
                var datatables = $('.m-datatable');
                if (datatables) {
                    datatables.each(function() {
                        $(this).mDatatable('redraw');
                    });
                }
            });
        },

        //== Header
        initStickyHeader: function() {
            var tmp;
            var headerEl = this.get('m_header');
            var options = {
                offset: {},
                minimize: {}
            };

            if (this.attr(headerEl, 'm-minimize-mobile') == 'hide') {
                options.minimize.mobile = {};
                options.minimize.mobile.on = 'm-header--hide';
                options.minimize.mobile.off = 'm-header--show';
            } else {
                options.minimize.mobile = false;
            }

            if (this.attr(headerEl, 'm-minimize') == 'hide') {
                options.minimize.desktop = {};
                options.minimize.desktop.on = 'm-header--hide';
                options.minimize.desktop.off = 'm-header--show';
            } else {
                options.minimize.desktop = false;
            }

            if (tmp = this.attr(headerEl, 'm-minimize-offset')) {
                options.offset.desktop = tmp;
            }

            if (tmp = this.attr(headerEl, 'm-minimize-mobile-offset')) {
                options.offset.mobile = tmp;
            }

            this.header = new mHeader('m_header', options);
        },

        //== Hor menu
        initHorMenu: function() {
            // init aside left offcanvas
            this.horMenuOffcanvas = new mOffcanvas('m_header_menu', {
                overlay: true,
                baseClass: 'm-aside-header-menu-mobile',
                closeBy: 'm_aside_header_menu_mobile_close_btn',
                toggleBy: {
                    target: 'm_aside_header_menu_mobile_toggle',
                    state: 'm-brand__toggler--active'
                }
            });

            this.horMenu = new mMenu('m_header_menu', {
                submenu: {
                    desktop: 'dropdown',
                    tablet: 'accordion',
                    mobile: 'accordion'
                },
                accordion: {
                    slideSpeed: 200, // accordion toggle slide speed in milliseconds
                    expandAll: false // allow having multiple expanded accordions in the menu
                }
            });
        },

        //== Aside menu
        initLeftAsideMenu: function() {
            //== Init aside menu
            var menu = this.get('m_ver_menu');
            var menuDesktopMode = (this.attr(menu, 'm-menu-dropdown') === '1' ? 'dropdown' : 'accordion');

            var scroll;
            if (this.attr(menu, 'm-menu-scrollable') === '1') {
                scroll = {
                    height: function() {
                        if (this.isInResponsiveRange('desktop')) {
                            return this.getViewPort().height - parseInt(this.css('m_header', 'height'));
                        }
                    }
                };
            }

            this.asideMenu = new mMenu('m_ver_menu', {
                // vertical scroll
                scroll: scroll,

                // submenu setup
                submenu: {
                    desktop: {
                        // by default the menu mode set to accordion in desktop mode
                        default: menuDesktopMode,
                        // whenever body has this class switch the menu mode to dropdown
                        state: {
                            body: 'm-aside-left--minimize',
                            mode: 'dropdown'
                        }
                    },
                    tablet: 'accordion', // menu set to accordion in tablet mode
                    mobile: 'accordion' // menu set to accordion in mobile mode
                },

                //accordion setup
                accordion: {
                    autoScroll: false, // enable auto scrolling(focus) to the clicked menu item
                    expandAll: false // allow having multiple expanded accordions in the menu
                }
            });
        },

        //== Aside
        initLeftAside: function() {
            // init aside left offcanvas
            var body = this.get('body');
            var asideLeft = this.get('m_aside_left');
            var asideOffcanvasClass = this.hasClass(asideLeft, 'm-aside-left--offcanvas-default') ? 'm-aside-left--offcanvas-default' : 'm-aside-left';

            this.asideMenuOffcanvas = new mOffcanvas('m_aside_left', {
                baseClass: asideOffcanvasClass,
                overlay: true,
                closeBy: 'm_aside_left_close_btn',
                toggleBy: {
                    target: 'm_aside_left_offcanvas_toggle',
                    state: 'm-brand__toggler--active'
                }
            });

            //== Handle minimzied aside hover
            if (this.hasClass(body, 'm-aside-left--fixed')) {
                var insideTm;
                var outsideTm;

                this.addEvent(asideLeft, 'mouseenter', function() {
                    if (outsideTm) {
                        clearTimeout(outsideTm);
                        outsideTm = null;
                    }

                    insideTm = setTimeout(function() {
                        if (this.hasClass(body, 'm-aside-left--minimize') && this.isInResponsiveRange('desktop')) {
                            this.removeClass(body, 'm-aside-left--minimize');
                            this.addClass(body, 'm-aside-left--minimize-hover');
                            asideMenu.scrollerUpdate();
                            asideMenu.scrollerTop();
                        }
                    }, 300);
                });

                this.addEvent(asideLeft, 'mouseleave', function() {
                    if (insideTm) {
                        clearTimeout(insideTm);
                        insideTm = null;
                    }

                    outsideTm = setTimeout(function() {
                        if (this.hasClass(body, 'm-aside-left--minimize-hover') && this.isInResponsiveRange('desktop')) {
                            this.removeClass(body, 'm-aside-left--minimize-hover');
                            this.addClass(body, 'm-aside-left--minimize');
                            asideMenu.scrollerUpdate();
                            asideMenu.scrollerTop();
                        }
                    }, 500);
                });
            }
        },

        //== Sidebar toggle
        initLeftAsideToggle: function() {
            if ($('#m_aside_left_minimize_toggle').length === 0) {
                return;
            }

            this.asideLeftToggle = new mToggle('m_aside_left_minimize_toggle', {
                target: 'body',
                targetState: 'm-brand--minimize m-aside-left--minimize',
                togglerState: 'm-brand__toggler--active'
            });

            let that = this;

            this.asideLeftToggle.on('toggle', function(toggle) {
                if (this.get('main_portlet')) {
                    mainPortlet.updateSticky();
                }

                that.horMenu.pauseDropdownHover(800);
                that.asideMenu.pauseDropdownHover(800);

                //== Remember state in cookie
                Cookies.set('sidebar_toggle_state', toggle.getState());
                // to set default minimized left aside use this cookie value in your
                // server side code and add "m-brand--minimize m-aside-left--minimize" classes to
                // the body tag in order to initialize the minimized left aside mode during page loading.
            });

            this.asideLeftToggle.on('beforeToggle', function(toggle) {
                var body = this.get('body');
                if (this.hasClass(body, 'm-aside-left--minimize') === false && this.hasClass(body, 'm-aside-left--minimize-hover')) {
                    this.removeClass(body, 'm-aside-left--minimize-hover');
                }
            });
        },

        //== Sidebar hide
        initLeftAsideHide: function() {
            if ($('#m_aside_left_hide_toggle').length === 0 ) {
                return;
            }

            this.initLeftAsideHide = new mToggle('m_aside_left_hide_toggle', {
                target: 'body',
                targetState: 'm-aside-left--hide',
                togglerState: 'm-brand__toggler--active'
            });

            let that = this;

            this.initLeftAsideHide.on('toggle', function(toggle) {
                that.horMenu.pauseDropdownHover(800);
                that.asideMenu.pauseDropdownHover(800);

                //== Remember state in cookie
                Cookies.set('sidebar_hide_state', toggle.getState());
                // to set default minimized left aside use this cookie value in your
                // server side code and add "m-brand--minimize m-aside-left--minimize" classes to
                // the body tag in order to initialize the minimized left aside mode during page loading.
            });
        },

        //== Topbar
        initTopbar: function() {
            $('#m_aside_header_topbar_mobile_toggle').click(function() {
                $('body').toggleClass('m-topbar--on');
            });

            // Animated Notification Icon
            /*
            setInterval(function() {
                $('#m_topbar_notification_icon .m-nav__link-icon').addClass('m-animate-shake');
                $('#m_topbar_notification_icon .m-nav__link-badge').addClass('m-animate-blink');
            }, 3000);

            setInterval(function() {
                $('#m_topbar_notification_icon .m-nav__link-icon').removeClass('m-animate-shake');
                $('#m_topbar_notification_icon .m-nav__link-badge').removeClass('m-animate-blink');
            }, 6000);
            */
        },

        //== Quicksearch
        initQuicksearch: function() {
            if ($('#m_quicksearch').length === 0) {
                return;
            }

            this.quicksearch = new mQuicksearch('m_quicksearch', {
                mode: this.attr('m_quicksearch', 'm-quicksearch-mode'), // quick search type
                minLength: 1
            });

            //<div class="m-search-results m-search-results--skin-light"><span class="m-search-result__message">Something went wrong</div></div>

            this.quicksearch.on('search', function(the) {
                the.showProgress();
                $.ajax({
                    url: 'inc/api/quick_search.php',
                    data: {
                        query: the.query
                    },
                    dataType: 'html',
                    success: function(res) {
                        the.hideProgress();
                        the.showResult(res);
                    },
                    error: function(res) {
                        the.hideProgress();
                        the.showError('Connection error. Pleae try again later.');
                    }
                });
            });
        },

        //== Scrolltop
        initScrollTop: function() {
            let scrollTop = new mScrollTop('m_scroll_top', {
                offset: 300,
                speed: 600
            });
        },

        //== Main portlet(sticky portlet)
        createMainPortlet: function() {
            return new mPortlet('main_portlet', {
                sticky: {
                    offset: parseInt(this.css( this.get('m_header'), 'height')),
                    zIndex: 90,
                    position: {
                        top: function() {
                            return parseInt(this.css( this.get('m_header'), 'height') );
                        },
                        left: function() {
                            var left = parseInt(this.css( this.getByClass('m-content'), 'paddingLeft'));

                            if (this.isInResponsiveRange('desktop')) {
                                //left += parseInt(this.css(this.get('m_aside_left'), 'width') );
                                if (this.hasClass(this.get('body'), 'm-aside-left--minimize')) {
                                    left += 78; // need to use hardcoded width of the minimize aside
                                } else {
                                    left += 255; // need to use hardcoded width of the aside
                                }
                            }

                            return left;
                        },
                        right: function() {
                            return parseInt(this.css( this.getByClass('m-content'), 'paddingRight') );
                        }
                    }
                }
            });
        },
    }
};
