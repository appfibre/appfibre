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
exports.BaseComponent = void 0;
var seed = '0123456789abcdefgihjlmnopqrstuvwxyzABCDEFGIHJKLMNOPQRSTUVWXYZ';
var BaseComponent = function inject(app) {
    function generateId() {
        var n = 8;
        var id = '';
        while (0 < n--) {
            id += seed[Math.random() * 61 | 0];
        }
        return id;
    }
    return /** @class */ (function (_super) {
        __extends(BaseComponent, _super); /*implements types.Component<P,S>*/
        //state:S
        function BaseComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            if (!props)
                throw new Error("Expected properties object from parent constructor.  Please ensure that you are passing props to super() call");
            _this.key = props["_key"] || ('bc_' + generateId());
            _this.props = props;
            return _this;
        }
        BaseComponent.prototype.renderInternal = function (e, index) {
            var _this = this;
            if (Array.isArray(e)) {
                if (typeof e[0] === "object" && e[0]["default"] && (typeof e[0]["default"] === "string" || typeof e[0]["default"] === "function" || Promise.resolve(e[0]["default"]) === e[0]["default"]))
                    return app.services.processor.processElement(e, this.key, index);
                else if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, this.key, index);
                else {
                    return e.map(function (c, idx) { if (Array.isArray(c)) {
                        if (!c[1])
                            c[1] = {};
                        c[1]["key"] = c[1]["key"] || idx;
                    } return _this.renderInternal(c, idx); });
                }
            }
            return !e || typeof e === "string" ? e : app.services.processor.processElement(e, this.key, index);
        };
        BaseComponent.prototype.render = function (props /*, state?: Readonly<S>, context?: any*/) {
            return this.renderInternal(props || this.props.children);
        };
        return BaseComponent;
    }(app.services.UI.Component));
};
exports.BaseComponent = BaseComponent;
{ }
