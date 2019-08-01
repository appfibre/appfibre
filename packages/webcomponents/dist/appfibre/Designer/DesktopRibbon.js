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
import { events } from "./types";
import * as Layout from "../Layout";
var menus = [["File", [["div", null, "File content"]]],
    ["Edit", [["div", null, "Edit content"]]],
    ["View", [["div", null, "View content"]]],
    ["Insert", [["div", null, "Insert content"]]],
    ["Layout", [["div", null, "Layout content"]]],
    ["Data", [["div", null, "Data content"]]]
];
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
            _this.edit_click = _this.edit_click.bind(_this);
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
        DesktopRibbon.prototype.edit_click = function () {
            if (this.state.selectedContext && this.state.selectedContext.data.control)
                app.services.events.publish(events["Designer.Load"]({ url: this.state.selectedContext.data.control.url }));
        };
        DesktopRibbon.prototype.render = function () {
            return _super.prototype.render.call(this, ['div',
                {},
                [
                    ['div', {}, [['input', { type: 'text', 'style': { width: 'calc(100% - 45px)', background: 'transparent' }, value: this.state.url, onChange: this.url_change }],
                            ['button', { style: { float: 'right' }, onClick: this.navigate_click }, 'GO']
                        ]
                    ],
                    [Layout.TabContainer,
                        { placement: "top", tabs: menus.map(function (m) { return m[0]; }),
                            style: { width: "100%" },
                            tabStyle: { width: "100px", textAlign: "center", display: "inline-block", borderBottom: "1px solid grey", cursor: "hand" },
                            selectedTabStyle: { display: "inline-block", width: "100px", textAlign: "center", fontWeight: "bold", borderLeft: "1px solid grey", borderTop: "1px solid grey", borderRight: "1px solid grey", cursor: "default" }
                        },
                        menus.map(function (m) { return m[2]; })
                    ],
                    ['label', {}, this.state.selectedContext && this.state.selectedContext.data.control ? this.state.selectedContext.data.control.url : '(none)'],
                    this.state.selectedContext && this.state.selectedContext.data.control && this.state.selectedContext.data.canEdit ? ['button', { onClick: this.edit_click }, 'Edit'] : ['span', {}, '------']
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
            this.setState({ selectedContext: ev });
            app.services.events.publish(events["Designer.Select"](ev));
        };
        return DesktopRibbon;
    }(app.services.UI.Component));
};
export { DesktopRibbon };
