"use strict";
exports.__esModule = true;
var types_1 = require("./types");
//import { Intercept } from "./intercept";
var loader_1 = require("./services/loader");
var transformer_1 = require("./services/transformer");
var processor_1 = require("./services/processor");
var webui_1 = require("./services/webui");
var navigation_1 = require("./services/navigation");
var App = /** @class */ (function () {
    function App(app) {
        if (app === void 0) { app = { main: [] }; }
        var _this = this;
        try {
            Object.keys(app).forEach(function (k) { var d = Object.getOwnPropertyDescriptor(app, k); if (d)
                Object.defineProperty(_this, k, d); });
            this.main = app.main;
            this.options = app.options || {};
            this.options.logLevel = this.options.logLevel || types_1.LogLevel.Error;
            var logger_1 = app.services && app.services.logger ? (typeof app.services.logger === "object" ? app.services.logger : new app.services.logger(this)) : null;
            var s = app.services || {};
            s.logger = { log: function (logLevel, title, optionalParameters) {
                    if (logLevel <= (_this && _this.options && _this.options.logLevel ? (types_1.LogLevel[_this.options.logLevel] || 2) : 2))
                        logger_1 ? logger_1.log.bind(_this, logLevel, title, optionalParameters) : [function (title, optionalParameters) { }, console.error, console.error, console.warn, console.info, console.info][logLevel](title + '\r\n', optionalParameters || [_this]);
                } };
            s.transformer = s.transformer ? (typeof s.transformer === "object" ? s.transformer : new s.transformer(this)) : new transformer_1.Transformer({ module: types_1.ModuleSystem.None });
            s.moduleSystem = s.moduleSystem ? (typeof s.moduleSystem === "object" ? s.moduleSystem : new s.moduleSystem(this)) : new loader_1.Loader(this.options.basePath);
            s.navigation = s.navigation ? (typeof s.navigation === "object" ? s.navigation : new s.navigation(this)) : navigation_1.Navigation;
            s.UI = s.UI ? (typeof s.UI === "object" ? s.UI : new s.UI(this)) : new webui_1.WebUI(this);
            this.services = { moduleSystem: s.moduleSystem, processor: new processor_1.Processor(this), transformer: s.transformer, logger: s.logger, UI: s.UI, navigation: s.navigation };
            this.controllers = {};
            if (app.controllers)
                for (var c in app.controllers) {
                    var co = app.controllers[c];
                    this.controllers[c] = typeof co === "object" ? co : new (co)(this);
                }
            this.components = app.components;
            if (typeof this.components === "object" && !this.components["Navigation"])
                this.components["Navigation"] = navigation_1.Navigation;
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
    App.prototype.initApp = function () {
        if (!this.options.web)
            this.options.web = {};
        try {
            if (document) { // web app
                if (!document.body)
                    document.body = document.createElement('body');
                this.options.web.target = this.options.web.target || document.body;
                if (this.options.web.target === document.body) {
                    this.options.web.target = document.getElementById("main") || document.body.appendChild(document.createElement("div"));
                    if (!this.options.web.target.id)
                        this.options.web.target.setAttribute("id", "main");
                }
                else if (typeof this.options.web.target === "string")
                    this.options.web.target = document.getElementById(this.options.web.target);
                if (this.options.web.target == null)
                    throw new Error("Cannot locate target (" + (this.options.web.target ? 'not specified' : this.options.web.target) + ") in html document body.");
                if (this.options.title)
                    document.title = this.options.title;
                //if (module && module.hot) module.hot.accept();
                if (this.options.web.target.hasChildNodes())
                    this.options.web.target.innerHTML = "";
            }
        }
        catch (_a) {
            //TODO: workaround for nodeJs as document element is not defined in Node runtime
        }
    };
    App.prototype.run = function () {
        var _this = this;
        this.services.logger.log.call(this, types_1.LogLevel.Trace, 'App.run');
        var main = null;
        return new Promise(function (resolve, reject) {
            try {
                _this.initApp();
                main = _this.services.navigation.resolve.apply(_this);
            }
            catch (e) {
                _this.services.logger.log.call(_this, types_1.LogLevel.Error, e);
                reject(e);
            }
            _this.render(main).then(resolve, function (err) { _this.services.logger.log.call(_this, types_1.LogLevel.Error, err.message, err.stack); reject(err); _this.render(["pre", {}, err.stack]); });
        });
    };
    App.prototype.render = function (ui) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.services.logger.log.call(_this, types_1.LogLevel.Trace, 'App.render', [{ ui: ui }]);
            _this.services.processor.process(ui).then(function (value) {
                try {
                    resolve(_this.services.UI.render(value, _this.options.web && _this.options.web.target ? _this.options.web.target : undefined));
                }
                catch (e) {
                    reject(e);
                }
            }, function (r) { return reject(r); });
        });
    };
    return App;
}());
exports.App = App;
