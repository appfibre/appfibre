"use strict";
exports.__esModule = true;
var Component = /** @class */ (function () {
    function Component(props, context) {
        this.props = props;
        this.context = context;
    }
    Component.prototype.setState = function (fn, callback) {
        var _this = this;
        if (typeof fn === "object") {
            Object.keys(fn).map(function (x) { return _this.state[x] = fn[x]; });
        }
        else
            debugger;
        if (callback)
            callback();
    };
    Component.prototype.forceUpdate = function (callback) {
        debugger;
    };
    Component.prototype.render = function (props, state, context) {
        debugger;
    };
    return Component;
}());
exports.Component = Component;
