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
import { SplitContainer } from "./SplitContainer";
;
var TabContainer /*: fibre.UI.Component*/ = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(TabContainer, _super);
        function TabContainer(props) {
            var _this = _super.call(this, props) || this;
            _this.select = _this.select.bind(_this);
            return _this;
        }
        TabContainer.prototype.select = function (index) {
            if (this.props.onSelectedIndexChanged)
                this.props.onSelectedIndexChanged(index);
        };
        TabContainer.prototype.render = function () {
            var _this = this;
            var children = [];
            var placement = this.props.placement || "top";
            var v = placement === "top" || placement === "bottom" ? true : false;
            var defaults = [];
            var index = this.props.selectedIndex || 0;
            if (placement === "top" || placement === "left") {
                defaults.push({ size: 20, min: 20, max: 20 });
                children.push(["div",
                    { key: 'tabs', style: this.props.style },
                    this.props.tabs.map(function (t, i) { return typeof t === "string" ? ["span", { key: i, style: i === (_this.props.selectedIndex || 0) ? _this.props.selectedTabStyle : _this.props.tabStyle, onClick: function () { return _this.select(i); } }, t] : t; })
                ]);
            }
            defaults.push({});
            children.push((this.props.children && this.props.children.length > index) ? this.props.children[index] : ["div", { key: index }, "(empty)"]);
            if (placement === "bottom" || placement === "right") {
                defaults.push({ size: 20, min: 20, max: 20 });
                children.push(["div",
                    { key: 'tabs', style: this.props.style },
                    this.props.tabs.map(function (t, i) { return typeof t === "string" ? ["span", { key: i, style: i === (_this.props.selectedIndex || 0) ? _this.props.selectedTabStyle : _this.props.tabStyle, onClick: function () { return _this.select(i); } }, t] : t; })
                ]);
            }
            return _super.prototype.render.call(this, [SplitContainer,
                { direction: (v ? "column" : "row"), defaults: defaults },
                children]);
        };
        return TabContainer;
    }(app.services.UI.Component));
};
/*
type Tab = [types.element|types.promisedElement, {title?:string}, Array<types.element|types.promisedElement>]
type TabContainer = [types.element, SplitContainer_Attributes, Array<Tab>];

var TabContainer = function transform(a:attr, c:Array<Tab>):TabContainer {
    let children:any[] = [];
    let placement: "top"|"bottom"|"left"|"right" = a.placement || "top";
    let v = placement === "top" || placement === "bottom" ? true : false;
    let defaults = [];
    let index = a.selectedIndex || 0;
    
    if (placement === "top" || placement === "left") {
        defaults.push( {size: 20, min: 20, max: 20});
        children.push( ["div", null, "tabs"]);
    }
    defaults.push({});
    //children.push( (c && a.children.length > index) ? this.props.children[index] : ["div", {}, "empty"] );
    children.push(["div", {}, "(empty)"])

    if (placement === "bottom" || placement === "right") {
        defaults.push( {size: 20, min: 20, max: 20});
        children.push(["div", null, "tabs"]);
    }
                
    return  [ SplitContainer
            , { direction: (v ? "column" : "row"), defaults: defaults }
            , children
            ];
}
*/
export { TabContainer };
