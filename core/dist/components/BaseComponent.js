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
var BaseComponent = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent(props) {
            var _this = _super.call(this, app) || this;
            _this.props = props;
            return _this;
        }
        BaseComponent.prototype.renderInternal = function (e, index) {
            var _this = this;
            //if (e) e = types.services.intercept(e);
            if (Array.isArray(e)) {
                //if (Promise.resolve(e[0]) === e[0]) debugger;
                /*if (e[1] == null) e[1] = {};
                if (typeof e[1] === "object") e[1].context = this.context;*/
                if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, index);
                else {
                    return e.map(function (c, idx) { if (Array.isArray(c)) {
                        if (!c[1])
                            c[1] = {};
                        c[1]["key"] = c[1]["key"] || idx;
                    } return _this.renderInternal(c, idx); });
                }
            } //else if (typeof e !== "string")
            //debugger;
            //if (!e) debugger;
            return !e || typeof e === "string" ? e : app.services.processor.processElement(e, index);
        };
        BaseComponent.prototype.render = function (e) {
            return this.renderInternal(e || this.props.children);
        };
        return BaseComponent;
    }(app.services.UI.Component));
};
exports.BaseComponent = BaseComponent;
