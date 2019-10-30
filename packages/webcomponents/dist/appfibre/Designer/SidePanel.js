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
//import { events, Designer_Load, Designer_Select } from "./types";
import { css } from '../Layout/Style';
import { TabContainer } from "../Layout/TabContainer";
var classes = {
    'SidePanel': css('.WebComponents_Designer_SidePanel', ['display: table-cell', 'vertical-align: top', 'height: 100%', 'overflow: auto', 'border: 1px solid transparent'])
};
var SidePanel /*: fibre.UI.Component<any,any>*/ = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(SidePanel, _super);
        function SidePanel(props) {
            var _this = _super.call(this, props) || this;
            _this.props = props;
            _this.state = { selectedIndex: -1 };
            return _this;
        }
        SidePanel.prototype.componentWillMount = function () {
            //window.addEventListener("click", this.window_click);
            //app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
            //document.body.onclick = function () {debugger;};
        };
        SidePanel.prototype.componentWillUnmount = function () {
            //app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
            //window.removeEventListener("click", this.window_click);
        };
        SidePanel.prototype.render = function () {
            var _this = this;
            var placement = this.props.placement || "top";
            var v = placement === "top" || placement === "bottom";
            var width = v ? '100%' : (this.state.selectedIndex > -1 ? '300px' : '1px');
            var height = v ? (this.state.selectedIndex > -1 ? '300px' : '1px') : '100%';
            var resize = this.state.selectedIndex > -1 ? (v ? 'vertical' : 'horizontal') : undefined;
            var direction = placement === "right" ? "rtl" : "ltr";
            return _super.prototype.render.call(this, ["div",
                { className: classes.SidePanel, style: { width: width, height: height, resize: resize, direction: direction } },
                [["div", { style: { direction: "ltr", width: "100%", height: "100%" } },
                        [[TabContainer,
                                { tabStripStyle: v ? { height: "25px" } : { width: "40px" }, placement: placement, tabs: this.props.tabs, selectedIndex: this.state.selectedIndex, onSelectedIndexChanged: function (index) { return _this.setState({ selectedIndex: _this.state.selectedIndex === index ? -1 : index }); } },
                                this.state.selectedIndex > -1 ? [["div", {}, "------content------"]] : null
                            ]
                        ]
                    ]]
            ]);
        };
        return SidePanel;
    }(app.services.UI.Component));
};
export { SidePanel };
