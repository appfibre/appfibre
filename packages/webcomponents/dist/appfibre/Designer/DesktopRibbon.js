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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { events, EditMode } from "./types";
import * as Layout from "../Layout";
import { classes } from './Styles';
import styles from "../Layout/Styles";
var DesktopRibbon /*: fibre.UI.Component */ = function inject(app) {
    var navigator = function inject(app) {
        return /** @class */ (function (_super) {
            __extends(Navigator, _super);
            function Navigator(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { url: _this.props.url || '', allowEdit: false };
                _this.url_change = _this.url_change.bind(_this);
                _this.navigate_click = _this.navigate_click.bind(_this);
                return _this;
            }
            Navigator.prototype.url_change = function (ev) {
                this.setState({ url: ev.target.value });
            };
            Navigator.prototype.navigate_click = function () {
                app.services.events.publish(events["Designer.Load"]({ url: this.state.url }));
            };
            Navigator.prototype.render = function () {
                var _this = this;
                var toggle = (this.state.url && this.props.activeFiles.indexOf(this.state.url) > -1) ? classes.CommandButton_ToggleOn : classes.CommandButton_ToggleOff;
                return _super.prototype.render.call(this, ["div",
                    { className: classes.RibbonNavigator, style: { background: "#DDD", overflow: "hidden" } },
                    [["div",
                            {},
                            [["div", {}, [['input', { type: 'text', style: {}, value: this.state.url, onChange: this.url_change }]]],
                                ["div", { title: 'Navigate To', style: { width: "25px" }, className: classes.CommandButton_NavigateTo, onClick: this.navigate_click }, [['div']]],
                                ["div", { title: 'Edit', style: { width: '20px' }, className: toggle, onClick: function () { return _this.props.toggleActiveFile(_this.state.url); } }, [['div']]]
                            ]
                        ]
                    ]
                ]);
            };
            return Navigator;
        }(app.services.UI.Component));
    };
    return /** @class */ (function (_super) {
        __extends(DesktopRibbon, _super);
        function DesktopRibbon(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { selectedContext: null, source: null, menuIndex: -1, allowEdit: false, editing: { viewSource: false, activeFiles: [] } };
            //this.onMessage = this.onMessage.bind(this);
            //this.edit = this.edit.bind(this);
            _this.nav_click = _this.nav_click.bind(_this);
            _this.onSelect = _this.onSelect.bind(_this);
            _this.ribbon_toggle_edit = _this.ribbon_toggle_edit.bind(_this);
            _this.command_click = _this.command_click.bind(_this);
            _this.toggle_ActiveFile = _this.toggle_ActiveFile.bind(_this);
            return _this;
        }
        DesktopRibbon.prototype.command_button = function (editMode, title, className) {
            var _this = this;
            return { title: title, className: classes.CommandButton + ' ' + className + ' ' + (this.state.allowEdit ? this.state.editMode === editMode ? classes.CommandButton_Active : classes.CommandButton_Enabled : classes.CommandButton_Disabled), onClick: function () { return _this.command_click(editMode); } };
        };
        DesktopRibbon.prototype.menus = function () {
            return [
                [["div", { className: styles.TableCell, style: { width: '40px', textAlign: 'center', verticalAlign: 'middle' } }, [["a", { className: classes.logo_Fibre }]]]],
                ["File", ["div", {},
                        [['label', {}, this.state.selectedContext && this.state.selectedContext.data.control ? this.state.selectedContext.data.control.url : '(none)'],
                            this.state.selectedContext && this.state.selectedContext.data.control && this.state.selectedContext.data.canEdit ? ['button', { onClick: this.nav_click }, 'Edit'] : ['span', {}, '------']
                        ]]
                ],
                ["Edit", [Layout.CommandBar, { sections: [{ title: "Edit",
                                    commands: [this.command_button(EditMode.Inline, 'Edit', classes.CommandButton_Edit),
                                        this.command_button(EditMode.Source, 'Edit Source', classes.CommandButton_Source)
                                    ]
                                },
                                { title: "Format" }
                            ],
                            section_style: { height: "100%" } }]],
                ["View", ["div", null, "View content"]],
                ["Insert", ["div", null, "Insert content"]],
                ["Layout", ["div", null, "Layout content"]],
                ["Data", ["div", null, "Data content"]],
                [[navigator, { url: this.state.selectedContext && this.state.selectedContext.data.control ? this.state.selectedContext.data.control.url : '', activeFiles: this.state.editing.activeFiles, toggleActiveFile: this.toggle_ActiveFile }]]
            ];
        };
        DesktopRibbon.prototype.toggle_ActiveFile = function (filename) {
            var _this = this;
            var files = this.state.editing.activeFiles;
            var index = files.indexOf(filename);
            if (index > -1)
                files.splice(index, 1);
            else
                files.push(filename);
            this.setState({ editing: __assign({}, this.state.editing, { activeFiles: files, selectedFile: filename }) }, function () { return app.services.events.publish(events["Edit.Event"](_this.state.editing)); });
        };
        DesktopRibbon.prototype.componentDidMount = function () {
            //this.setState({url: this.props.document});
            //window.addEventListener('message', this.onMessage);
            app.services.events.subscribe(events["Designer.Intercept.Select"](), this.onSelect);
            app.services.events.subscribe(events["Designer.Ribbon.ToggleEdit"](), this.ribbon_toggle_edit);
        };
        DesktopRibbon.prototype.componentWillUnmount = function () {
            //window.removeEventListener('message', this.onMessage);
            app.services.events.unsubscribe(events["Designer.Intercept.Select"](), this.onSelect);
            app.services.events.unsubscribe(events["Designer.Ribbon.ToggleEdit"](), this.ribbon_toggle_edit);
        };
        DesktopRibbon.prototype.nav_click = function () {
            if (this.state.selectedContext && this.state.selectedContext.data.control)
                app.services.events.publish(events["Designer.Load"]({ url: this.state.selectedContext.data.control.url }));
        };
        DesktopRibbon.prototype.command_click = function (editMode) {
            if (this.state.allowEdit && this.state.selectedContext && this.state.selectedContext.data.control) {
                var url = this.state.selectedContext.data.control;
                if (this.state.editMode === editMode)
                    editMode = undefined;
                this.setState({ editMode: editMode }, function () {
                    app.services.events.publish(events["Ribbon.Event"]({ editMode: editMode }));
                });
            }
        };
        DesktopRibbon.prototype.ribbon_toggle_edit = function () {
            this.setState({ menuIndex: this.state.menuIndex > -1 ? -1 : 1 });
        };
        DesktopRibbon.prototype.render = function () {
            var _this = this;
            var menus = this.menus();
            return _super.prototype.render.call(this, ["div",
                { className: this.props.className, style: __assign({ height: "0%" }, this.props.style) },
                [[Layout.TabContainer,
                        { placement: "top", tabs: menus.map(function (m) { return m ? m[0] : []; })
                            //, containerStyle: this.state.menuIndex < 0 ? { display: "none"} : { width: "100%", height: "100px", borderBottom: "1px solid #DDD" }
                            ,
                            selectedIndex: this.state.menuIndex,
                            onSelectedIndexChanged: function (index) { return _this.setState({ menuIndex: _this.state.menuIndex === index ? -1 : index }); },
                            className: classes.DesktopRibbon_TabContainer,
                            className_Tab: this.props.className_Tab
                        },
                        this.state.menuIndex >= 0 ? [menus[this.state.menuIndex][1]] : undefined
                    ]
                ]
            ]);
        };
        /*edit() {
            if (this.state.selectedContext && this.state.selectedContext.control) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET',  this.state.selectedContext.control.file);
                xhr.setRequestHeader('Content-Type', 'application/jst');
                xhr.send();
                var context = this;
                xhr.addEventListener('load', function(this: XMLHttpRequest, e: ProgressEvent) {
                    if (this.status === 200)
                        context.state.source.postMessage({eventType: 'edit', editMode: 'inline', correlationId: context.state.selectedContext.correlationId}, location.href);
                    });
            }
        }

        onMessage(ev: any) {
            if (this.props.document && this.props.document.substr(0, ev.origin.length) === ev.origin && ev.data) {
                switch (ev.data.eventType) {
                    case 'select':
                        if (this.state.selectedContext && this.state.selectedContext.correlationId && ev.source)
                            ev.source.postMessage({eventType: 'deselect', correlationId: this.state.selectedContext.correlationId}, location.href);
                        this.setState({selectedContext: ev.data, source: ev.source});
                    break;
                }
            }
        }*/
        DesktopRibbon.prototype.onSelect = function (ev) {
            this.setState({ selectedContext: ev, allowEdit: ev.data.control ? true : false });
            app.services.events.publish(events["Designer.Select"](ev));
        };
        return DesktopRibbon;
    }(app.services.UI.Component));
};
export { DesktopRibbon };
