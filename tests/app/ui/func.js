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
var Test = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return app.services.UI.processElement(["div", null, this.props.children]);
        };
        return class_1;
    }(app.services.UI.Component));
};
exports.Test = Test;
var Transform = function transform(t, a, c) {
    return ["div", a, c];
};
exports.Transform = Transform;
var Children = function transform(c) {
    return c;
};
exports.Children = Children;
var TransformOwn = function transform(a, c) {
    a = a || {};
    return ["a",
        a,
        [["span", { "area-hidden": "true", "key": 1 }], ["span", { "area-hidden": "true", "key": 2 }]]
    ];
};
exports.TransformOwn = TransformOwn;
