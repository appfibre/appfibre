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
import Style from "./Style";
var Container /*: fibre.UI.Component*/ = function inject(app) {
    Style(['.Layout_Container { display: table; } ',
        '.Layout_Container > div { display: table-cell; background: blue }'
    ]);
    return /** @class */ (function (_super) {
        __extends(Container, _super);
        function Container(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            _this.props = props;
            return _this;
        }
        Container.prototype.render = function () {
            return _super.prototype.render.call(this, [["div", { style: this.props.style, className: 'Layout_Container' + (this.props.className ? ' ' + this.props.className : '') }, this.props.children]]);
        };
        return Container;
    }(app.services.UI.Component));
};
export { Container };
