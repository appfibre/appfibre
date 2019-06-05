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
import { fibre } from "@appfibre/webapp";
;
;
;
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
                n++; return cv.size ? pv - cv.size : pv; }, available - ((panels.length - 1)));
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
                                if (!c.size || app.info.browser === fibre.webapp.browserType.Safari) {
                                    c.ratio = (i === index_1 ? pr_1 : nr_1) + ((i === index_1 ? 1 : -1) * (delta_1 / (_this.state.vertical ? screen.availHeight : screen.availWidth)));
                                }
                                else
                                    c.size = i === index_1 ? p_1 + delta_1 : n_1 - delta_1;
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
                    this.setState({ resize: { splitter: index, prev: p[v ? "clientHeight" : "clientWidth"], next: n[v ? "clientHeight" : "clientWidth"], start: v ? e.clientY : e.clientX, prev_ratio: this.state.panels[index].ratio, next_ratio: this.state.panels[index + 1].ratio } });
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
                    children.push(["div", { style: sep_style, onMouseDown: function (e) { return _this.splitter_mousedown.call(_this, e, i - 1); } }]);
                var style = { border: "0px solid grey", margin: 0, padding: 0 };
                style[_this.state.vertical ? "width" : "height"] = "100%";
                style[_this.state.vertical ? "height" : "width"] = (!c.size || bt === fibre.webapp.browserType.Safari) ? ((c.ratio * 100) + '%') : (c.size + 'px');
                if (!c.size)
                    style.flexGrow = 1;
                if (_this.state.resize)
                    style["pointerEvents"] = "none";
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
export { SplitContainer };
