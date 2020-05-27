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
exports.Intercept = void 0;
var types_1 = require("./types");
var Styles_1 = require("./Styles");
var Intercept = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Intercept, _super);
        function Intercept(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { focus: false, selected: false, editing: false, editMode: null, canEdit: true };
            //this.onMessage = this.onMessage.bind(this);
            _this.click = _this.click.bind(_this);
            _this.doubleclick = _this.doubleclick.bind(_this);
            _this.mouseEnter = _this.mouseEnter.bind(_this);
            _this.mouseLeave = _this.mouseLeave.bind(_this);
            _this.designer_select = _this.designer_select.bind(_this);
            _this.edit_event = _this.edit_event.bind(_this);
            return _this;
        }
        Intercept.prototype.componentDidMount = function () {
            //window.addEventListener("message", this.onMessage);
            app.services.events.subscribe(types_1.events["Designer.Select"](), this.designer_select);
            app.services.events.subscribe(types_1.events["Edit.Event"](), this.edit_event);
            var topParent = window.parent;
            while (topParent.parent != null && topParent.parent !== topParent)
                topParent = topParent.parent;
            app.services.events.publish(types_1.events["Intercept.Mounted"]({ file: this.props.file }), topParent);
        };
        Intercept.prototype.componentWillUnmount = function () {
            //window.removeEventListener("message", this.onMessage);
            app.services.events.unsubscribe(types_1.events["Designer.Select"](), this.designer_select);
            app.services.events.unsubscribe(types_1.events["Edit.Event"](), this.edit_event);
        };
        Intercept.prototype.edit_event = function (ev) {
            var editing = this.props.file ? ev.data.activeFiles.indexOf(this.props.file) > -1 : false;
            if (this.state.editing != editing)
                this.setState({ editing: editing });
        };
        Intercept.prototype.designer_select = function (ev) {
            if (this.state.selected != (this.props.file == ev.correlationId))
                this.setState({ selected: !this.state.selected });
        };
        Intercept.prototype.reconstruct = function (obj) {
            if (!obj[1])
                obj[1] = {};
            obj[1].className = (obj[1].className ? obj[1].className + ' ' : '') + Styles_1.classes.Intercept + (this.state.focus && !this.state.selected && !this.state.editing ? ' ' + Styles_1.classes.Intercept_Focus : '') + (this.state.selected ? ' ' + Styles_1.classes.Intercept_Selected : '') + (this.state.editing ? ' ' + Styles_1.classes.Intercept_Editing : '');
            if (!obj[1].style)
                obj[1].style = {};
            if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
                //obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
                //if (this.state.editing) obj[1].style.background = "#98CCFD";
                //if (this.state.selected || this.state.editing || this.state.focus)
                //    obj[1].style.border = `1px ${this.state.selected&&this.state.editing?"solid":"dashed"} ${this.state.editing ? "blue" : "grey"}`;
                //else
                //    obj[1].style.padding = '1px';
                /*if (this.state.selected) obj[1].style.border = "1px solid " + (this.state.editing ? "blue" : "grey");
                else if (this.state.focus) obj[1].style.border = "1px dashed grey";
                )*/
                obj[1].onMouseEnter = this.mouseEnter;
                obj[1].onMouseLeave = this.mouseLeave;
                obj[1].onClick = this.click;
                obj[1].onDoubleClick = this.doubleclick;
            }
            return obj;
        };
        Intercept.prototype.render = function () {
            //return super.render(Array.isArray(this.props.children) ? this.reconstruct(["div", {style: {display: "inline-block"}}, this.props.children])  : this.reconstruct(this.props.children));
            return _super.prototype.render.call(this, this.reconstruct(["div", { style: { display: "" }, key: 0 }, this.props.children]));
        };
        Intercept.prototype.mouseEnter = function () {
            //x.Designer.notify("x");
            this.setState({ "focus": true });
        };
        Intercept.prototype.mouseLeave = function () {
            //x.Designer.notify("y");
            this.setState({ "focus": false });
        };
        Intercept.prototype.doubleclick = function (ev) {
            app.services.events.publish({ type: "Designer.Ribbon.ToggleEdit", correlationId: Date.now().toString(), data: {} }, parent);
        };
        Intercept.prototype.click = function (ev) {
            ev.stopPropagation();
            //ev.stopImmediatePropagation();
            //Designer.notify(this.props.file);
            var parent = window;
            while (parent.parent !== parent && window.parent != null)
                parent = parent.parent;
            //parent.postMessage({eventType: "select", editMode: this.state.editMode, canEdit: this.state.canEdit, correlationId, control: {file:this.props.file, method:this.props.method}}, location.href);
            if (this.props.file) {
                app.services.events.publish({ type: "Designer.Intercept.Select", correlationId: this.props.file, data: { editMode: this.state.editMode, canEdit: this.state.canEdit, control: { url: this.props.file } } }, parent);
                //let file = this.props.file;
                //this.setState( {selectedCorrelationId: file}
                //             , () => app.services.events.publish<Designer_Select>({type: "Designer.Intercept.Select", correlationId: file, data: {editMode: this.state.editMode, canEdit: this.state.canEdit, control: {url:file}}}, parent));
            }
        };
        return Intercept;
    }(app.services.UI.Component));
};
exports.Intercept = Intercept;
