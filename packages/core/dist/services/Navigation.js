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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
//import { INavigation, IAppLoaded, LogLevel, IEventData, IApp, promisedElement, element} from "../types";
var components_1 = require("../components");
var types_1 = __importDefault(require("@appfibre/types"));
function parse(url) {
    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
    var params = {};
    var index = 0;
    if (qs)
        qs[1].split('&').forEach(function (p) {
            var v = p.split('=');
            params[v.length === 2 ? v[0] : index++] = v[v.length - 1];
        });
    return {
        path: qs && qs[1] ? qs[1] : ''
    };
}
function clone(o) {
    if (Array.isArray(o))
        return o.map(function (o) { return clone(o); });
    else if (typeof o === "object") {
        var z = Object.create(o);
        Object.keys(o).forEach(function (k) { return z[k] = o[k]; });
        return z;
    }
    else
        return o;
}
var Navigation = {
    current: parse(typeof location === "object" ? location.href : ''),
    resolve: function transform(container) {
        var url = typeof location === "undefined" ? '' : location.href;
        if (this.controllers && Object.keys(this.controllers).length === 0)
            return this.main;
        for (var c in this.controllers)
            if ((this.controllers[c].container ? this.controllers[c].container : '') == (container || '')) {
                var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
                this.services.logger.log(types_1["default"].LogLevel.Trace, "Route \"" + url + "\" " + (match ? 'matched' : 'did not match') + " controller \"" + c + "\"");
                if (match) {
                    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
                    var params = {};
                    var index = 0;
                    if (qs)
                        qs[1].split('&').forEach(function (p) {
                            var v = p.split('=');
                            params[v.length === 2 ? v[0] : index++] = v[v.length - 1];
                        });
                    return this.controllers[c].resolve.call(this, params);
                }
            }
            else
                this.services.logger.log(types_1["default"].LogLevel.Trace, "Container " + (container || '(blank)') + " does not match controller " + c + "'s container " + (this.controllers[c].container || '(blank)'));
        return ["Error", {}, "Could not locate controller matching " + url];
    },
    a: function inject(app) {
        return /** @class */ (function (_super) {
            __extends(a, _super); //app.services.UI.Component 
            function a() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            a.prototype.click = function (e) {
                app.services.navigation.current = parse(this.props.href);
                var topParent = parent;
                while (topParent.parent !== topParent)
                    topParent = topParent.parent;
                if (topParent.history && topParent.history.pushState)
                    topParent.history.pushState(null, '', this.props.href);
                else
                    topParent.location.replace(this.props.href);
                app.services.events.publish({ type: "Navigation.Redirect", correlationId: this.props.container, data: this.props.href });
                if (e && e.nativeEvent && e.nativeEvent.preventDefault)
                    e.nativeEvent.preventDefault();
                return false;
            };
            a.prototype.render = function () {
                return app.services.UI.processElement(["a", __assign({}, this.props, { onClick: this.click.bind(this) }), this.props.children], 0, undefined);
            };
            return a;
        }(components_1.BaseComponent(app) //app.services.UI.Component 
        ));
    },
    Container: function transform(a, c) {
        var app = this;
        return [/** @class */ (function (_super) {
                __extends(NavigationContainer, _super);
                function NavigationContainer(props, context) {
                    var _this = _super.call(this, props, context) || this;
                    _this.state = { a: props.a, c: props.c };
                    _this.onRedirect = _this.onRedirect.bind(_this);
                    return _this;
                }
                NavigationContainer.prototype.onRedirect = function (event) {
                    var e = clone(this.props.c);
                    if (Array.isArray(e))
                        e.forEach(function (c, i) { if (Array.isArray(c))
                            c[1].key = Date.now() + i; });
                    this.setState({ c: e });
                };
                NavigationContainer.prototype.componentWillMount = function () {
                    app.services.events.subscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                };
                NavigationContainer.prototype.componentWillUnmount = function () {
                    app.services.events.unsubscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                };
                NavigationContainer.prototype.render = function () {
                    return _super.prototype.render.call(this, this.state.c);
                };
                return NavigationContainer;
            }(components_1.BaseComponent(app))), { a: a, c: c }];
    }
};
exports.Navigation = Navigation;
