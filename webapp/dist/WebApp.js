"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var core_1 = require("@appfibre/core");
var WebUI_1 = require("./services/WebUI");
var types = __importStar(require("./types"));
var WebApp = /** @class */ (function (_super) {
    __extends(WebApp, _super);
    //info: fibre.IInfo
    function WebApp(app, context) {
        if (app === void 0) { app = { main: [] }; }
        var _this = this;
        var t = __assign({}, app, { info: __assign({ browser: types.browserType.Unknown }, app.info), services: __assign({ UI: app.services && app.services.UI || WebUI_1.WebUI }, app.services), options: app.options || {}, controllers: __assign({}, app.controllers), components: __assign({}, app.components) });
        _this = _super.call(this, t) || this;
        return _this;
    }
    WebApp.prototype.initApp = function () {
        if (typeof document === "object") { // web app
            var w = window;
            var g = global;
            var d = document;
            var bt = types.browserType.Unknown;
            if (w && g && d) {
                if (g.InstallTrigger !== undefined)
                    this.info.browser = types.browserType.FireFox;
                else if ( /*@cc_on!@*/false || !!d.documentMode)
                    bt = types.browserType.IE;
                else if (!!w.StyleMedia)
                    bt = types.browserType.Edge;
                else if (/constructor/i.test(w.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!w['safari'] || (typeof g.safari !== 'undefined' && g.safari.pushNotification)))
                    bt = types.browserType.Safari;
                else if (!!w.chrome && (!!w.chrome.webstore || !!w.chrome.runtime))
                    bt = types.browserType.Chrome;
                else if ((Object.getOwnPropertyDescriptor(window, "opr") && Object.getOwnPropertyDescriptor(window, "addons")) || Object.getOwnPropertyDescriptor(window, "opera") || navigator.userAgent.indexOf(' OPR/') >= 0)
                    bt = types.browserType.Opera;
                if ((bt === types.browserType.Chrome || bt === types.browserType.Opera) && !!w.CSS)
                    bt = types.browserType.Blink;
            }
            this.info.browser = bt;
            if (!this.options.baseExecutionPath && document.head)
                this.options.baseExecutionPath = document.head.baseURI;
        }
        _super.prototype.initApp.call(this);
    };
    WebApp.prototype.run = function () {
        var _this = this;
        this.services.logger.log.call(this, types.LogLevel.Trace, 'App.run');
        this.initApp();
        var main = null;
        return new Promise(function (resolve, reject) {
            try {
                _this.initApp();
                main = _this.services.navigation.resolve.apply(_this);
            }
            catch (e) {
                _this.services.logger.log.call(_this, types.LogLevel.Error, e);
                reject(e);
            }
            _this.render(main).then(resolve, function (err) { _this.services.logger.log.call(_this, types.LogLevel.Error, err.message, err.stack); reject(err); _this.render(["pre", {}, err.stack]); });
        });
    };
    WebApp.prototype.render = function (ui) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.services.logger.log.call(_this, types.LogLevel.Trace, 'App.render', [{ ui: ui }]);
            _this.services.processor.process(ui).then(function (value) {
                try {
                    var target = null;
                    if (typeof document === "object") { // web app
                        if (typeof _this.options.target === "string")
                            target = document.getElementById(_this.options.target);
                        else if (_this.options.target && _this.options.target.tagName === "IFRAME") {
                            var fr = _this.options.target;
                            if (fr.contentDocument)
                                target = !fr.contentDocument.body ? fr.contentDocument.createElement('BODY') : fr.contentDocument.body;
                        }
                        else if (!document.body)
                            document.body = document.createElement('BODY');
                        else
                            target = document.body;
                        if (target && target.tagName === "BODY") {
                            var body_1 = target;
                            var doc = (body_1.ownerDocument ? body_1.ownerDocument : document.body);
                            target = doc.getElementById("main") || function () {
                                var d = body_1.appendChild((body_1.ownerDocument ? body_1.ownerDocument : document.body).createElement("div"));
                                if (this.options && this.options.fullHeight) {
                                    body_1.style.height = body_1.style.height || "100%";
                                    d.style.height = "100%";
                                }
                                return d;
                            }.apply(_this);
                            if (target && !target.id)
                                target.setAttribute("id", "main");
                        }
                        else if (_this.options.target !== null)
                            throw new Error("Cannot locate target (" + (_this.options.target ? 'not specified' : _this.options.target) + ") in html document body.");
                        if (_this.options.title)
                            document.title = _this.options.title;
                        //if (module && module.hot) module.hot.accept();
                        if (target && target.hasChildNodes())
                            target.innerHTML = "";
                    }
                    //throw new Error("Document node undefined.  Are you running WebApp in the context of a browser?");
                    resolve(_this.services.UI.render(value, target ? target : undefined));
                }
                catch (e) {
                    reject(e);
                }
            }, function (r) { return reject(r); });
        });
    };
    return WebApp;
}(core_1.App));
exports.WebApp = WebApp;
