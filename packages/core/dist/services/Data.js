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
exports.__esModule = true;
var components_1 = require("../components");
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
var SM = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Bind, _super);
        function Bind(props, context) {
            var _this = _super.call(this, props, context) || this;
            var s = {};
            _this.state = { loaded: typeof props.data !== "string", data: clone(props.data), subscribers: s };
            if (typeof props.data === "string")
                app.services.moduleSystem["import"](props.data).then(function (x) { return _this.setState({ data: clone(x) }, function () { _this.visit.call(_this, props.childArray, s); _this.setState({ loaded: true }); }); });
            else
                _this.visit.call(_this, props.childArray, s);
            _this.render = _this.render.bind(_this);
            return _this;
        }
        Bind.prototype.setValue = function (path, value) {
            this.state.subscribers[path].forEach(function (s) { if (s.value != value)
                s.value = value; });
            this.setState({ data: (new Function('data', 'path', 'value', 'data' + (path[0] === '[' ? '' : '.') + path + ' = value; return data;'))(this.state.data, path, value) });
        };
        Bind.prototype.getValue = function (path) {
            return (new Function('data', 'path', 'return data' + (path[0] === '[' ? '' : '.') + path))(this.state.data, path);
        };
        Bind.prototype.subscribe = function (a, s) {
            var _this = this;
            var path = a["bind"];
            a.onChange = function (v) { return _this.setValue.call(_this, path, v.target.value); };
            a.value = this.getValue.call(this, path);
            if (s[path] === undefined)
                s[path] = [];
            s[path].push(a);
        };
        Bind.prototype.visit = function (obj, s) {
            var _this = this;
            if (Array.isArray(obj)) {
                obj.forEach(function (e) {
                    if (Array.isArray(e) && e[0] != "Data.bind") {
                        if (e[1] && typeof e[1] === "object" && e[1]["bind"])
                            _this.subscribe(e[1], s);
                        if (e[2] && Array.isArray(e[2]))
                            _this.visit(e[2], s);
                    }
                });
            }
        };
        //render(e:types.app.promisedElement) {
        Bind.prototype.render = function (props /*, state?: Readonly<S>, context?: any*/) {
            return this.state.loaded ? _super.prototype.render.call(this, !!props ? props : this.props.childArray) : null;
        };
        return Bind;
    }(components_1.BaseComponent(app)));
};
var Data = {
    bind: function transform(a, c) {
        return [SM, { data: a, childArray: c }];
        //return ["div", a, c];
    },
    format: function transform(str) {
        var s = str.toString() || "";
        return s;
    }
};
exports.Data = Data;
