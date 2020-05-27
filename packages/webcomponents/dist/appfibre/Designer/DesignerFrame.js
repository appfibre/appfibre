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
exports.DesignerFrame = void 0;
var Intercept_1 = require("./Intercept");
var types_1 = require("./types");
var DesignerFrame /*: fibre.UI.Component<any,any>*/ = function inject(app) {
    if (app.services.transformer.settings.parsers)
        app.services.transformer.settings.parsers[".app"] = function (obj, transformer, tc, context) {
            var obj2 = {};
            var keys = Object.keys(obj);
            keys.forEach(function (z) { return obj2[z == ".app" ? "main" : z] = obj[z]; });
            return { "format": "json", output: "[\".App\", {" + app.services.transformer.process(obj2, tc, context).output + "}]" };
        };
    app.services.processor.unwrapDefault = function (obj) {
        if (typeof obj === "object" && typeof obj.__esModule === "string")
            return app.services.processor.processElement([Intercept_1.Intercept, { file: obj.__esModule }, typeof obj["default"] === "string" ? obj["default"] : [obj["default"]]]);
        if (obj && obj["default"])
            obj = obj["default"];
        if (Array.isArray(obj)) {
            /*if (typeof obj[0] === "object" && typeof obj[0].__esModule === "string" && obj[0].default) {
                let __esModule = obj[0].__esModule;
                obj[0] = obj[0].default;
                return app.services.processor.processElement([Intercept, {file: __esModule}, [obj]]);
            }*/
            if (typeof obj[2] === "object" && typeof obj[2].__esModule === "string" && obj[2]["default"]) {
                obj[2] = [[Intercept_1.Intercept, { file: obj[2].__esModule }, obj[2]["default"]]];
            }
            return obj.map(function (e) { return e && e["default"] ? e["default"] : e; });
        }
        return obj;
    };
    return /** @class */ (function (_super) {
        __extends(Designer, _super);
        function Designer(props) {
            var _this = _super.call(this, props) || this;
            _this.props = props;
            _this.state = { content: app.main };
            _this.designer_Load = _this.designer_Load.bind(_this);
            _this.window_click = _this.window_click.bind(_this);
            return _this;
        }
        Designer.prototype.componentWillMount = function () {
            window.addEventListener("click", this.window_click);
            app.services.events.subscribe(types_1.events["Designer.Load"](), this.designer_Load);
            //document.body.onclick = function () {debugger;};
        };
        Designer.prototype.window_click = function (ev) {
            app.services.events.publish({ type: "Designer.Intercept.Select", correlationId: Date.now().toString(), data: { editMode: false, canEdit: false } }, parent);
            //parent.postMessage({eventType: "select", correlationId: Date.now().toString()}, location.href); ev.returnValue = false; 
        };
        Designer.prototype.componentWillUnmount = function () {
            app.services.events.unsubscribe(types_1.events["Designer.Load"](), this.designer_Load);
            window.removeEventListener("click", this.window_click);
        };
        Designer.prototype.designer_Load = function (ev) {
            var _this = this;
            if (ev.data) {
                if (ev.data.url > '')
                    app.services.moduleSystem["import"](ev.data.url).then(function (x) {
                        _this.setState({ content: x });
                    }, function (z) { return alert(z); });
                else
                    this.setState({ content: app.main });
            }
        };
        Designer.prototype.render = function () {
            return _super.prototype.render.call(this, this.state.content);
        };
        return Designer;
    }(app.services.UI.Component));
};
exports.DesignerFrame = DesignerFrame;
