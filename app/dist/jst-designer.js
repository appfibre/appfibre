(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Designer = {}));
}(this, function (exports) { 'use strict';

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Designer = function inject(app) {
        return /** @class */ (function (_super) {
            debugger;
            __extends(Designer, _super);
            function Designer(props) {
                var _this = _super.call(this, props) || this;
                _this.state = {};
                return _this;
            }
            Designer.prototype.render = function () {
                return _super.prototype.render.call(this, "DESIGNER");
            };
            return Designer;
        }(app.services.UI.Component));
    };

    exports.Designer = Designer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
