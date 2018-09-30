webpackJsonp([5],{

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(255)
}
var normalizeComponent = __webpack_require__(15)
/* script */
var __vue_script__ = __webpack_require__(257)
/* template */
var __vue_template__ = __webpack_require__(260)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8cf69586"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/sections/LoginLayout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8cf69586", Component.options)
  } else {
    hotAPI.reload("data-v-8cf69586", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(256);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("0178e59c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8cf69586\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LoginLayout.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8cf69586\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LoginLayout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Api__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: "LoginLayout",
    data: function data() {
        return {
            brand: __WEBPACK_IMPORTED_MODULE_0__services_Api__["a" /* API */].APP_NAME,
            logo: __webpack_require__(258),
            bg: __webpack_require__(259)
        };
    }
});

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

module.exports = "/images/logo-2.png?2a5aacb08ca2b53000cce3132109490c";

/***/ }),

/***/ 259:
/***/ (function(module, exports) {

module.exports = "/images/bg-3.jpg?6ecf79dbb9a59248510d64773993254e";

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "m-login m-login--signin  m-login--5",
      style: "background-image: url(" + _vm.bg + ");",
      attrs: { id: "m_login" }
    },
    [
      _c("div", { staticClass: "m-login__wrapper-1 m-portlet-full-height" }, [
        _c("div", { staticClass: "m-login__wrapper-1-1" }, [
          _c("div", { staticClass: "m-login__contanier" }, [
            _c("div", { staticClass: "m-login__content" }, [
              _c("div", { staticClass: "m-login__logo" }, [
                _c("a", { attrs: { href: "#" } }, [
                  _c("img", { attrs: { src: _vm.logo } })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "m-login__title" }, [
                _c("h3", [_vm._v(_vm._s(_vm.brand))])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "m-login__desc" }, [
                _vm._v(
                  "\n                        Amazing Stuff is Lorem Here.Grownng Team\n                    "
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _vm._m(0)
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "m-login__wrapper-2 m-portlet-full-height" }, [
        _c("div", { staticClass: "m-login__contanier" }, [
          _c(
            "div",
            { staticClass: "m-login__signin" },
            [
              _vm._m(1),
              _vm._v(" "),
              _c("login", { attrs: { action: "/login" } })
            ],
            1
          ),
          _vm._v(" "),
          _vm._m(2)
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "m-login__border" }, [_c("div")])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "m-login__head" }, [
      _c("h3", { staticClass: "m-login__title" }, [
        _vm._v("Login To Your Account")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "m-login__forget-password" }, [
      _c("div", { staticClass: "m-login__head" }, [
        _c("h3", { staticClass: "m-login__title" }, [
          _vm._v("Forgotten Password ?")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "m-login__desc" }, [
          _vm._v("Enter your email to reset your password:")
        ])
      ]),
      _vm._v(" "),
      _c(
        "form",
        { staticClass: "m-login__form m-form", attrs: { action: "" } },
        [
          _c("div", { staticClass: "form-group m-form__group" }, [
            _c("input", {
              staticClass: "form-control m-input",
              attrs: {
                type: "text",
                placeholder: "Email",
                name: "email",
                id: "m_email",
                autocomplete: "off"
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "m-login__form-action" }, [
            _c(
              "button",
              {
                staticClass:
                  "btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air",
                attrs: { id: "m_login_forget_password_submit" }
              },
              [_vm._v("Request")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass:
                  "btn btn-outline-focus m-btn m-btn--pill m-btn--custom ",
                attrs: { id: "m_login_forget_password_cancel" }
              },
              [_vm._v("Cancel")]
            )
          ])
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8cf69586", module.exports)
  }
}

/***/ })

});