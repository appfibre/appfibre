"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
exports.__esModule = true;
var types_1 = require("../types");
var Navigation = {
    resolve: function transform(container) {
        var url = typeof location === "undefined" ? '' : location.href;
        if (this.controllers && Object.keys(this.controllers).length === 0)
            return this.main;
        for (var c in this.controllers)
            if (this.controllers[c].container ? this.controllers[c].container : '' == (container || '')) {
                var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
                this.services.logger.log(types_1.LogLevel.Trace, "Route \"" + url + "\" " + (match ? 'matched' : 'did not match') + " controller \"" + c + "\"");
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
                this.services.logger.log(types_1.LogLevel.Trace, "Container " + (container || '(blank)') + " does not match controller " + c + "'s container " + (this.controllers[c].container || '(blank)'));
        return ["Error", {}, "Could not locate controller matching " + url];
    },
    a: function inject(app) {
        return /** @class */ (function (_super) {
            __extends(a, _super);
            function a() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            a.prototype.click = function () {
                app.services.events.publish({ type: "Navigation.Redirect", correlationId: this.props.container, data: this.props.href });
                if (event)
                    event.preventDefault();
            };
            a.prototype.render = function () {
                return app.services.UI.processElement(["a", __assign({}, this.props, { onClick: this.click.bind(this) }), this.props.children], 0, undefined);
            };
            return a;
        }(app.services.UI.Component));
    },
    Container: function inject(app) {
        return /** @class */ (function (_super) {
            __extends(Container, _super);
            function Container(props) {
                var _this = _super.call(this) || this;
                _this.state = {};
                _this.renderInternal = _this.renderInternal.bind(_this);
                _this.resolve = _this.resolve.bind(_this);
                app.services.events.subscribe({ type: "Navigation.Redirect", correlationId: props ? props.container : undefined }, _this.onRedirect.bind(_this));
                return _this;
            }
            Container.prototype.onRedirect = function (event) {
                if (history && history.pushState)
                    history.pushState(null, '', event.data);
                else
                    location.replace(event.data);
                return this.resolve(event.correlationId);
            };
            Container.prototype.resolve = function (correlationId) {
                var result = app.services.navigation.resolve.call(app, correlationId);
                if (result.then)
                    result.then(this.renderInternal);
                else
                    this.renderInternal(result);
                return result != null;
            };
            Container.prototype._extend = function (obj, props) {
                if (obj == undefined)
                    obj = {};
                for (var i in props)
                    if (obj[i] !== props[i])
                        obj[i] = typeof obj[i] == "object" && typeof props[i] == "object" ? this._extend(obj[i], props[i]) : obj[i] || props[i];
                return obj;
            };
            Container.prototype.renderInternal = function (obj) {
                var _this = this;
                if (Array.isArray(obj) && obj[1])
                    try {
                        obj[1] = this._extend(obj[1], this.props);
                    }
                    catch (e) {
                        app.services.logger.log(types_1.LogLevel.Warn, "Could not copy navigation properties: " + e.message, [e]);
                    }
                app.services.processor.process(obj).then(function (o) { return _this.setState({ data: o }); });
            };
            Container.prototype.componentDidMount = function () {
                this.resolve(this.props.container);
            };
            Container.prototype.render = function () {
                if (this.state.data) {
                    return app.services.UI.processElement(this.state.data, 1);
                }
                else if (this.props.container) {
                    return "";
                }
            };
            return Container;
        }(app.services.UI.Component));
    }
};
exports.Navigation = Navigation;
