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
exports.__esModule = true;
var SM = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Bind, _super);
        function Bind(props) {
            var _this = _super.call(this) || this;
            _this.state = { data: props.data };
            var s = {};
            _this.visit.call(_this, props.children, s);
            _this.state.subscribers = s;
            app.services.processor.parse(["div", null, props.children], 0, '').then(function (o) {
                _this.setState({ children: o.props.children });
            });
            return _this;
        }
        Bind.prototype.setValue = function (path, value) {
            var _this = this;
            this.state.subscribers[path].forEach(function (s) { if (s.value != value)
                s.value = value; });
            app.services.processor.parse(["div", null, this.props.children], 0, '').then(function (o) {
                _this.setState({ children: o.props.children, data: (new Function('data', 'path', 'value', 'data' + (path[0] === '[' ? '' : '.') + path + ' = value; return data;'))(_this.state.data, path, value) });
            });
        };
        Bind.prototype.getValue = function (path, obj) {
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
            delete a.bind;
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
        Bind.prototype.render = function () {
            return this.state.children ? this.state.children : "Loading Data";
        };
        return Bind;
    }(app.services.UI.Component));
};
var Data = {
    bind: function transform(a, c) {
        return [SM, { data: a, children: c }];
        //return ["div", a, c];
    },
    format: function transform(str) {
        var s = str.toString() || "";
        return s;
    }
};
exports.Data = Data;
