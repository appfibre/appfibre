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
import Style from './Style';
var Panel /*: fibre.UI.Component*/ = function inject(app) {
    Style(['.Layout_Panel { color: red } ']);
    return /** @class */ (function (_super) {
        __extends(Panel, _super);
        function Panel(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            _this.props = props;
            return _this;
        }
        Panel.prototype.render = function () {
            return _super.prototype.render.call(this, [["div", { className: 'Layout_Panel' }, "Panel"]]);
        };
        return Panel;
    }(app.services.UI.Component));
};
export { Panel };
