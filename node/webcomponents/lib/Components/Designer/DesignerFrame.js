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
import { Intercept } from "./Intercept";
import { events } from "./types";
var DesignerFrame /*: fibre.UI.Component<any,any>*/ = function inject(app) {
    if (app.services.transformer.settings.parsers)
        app.services.transformer.settings.parsers[".app"] = function (obj, parseSettings, offset) {
            var obj2 = {};
            var keys = Object.keys(obj);
            keys.forEach(function (z) { return obj2[z == ".app" ? "main" : z] = obj[z]; });
            return "[\".App\", {" + app.services.transformer._process(obj2, true, true, parseSettings, offset) + "}]";
        };
    app.services.processor.init = function (obj) { return typeof obj.__esModule === "string" ? [Intercept, { file: obj.__esModule }, [obj["default"]]] : obj["default"]; };
    return /** @class */ (function (_super) {
        __extends(Designer, _super);
        function Designer(props) {
            var _this = _super.call(this, props) || this;
            _this.props = props;
            _this.state = { content: app.main };
            _this.designer_Load = _this.designer_Load.bind(_this);
            return _this;
        }
        Designer.prototype.componentWillMount = function () {
            app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
        };
        Designer.prototype.componentWillUnmount = function () {
            app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
        };
        Designer.prototype.designer_Load = function (ev) {
            var _this = this;
            app.services.moduleSystem["import"](ev.data.url).then(function (x) {
                _this.setState({ content: x });
            }, alert);
        };
        Designer.prototype.render = function () {
            return _super.prototype.render.call(this, this.state.content);
        };
        return Designer;
    }(app.services.UI.Component));
};
export { DesignerFrame };
