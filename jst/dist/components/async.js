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
var Async = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Async, _super);
        function Async(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            //(Array.isArray(this.props.children) ? Promise.all : Promise.resolve)(this.props.children).then(o => this.setState({value: o  }));
            if (Array.isArray(_this.props.children))
                Promise.all(_this.props.children).then(function (o) { return _this.setState({ value: o }); });
            else //if (Promise.resolve(this.props.children) === this.props.children)
                Promise.resolve(_this.props.children).then(function (o) { return _this.setState({ value: o }); });
            return _this;
        }
        Async.prototype.render = function () {
            return !!this.state.value ? _super.prototype.render.call(this, this.state.value) : null;
        };
        return Async;
    }(app.services.UI.Component));
};
exports.Async = Async;
