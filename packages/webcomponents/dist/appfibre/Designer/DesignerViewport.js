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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DesignerViewPort = void 0;
var types_1 = require("@appfibre/types");
var types_2 = require("./types");
var Styles_1 = __importDefault(require("../Layout/Styles"));
var Styles_2 = require("./Styles");
var Layout_1 = require("../Layout");
var codemirror_1 = __importDefault(require("../../codemirror"));
var DesignerViewPort /*: fibre.UI.Component<any,any>*/ = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(DesignerViewPort, _super);
        function DesignerViewPort(props) {
            var _this = _super.call(this, props) || this;
            _this.props = props;
            _this.state = { sources: {} };
            _this.ribbon_event = _this.ribbon_event.bind(_this);
            _this.designer_relay = _this.designer_relay.bind(_this);
            _this.onRedirect = _this.onRedirect.bind(_this);
            _this.edit_event = _this.edit_event.bind(_this);
            _this.designer_select = _this.designer_select.bind(_this);
            _this.designer_load = _this.designer_load.bind(_this);
            _this.intercept_mounted = _this.intercept_mounted.bind(_this);
            _this.onSelectedIndexChanged = _this.onSelectedIndexChanged.bind(_this);
            _this.onCodeChange = _this.onCodeChange.bind(_this);
            return _this;
        }
        DesignerViewPort.prototype.componentWillMount = function () {
            if (window === window.parent) {
                app.services.events.subscribe({ type: "Navigation.Redirect" }, this.onRedirect);
            }
            app.services.events.subscribe(types_2.events["Ribbon.Event"](), this.ribbon_event);
            app.services.events.subscribe(types_2.events["Designer.Load"](), this.designer_load);
            app.services.events.subscribe(types_2.events["Designer.Select"](), this.designer_select);
            app.services.events.subscribe(types_2.events["Edit.Event"](), this.edit_event);
            app.services.events.subscribe(types_2.events["Intercept.Mounted"](), this.intercept_mounted);
        };
        DesignerViewPort.prototype.componentWillUnmount = function () {
            if (window === window.parent) {
                app.services.events.unsubscribe({ type: "Navigation.Redirect" }, this.onRedirect);
            }
            app.services.events.unsubscribe(types_2.events["Ribbon.Event"](), this.ribbon_event);
            app.services.events.unsubscribe(types_2.events["Designer.Load"](), this.designer_load);
            app.services.events.unsubscribe(types_2.events["Designer.Select"](), this.designer_relay);
            app.services.events.unsubscribe(types_2.events["Edit.Event"](), this.edit_event);
            app.services.events.unsubscribe(types_2.events["Intercept.Mounted"](), this.intercept_mounted);
        };
        DesignerViewPort.prototype.load_file = function (target, file) {
            return new Promise(function (resolve, reject) {
                return app.services.moduleSystem.fetch(file, { "Cache-Control": "no-cache", "Mode": "edit" }).then(function (res) {
                    target[file] = { content: res.text };
                    resolve();
                }, reject);
            });
        };
        DesignerViewPort.prototype.edit_event = function (ev) {
            var _this = this;
            var sources = this.state.sources;
            var files = Object.keys(sources);
            var toLoad = [];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var f = files_1[_i];
                if (ev.data.activeFiles.indexOf(f) == -1)
                    delete sources[f];
            }
            for (var _a = 0, _b = ev.data.activeFiles; _a < _b.length; _a++) {
                var f = _b[_a];
                if (files.indexOf(f) == -1)
                    toLoad.push(this.load_file(sources, f));
            }
            Promise.all(toLoad).then(function () {
                files = Object.keys(sources);
                var selectedIndex = ev.data.selectedFile ? files.indexOf(ev.data.selectedFile) : -1;
                if (selectedIndex === -1)
                    selectedIndex = files.length - 1;
                if (selectedIndex === -1)
                    selectedIndex = undefined;
                _this.setState({ sources: sources, selectedIndex: selectedIndex }, function () { return _this.designer_relay(ev); });
            });
        };
        DesignerViewPort.prototype.ribbon_event = function (ev) {
            this.setState({ editMode: ev.data.editMode });
        };
        DesignerViewPort.prototype.designer_select = function (ev) {
            var files = Object.keys(this.state.sources);
            var selectedIndex = (ev.data.control) ? files.indexOf(ev.data.control.url) : undefined;
            if (selectedIndex == -1)
                selectedIndex = undefined;
            if ((selectedIndex != undefined || files.length == 0) && selectedIndex !== this.state.selectedIndex)
                this.setState({ selectedIndex: selectedIndex });
            this.designer_relay(ev);
        };
        DesignerViewPort.prototype.designer_load = function (ev) {
            this.designer_relay(ev);
            var files = Object.keys(this.state.sources);
            app.services.events.publish(types_2.events["Edit.Event"]({ activeFiles: files, viewSource: this.state.editMode === types_2.EditMode.Source, selectedFile: this.state.selectedIndex != undefined ? files[this.state.selectedIndex] : undefined }));
        };
        DesignerViewPort.prototype.designer_relay = function (ev) {
            if (this.iframe && this.iframe.contentWindow /*&& ev.data*/)
                app.services.events.publish(ev, this["iframe"].contentWindow);
        };
        DesignerViewPort.prototype.onRedirect = function (event) {
            //debugger;cd
            //if (history && history.pushState) history.pushState(null, '', event.data); else location.replace(event.data);
        };
        DesignerViewPort.prototype.intercept_mounted = function (ev) {
            if (ev.data.file && this.state.sources[ev.data.file]) {
                var files = Object.keys(this.state.sources);
                app.services.events.publish(types_2.events["Edit.Event"]({ activeFiles: files, viewSource: this.state.editMode === types_2.EditMode.Source, selectedFile: this.state.selectedIndex != undefined ? files[this.state.selectedIndex] : undefined }));
            }
        };
        DesignerViewPort.prototype.onSelectedIndexChanged = function (index) {
            var _this = this;
            this.setState({ selectedIndex: index }, function () {
                if (_this.state.selectedIndex != undefined && _this.state.selectedIndex > -1) {
                    var files = Object.keys(_this.state.sources);
                    if (files.length > _this.state.selectedIndex)
                        app.services.events.publish({ type: "Designer.Intercept.Select", correlationId: files[_this.state.selectedIndex], data: { editMode: true, canEdit: true, control: { url: files[_this.state.selectedIndex] } } });
                }
            });
        };
        DesignerViewPort.prototype.onCodeChange = function (file, value) {
            var _this = this;
            var sources = {};
            Object.keys(this.state.sources).forEach(function (key) {
                sources[key] = key == file ? { content: value } : _this.state.sources[key];
            });
            this.setState({ sources: sources });
        };
        DesignerViewPort.prototype.render = function () {
            var _this = this;
            var keys = Object.keys(this.state.sources);
            var selectedIndex = this.state.selectedIndex === undefined ? -1 : this.state.selectedIndex;
            if (keys.length < selectedIndex)
                selectedIndex = keys.length - 1;
            var src = location.href;
            if (app.info.browser === types_1.types.webapp.browserType.IE) { // IE does not load another instance of a page with exactly the same name  
                var ix = location.origin.length + 2;
                src = src.substr(0, ix) + (src[ix].toUpperCase() == src[ix] ? src[ix].toLowerCase() : src[ix].toUpperCase()) + src.substr(ix + 1);
            }
            return _super.prototype.render.call(this, [["div",
                    { className: Styles_1["default"].Table + ' ' + Styles_1["default"].Fill, style: { border: "1px solid #AAA" } }, [["div", { className: Styles_1["default"].TableRow, style: { position: "relative", height: "100%" } }, [["iframe", { className: Styles_1["default"].Fill, style: { background: "white", border: "0", resize: this.state.editMode === types_2.EditMode.Source ? "vertical" : "none" }, src: src, ref: function (e) { _this["iframe"] = e; } }]]],
                        ["div", { className: Styles_1["default"].TableRow, style: { display: this.state.editMode === types_2.EditMode.Source ? "table-row" : "none" } }, [selectedIndex > -1 && keys.length > 0 ? [Layout_1.TabContainer,
                                    { tabs: keys, className: Styles_2.classes.SourceEdit_Files, selectedIndex: this.state.selectedIndex, onSelectedIndexChanged: this.onSelectedIndexChanged }, keys.map(function (key, index) { return [codemirror_1["default"], { className: Styles_1["default"].Fill, style: index == _this.state.selectedIndex ? {} : { display: 'none' }, value: _this.state.sources[key].content, settings: { matchBrackets: true, closeBrackets: true, continueComments: "Enter", lineNumbers: true, mode: "application/ld+json", lineWrapping: true, comment: true }, onChange: function (value) { return _this.onCodeChange(keys[selectedIndex], value); } }]; })] : null
                            ]]
                    ]
                ]]);
        };
        return DesignerViewPort;
    }(app.services.UI.Component));
};
exports.DesignerViewPort = DesignerViewPort;
