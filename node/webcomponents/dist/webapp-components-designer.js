(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@appfibre/webapp')) :
    typeof define === 'function' && define.amd ? define(['exports', '@appfibre/webapp'], factory) :
    (global = global || self, factory(global.Designer = {}, global.webapp));
}(this, function (exports, webapp) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var events = {
        "Designer.Load": function (data) { return { type: "Designer.Load", data: data }; },
        "Designer.Intercept.Select": function (data) { return { type: "Designer.Intercept.Select", data: data }; }
    };

    var DesktopRibbon /*: fibre.UI.Component */ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends(DesktopRibbon, _super);
            function DesktopRibbon(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { selectedContext: null, source: null, url: './pages/latest/index.json' };
                //this.onMessage = this.onMessage.bind(this);
                //this.edit = this.edit.bind(this);
                _this.url_change = _this.url_change.bind(_this);
                _this.navigate_click = _this.navigate_click.bind(_this);
                _this.onSelect = _this.onSelect.bind(_this);
                return _this;
            }
            DesktopRibbon.prototype.componentDidMount = function () {
                //this.setState({url: this.props.document});
                //window.addEventListener('message', this.onMessage);
                app.services.events.subscribe(events["Designer.Intercept.Select"](), this.onSelect);
            };
            DesktopRibbon.prototype.componentWillUnmount = function () {
                //window.removeEventListener('message', this.onMessage);
                app.services.events.unsubscribe(events["Designer.Intercept.Select"](), this.onSelect);
            };
            DesktopRibbon.prototype.url_change = function (ev) {
                this.setState({ url: ev.target.value });
            };
            DesktopRibbon.prototype.navigate_click = function () {
                app.services.events.publish(events["Designer.Load"]({ url: this.state.url }));
            };
            DesktopRibbon.prototype.render = function () {
                return _super.prototype.render.call(this, ['div',
                    {},
                    [
                        ['div', {}, [['input', { type: 'text', 'style': { width: 'calc(100% - 45px)', background: 'transparent' }, value: this.state.url, onChange: this.url_change }],
                                ['button', { style: { float: 'right' }, onClick: this.navigate_click }, 'GO']
                            ]
                        ],
                        ['label', {}, this.state.selectedContext && this.state.selectedContext.control ? this.state.selectedContext.control.url + ' ' + this.state.selectedContext.control.method : '(none)'],
                        this.state.selectedContext && this.state.selectedContext.control && this.state.selectedContext.canEdit ? ['button', { /*onClick: this.edit*/}, 'Edit'] : ['span', {}, '------']
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
                this.setState({ selectedContext: ev.data, source: ev.data.control.url });
            };
            return DesktopRibbon;
        }(app.services.UI.Component));
    };

    var Flex = function transform(tag, a, c) {
        a.className = "flex";
        return [tag, a, c];
    };
    var FlexItem = function transform(tag, a, c) {
        return [tag, a, c];
    };

    var Grid = function transform(tag, a, c) {
        return [tag, a, c];
    };
    var GridItem = function transform(tag, a, c) {
        return [tag, a, c];
    };

    var SplitContainer /*: fibre.UI.Component*/ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends(SplitContainer, _super);
            function SplitContainer(props) {
                var _this = _super.call(this, props) || this;
                var panels = (props.children || []).map(function (c, i) { return props.defaults && i < props.defaults.length ? __assign({}, props.defaults[i], { content: c }) : { content: c }; });
                var vertical = props.direction === "column" || props.direction === "column-reverse";
                _this.state = { direction: props.direction || "row", vertical: vertical, panels: _this.distributeSpace(panels, vertical ? screen.availHeight : screen.availWidth) };
                //this.window_resize = this.window_resize.bind(this);
                _this.window_mouseup = _this.window_mouseup.bind(_this);
                _this.window_mousemove = _this.window_mousemove.bind(_this);
                _this.splitter_mousedown = _this.splitter_mousedown.bind(_this);
                return _this;
            }
            SplitContainer.prototype.distributeSpace = function (panels, available) {
                var n = 0;
                var left = panels.reduce(function (pv, cv) { if (!cv.size)
                    { n++; } return cv.size ? pv - cv.size : pv; }, available - ((panels.length - 1)));
                return panels.map(function (c) { return __assign({}, c, { ratio: ((c.size || (left / n)) / available) }); });
            };
            SplitContainer.prototype.window_mousemove = function (e) {
                var _this = this;
                if (this.state.resize) {
                    var index_1 = this.state.resize.splitter;
                    var delta_1 = (this.state.vertical ? e.clientY : e.clientX) - this.state.resize.start;
                    var prev = this.state.panels[index_1];
                    var next = this.state.panels[index_1 + 1];
                    var p_1 = this.state.resize.prev;
                    var n_1 = this.state.resize.next;
                    var pr_1 = this.state.resize.prev_ratio;
                    var nr_1 = this.state.resize.next_ratio;
                    if ((!prev.max || prev.max >= p_1 + delta_1) && (!prev.min || prev.min <= p_1 + delta_1) && (!next.min || next.min <= n_1 - delta_1) && (!next.max || next.max >= n_1 - delta_1)) {
                        this.setState({ panels: this.state.panels.map(function (c, i) {
                                if (i === index_1 || i === index_1 + 1) {
                                    if (!c.size || app.info.browser === webapp.types.browserType.Safari) {
                                        c.ratio = (i === index_1 ? pr_1 : nr_1) + ((i === index_1 ? 1 : -1) * (delta_1 / (_this.state.vertical ? screen.availHeight : screen.availWidth)));
                                    }
                                    else
                                        { c.size = i === index_1 ? p_1 + delta_1 : n_1 - delta_1; }
                                }
                                return c;
                            }) });
                    }
                }
            };
            SplitContainer.prototype.splitter_mousedown = function (e, index) {
                if (e.target) {
                    var t = e.target;
                    var p = t.previousElementSibling;
                    var n = t.nextElementSibling;
                    var v = this.state.vertical;
                    if (p && n)
                        { this.setState({ resize: { splitter: index, prev: p[v ? "clientHeight" : "clientWidth"], next: n[v ? "clientHeight" : "clientWidth"], start: v ? e.clientY : e.clientX, prev_ratio: this.state.panels[index].ratio, next_ratio: this.state.panels[index + 1].ratio } }); }
                }
                window.addEventListener('mouseup', this.window_mouseup);
                window.addEventListener('mousemove', this.window_mousemove);
            };
            SplitContainer.prototype.window_mouseup = function (e) {
                window.removeEventListener('mouseup', this.window_mouseup);
                window.removeEventListener('mousemove', this.window_mousemove);
                this.setState({ resize: undefined });
            };
            SplitContainer.prototype.render = function () {
                var _this = this;
                var children = [];
                var bt = app.info.browser;
                var sep_style = { margin: 0, padding: 0, width: '1px', cursor: this.state.vertical ? "row-resize" : "col-resize" };
                sep_style[this.state.vertical ? "width" : "height"] = "100%";
                if (!this.state.vertical) {
                    sep_style.display = "inline-block";
                    sep_style.verticalAlign = "top";
                }
                this.state.panels.forEach(function (c, i) {
                    if (i > 0)
                        { children.push(["div", { style: sep_style, onMouseDown: function (e) { return _this.splitter_mousedown.call(_this, e, i - 1); } }]); }
                    var style = { border: "0px solid grey", margin: 0, padding: 0 };
                    style[_this.state.vertical ? "width" : "height"] = "100%";
                    style[_this.state.vertical ? "height" : "width"] = (!c.size || bt === webapp.types.browserType.Safari) ? ((c.ratio * 100) + '%') : (c.size + 'px');
                    if (!c.size)
                        { style.flexGrow = 1; }
                    if (_this.state.resize)
                        { style["pointerEvents"] = "none"; }
                    if (!_this.state.vertical) {
                        style.display = "inline-block";
                        style.verticalAlign = "top";
                    }
                    children.push(["div", { style: style }, [c.content]]);
                });
                return _super.prototype.render.call(this, ["div", { style: { display: "flex", flexDirection: this.state.direction, margin: 0, padding: 0, height: "100%", width: "100%", overflow: "hidden" } }, children]);
            };
            return SplitContainer;
        }(app.services.UI.Component));
    };

    var TabContainer /*: fibre.UI.Component*/ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends(TabContainer, _super);
            function TabContainer(props) {
                return _super.call(this, props) || this;
            }
            TabContainer.prototype.render = function () {
                var children = [];
                var placement = this.props.placement || "top";
                var v = placement === "top" || placement === "bottom" ? true : false;
                var defaults = [];
                var index = this.props.selectedIndex || 0;
                if (placement === "top" || placement === "left") {
                    defaults.push({ size: 20, min: 20, max: 20 });
                    children.push(["div", null, "tabs"]);
                }
                defaults.push({});
                children.push((this.props.children && this.props.children.length > index) ? this.props.children[index] : ["div", {}, "empty"]);
                if (placement === "bottom" || placement === "right") {
                    defaults.push({ size: 20, min: 20, max: 20 });
                    children.push(["div", null, "tabs"]);
                }
                return _super.prototype.render.call(this, [SplitContainer,
                    { direction: (v ? "column" : "row"), defaults: defaults },
                    children]);
            };
            return TabContainer;
        }(app.services.UI.Component));
    };

    var css = '.flex {\ndisplay: -webkit-box;\ndisplay: -moz-box;\ndisplay: box;\ndisplay: -moz-flex;\ndisplay: flex;\n}', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    var Layout = { Flex: Flex, FlexItem: FlexItem, Grid: Grid, GridItem: GridItem, TabContainer: TabContainer, SplitContainer: SplitContainer };

    var DesktopDesigner /*: fibre.UI.Component*/ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends(Designer, _super);
            function Designer(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { src: props.src };
                _this.navigateTo = _this.navigateTo.bind(_this);
                _this.onRedirect = _this.onRedirect.bind(_this);
                _this.designer_Load = _this.designer_Load.bind(_this);
                return _this;
                // this.onMessage = this.onMessage.bind(this);
            }
            Designer.prototype.componentWillMount = function () {
                //window.onmessage = this.onMessage;
                if (window === window.parent) {
                    app.services.events.subscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                }
                app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
            };
            Designer.prototype.componentWillUnmount = function () {
                //document.body.style.margin = '';
                //document.body.style.background = '';
                if (window === window.parent) {
                    app.services.events.unsubscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                }
                app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
            };
            Designer.prototype.designer_Load = function (ev) {
                if (this.iframe && this.iframe.contentWindow)
                    { app.services.events.publish(ev, this["iframe"].contentWindow); }
            };
            /* onMessage(ev) {
                if (this.state.document.startsWith(ev.origin) && ev.data )
                {
                    switch (ev.data.eventType)
                    {

                    }
                }
            }  */
            Designer.prototype.componentDidMount = function () {
                document.body.style.margin = '0px';
                document.body.style.height = '100%';
            };
            Designer.prototype.navigateTo = function (url) {
                this.setState({ url: url });
            };
            Designer.prototype.onRedirect = function (event) {
                //debugger;cd
                //if (history && history.pushState) history.pushState(null, '', event.data); else location.replace(event.data);
            };
            Designer.prototype.render = function () {
                var _this = this;
                return _super.prototype.render.call(this, 
                /*[   Grid( "div"
                            , { style: { "display": "grid", "gridTemplateColumns": "100px auto 100px", "gridTemplateRows": "150px auto 100px", "height": "100vh", "width": "100vw" } }
                            , [
                                  GridItem("div", { style: {"gridArea": "1/1/1/4", "background": "#AAA"}}, [[ DesktopRibbon, {register: this.props.register, document: this.state.url, navigateTo: this.navigateTo}]])
                                , GridItem("div", { style: {"gridArea": "2/1/2/1", "background": "red"}}, "left")
                                , GridItem("iframe", { style: {"gridArea": "2/2/2/2", "justifySelf": "stretch", "alignSelf": "stretch", border: '2px solid grey'}, src: location.href, ref: (e:any) => {this["iframe"] = e;}  })
                                , GridItem("div", { style: {"gridArea": "2/3/2/3", "background": "green"}}, "right")
                                , GridItem("div", { style: {"gridArea": "3/1/3/4", "background": "yellow"}}, "output")
                              ]
                        )
                ]*/
                ["div", { style: { height: "100%", backgroundColor: "#EEE", backgroundImage: "linear-gradient(#DEDEDE, #EFEFEF)" } },
                    [[Layout.SplitContainer,
                            { direction: "column", defaults: [{ size: 120, min: 120, max: 120 }, {}, { size: 50, min: 50, max: 50 }] },
                            [[DesktopRibbon, {}, "top"],
                                [Layout.SplitContainer,
                                    { direction: "row", defaults: [{ size: 350, min: 100, max: 500 }, {}, { size: 350, min: 100, max: 500 }] },
                                    [[Layout.TabContainer, { placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"] }, [["div", {}, "tab 1 content"]]],
                                        ["iframe", { style: { width: "100%", height: "100%", background: "white" }, src: location.href, ref: function (e) { _this["iframe"] = e; } }],
                                        [Layout.TabContainer, { placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"] }, [["div", {}, "tab 1 content"]]]
                                    ]
                                ],
                                ["div", {}, "bottom"]
                            ]]
                    ] ]);
            };
            return Designer;
        }(app.services.UI.Component));
    };

    var Intercept = function inject(app) {
        return /** @class */ (function (_super) {
            __extends(Intercept, _super);
            function Intercept(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { focus: false, selected: false, editMode: null, canEdit: true };
                _this.onMessage = _this.onMessage.bind(_this);
                _this.click = _this.click.bind(_this);
                _this.mouseEnter = _this.mouseEnter.bind(_this);
                _this.mouseLeave = _this.mouseLeave.bind(_this);
                return _this;
            }
            Intercept.prototype.componentDidMount = function () {
                window.addEventListener("message", this.onMessage);
                window.onclick = function () { parent.postMessage({ eventType: "select", correlationId: Date.now().toString() }, location.href); };
            };
            Intercept.prototype.componentWillUnmount = function () {
                window.removeEventListener("message", this.onMessage);
            };
            Intercept.prototype.reconstruct = function (obj) {
                if (!obj[1])
                    { obj[1] = {}; }
                if (!obj[1].style)
                    { obj[1].style = {}; }
                if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
                    obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
                    if (this.state.editMode)
                        { obj[1].style.background = "lightblue"; }
                    if (this.state.selected)
                        { obj[1].style.border = "1px solid black"; }
                    else if (this.state.focus)
                        { obj[1].style.border = "1px dashed grey"; }
                    obj[1].onMouseEnter = this.mouseEnter;
                    obj[1].onMouseLeave = this.mouseLeave;
                    obj[1].onClick = this.click;
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
            Intercept.prototype.click = function (ev) {
                ev.stopPropagation();
                //Designer.notify(this.props.file);
                var parent = window;
                while (parent.parent !== parent && window.parent != null)
                    { parent = parent.parent; }
                var correlationId = Date.now().toString();
                //parent.postMessage({eventType: "select", editMode: this.state.editMode, canEdit: this.state.canEdit, correlationId, control: {file:this.props.file, method:this.props.method}}, location.href);
                if (this.props.file) {
                    app.services.events.publish({ type: "Designer.Intercept.Select", correlationId: correlationId, data: { editMode: this.state.editMode, canEdit: this.state.canEdit, control: { url: this.props.file, method: this.props.method } } }, parent);
                    this.setState({ selected: !!correlationId });
                }
            };
            Intercept.prototype.onMessage = function (ev) {
                if (location.href.substr(0, ev.origin.length) == ev.origin && ev.type == "message" && ev.data) {
                    if (this.state.selected == ev.data.correlationId)
                        { switch (ev.data.eventType) {
                            case "deselect":
                                this.setState({ selected: false });
                                break;
                            case "edit":
                                this.setState({ editMode: ev.data.editMode });
                                break;
                        } }
                }
            };
            return Intercept;
        }(app.services.UI.Component));
    };

    var DesignerFrame /*: fibre.UI.Component<any,any>*/ = function inject(app) {
        if (app.services.transformer.settings.parsers)
            { app.services.transformer.settings.parsers[".app"] = function (obj, parseSettings, offset) {
                var obj2 = {};
                var keys = Object.keys(obj);
                keys.forEach(function (z) { return obj2[z == ".app" ? "main" : z] = obj[z]; });
                return "[\".App\", {" + app.services.transformer._process(obj2, true, true, parseSettings, offset) + "}]";
            }; }
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

    /*let Designer = (window.parent === window) ? DesktopDesigner : function transform(this:types.IAppLoaded, a:any, c:any) {
        let app = this;
        this.services.processor.init = (obj:{default:any, [index:string]:any}) => typeof obj.__esModule === "string" ? [Intercept, {file: obj.__esModule}, [obj.default]] : obj.default;
        return app.main;
    };*/
    var Designer = (window.parent === window) ? DesktopDesigner : DesignerFrame;

    exports.Designer = Designer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
