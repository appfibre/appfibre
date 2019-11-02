var appfibre_webcomponents = (function (exports) {
    'use strict';

    var _cache = [];
    function Style(css) {
        var head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
        style.type = 'text/css';
        if (Array.isArray(css)) {
            css = css.filter(function (c) { return _cache.indexOf(c) == -1; }).map(function (c) { _cache.push(c); return c; }).join(';');
        }
        else if (css && _cache.indexOf(css) == -1) {
            _cache.push(css);
        }
        else
            css = '';
        if (css.length > 0) {
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
        }
        return css;
    }
    function css(name, body) {
        if (body && body.length > 0)
            Style(name + " {" + (Array.isArray(body) ? body.join(';') : body) + "}");
        if (name[0] == '.') {
            var s = new RegExp(/[,.> ]/).exec(name.substr(1));
            return name.substring(1, s && s.length > 0 ? s.index + 1 : name.length);
        }
        return '';
    }

    var styles = {
        Fill: css('.WebComponents_Layout_Fill', ['width: 100%', 'height: 100%']),
        TabContainer: css('.TabContainer', ['cursor: default']),
        Tab: css('.Tab', undefined),
        Tab_Normal: css('.Tab-Normal', undefined),
        Tab_Selected: css('.Tab-Selected', undefined),
        TabStrip: css('.TabStrip', ['vertical-align: top', 'width: 100%']),
        Table: css('.WebComponents_Layout_table', 'display: table'),
        TableRow: css('.WebComponents_Layout_tr', 'display: table-row'),
        TableCell: css('.WebComponents_Layout_td', 'display: table-cell'),
        Left: css('.WebComponents_Layout_left', 'align: left'),
        Right: css('.WebComponents_Layout_right', 'align: right')
    };

    var __assign = (undefined && undefined.__assign) || function () {
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
    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var TabContainer = function transform(a, c) {
        var className = a.className, placement = a.placement, containerStyle = a.containerStyle, selectedIndex = a.selectedIndex, onSelectedIndexChanged = a.onSelectedIndexChanged, tabStyle = a.tabStyle, tabs = a.tabs, style = a.style, selectedTabStyle = a.selectedTabStyle, tabStripStyle = a.tabStripStyle, className_Tab = a.className_Tab, props = __rest(a, ["className", "placement", "containerStyle", "selectedIndex", "onSelectedIndexChanged", "tabStyle", "tabs", "style", "selectedTabStyle", "tabStripStyle", "className_Tab"]);
        var children = [];
        placement = placement || "top";
        var v = placement === "top" || placement === "bottom" ? true : false;
        var drawTab = function (tab, index) { return Array.isArray(tab) ? tab :
            ["div",
                { className: (placement === "left" ? styles.TableRow : styles.TableCell) + (' ' + (typeof tab !== "string" && tab.className ? tab.className : className_Tab || '')) + ' ' + styles.Tab + ' ' + (index === selectedIndex ? styles.Tab_Selected : styles.Tab_Normal),
                    style: index === selectedIndex ? selectedTabStyle : tabStyle, onClick: function () { return onSelectedIndexChanged ? onSelectedIndexChanged(index) : null; }
                },
                typeof tab === "string" ? tab : tab.title
            ]; };
        if (placement === "top" || placement === "left") {
            children.push(["div",
                { style: tabStripStyle, className: styles.TabStrip + ' ' + (placement === "top" ? styles.TableRow : styles.TableCell) },
                [["div", { className: styles.Table + ' ' + styles.Fill }, tabs ? tabs.map(drawTab) : null]]
            ]);
        }
        if (c)
            children.push(["div", { className: (v ? styles.TableRow : styles.TableCell) + ' ' + styles.Fill }, c]);
        if (placement === "bottom" || placement === "right") {
            children.push(["div",
                { style: tabStripStyle, className: styles.TabStrip + ' ' + (placement === "bottom" ? styles.TableRow : styles.TableCell) },
                [["div", { className: styles.Table }, tabs ? tabs.map(drawTab) : null]]
            ]);
        }
        return ["div", __assign({ className: styles.TabContainer + ' ' + styles.Table + (className ? ' ' + className : '') + ' ' + styles.Fill, style: style }, props), children];
    };

    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var CommandBar = function transform(props, children) {
        var c = [];
        if (props.sections)
            for (var _i = 0, _a = props.sections; _i < _a.length; _i++) {
                var section = _a[_i];
                c.push(["div",
                    { style: __assign$1(__assign$1({}, props.section_style), { display: "table-cell" }), className: 'Section' },
                    [["div",
                            { style: { height: '80px' }, className: 'Section-Commands' },
                            section.commands ? section.commands.map(function (s) { return ["div", __assign$1({ className: s.className }, s.style), [["div", { title: s.title, onClick: s.onClick }, s.title]]]; }) : null
                        ],
                        ["div", { className: 'Section-Title', style: { color: 'gray', textAlign: "center" } }, section.title]
                    ]
                ]);
            }
        return ["div",
            { className: 'Full CommandBar', style: { display: "table" } },
            c];
    };

    //import { Flex, FlexItem } from "./FlexBox";

    var index = /*#__PURE__*/Object.freeze({
        Style: Style,
        TabContainer: TabContainer,
        CommandBar: CommandBar
    });

    var EditMode;
    (function (EditMode) {
        EditMode[EditMode["Inline"] = 0] = "Inline";
        EditMode[EditMode["Source"] = 1] = "Source";
    })(EditMode || (EditMode = {}));
    var events = {
        "Designer.Load": function (data) { return { type: "Designer.Load", data: data }; },
        "Designer.Intercept.Select": function (data) { return { type: "Designer.Intercept.Select", data: data }; },
        "Designer.Select": function (event) { return { type: "Designer.Select", data: event ? event.data : undefined, correlationId: event ? event.correlationId : undefined }; },
        "Designer.Ribbon.ToggleEdit": function () { return { type: "Designer.Ribbon.ToggleEdit" }; }
        //, "Designer.Deselect": function (correlationId?:string):types.app.IEventData<undefined> {return {type: "Designer.Intercept.DeSelect", correlationId, data:undefined}}
        ,
        "Designer.EditMode.Inline": function (data) { return { type: "Designer.EditMode.Inline", data: data }; },
        "Designer.EditMode.Source": function (data) { return { type: "Designer.EditMode.Source", data: data }; },
        "Ribbon.Event": function (data, correlationId) { return { type: "Ribbon.Event", correlationId: correlationId, data: data }; },
        "Edit.Event": function (data, correlationId) { return { type: "Edit.Event", correlationId: correlationId, data: data }; },
        "Intercept.Mounted": function (data, correlationId) { return { type: "Intercept.Mounted", correlationId: correlationId, data: data }; }
    };

    var wcd = function (s) { return ".WebComponents_Designer_" + s; };
    var classes = {
        DesktopRibbon: css(wcd('DesktopRibbon'), ['display: table-row', 'background: #BBB', 'background-image: linear-gradient(#BBB, #AAA)']),
        SidePanel: css(wcd('SidePanel') + ' .' + styles.Tab, 'border: 1px solid transparent'),
        Tab_Explore: css(wcd('Tab_Explore'), ['font-size: 0pt', 'display: block', 'width: 32px;', 'height: 32px;', 'margin: 2px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAHt7e4KCgoaGhouLi42NjY6Ojo+Pj5CQkJGRkZKSkpOTk5aWlpeXl5qamp+fn6SkpKenp6mpqaqqqqysrK2tra+vr7Gxsbi4uL6+vr+/v8TExMzMzM3Nzc7OztHR0dXV1dfX19jY2N3d3d/f3+Dg4OHh4eTk5OXl5ejo6Onp6ezs7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGKiAR0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAAM9JREFUOE+tk+sSgiAQRiO7qNlFrcyyNDM1ef/nI1mJYZGmbDq/vlkOl2FhxD7QCY4f9PAXMASCV1MDhSsFh949S2NVUUsKLt0nYprkFCEhKEVdkgUm4cpPl0M0C03Z0kA0Cwq6cDhqRFhIRVkhRYIRtIXtakyHHvJL4cy7cIH44woKurCBR6KwxkLNm4CpkVBkPYphW/ztolLehRTi0BW2mahLkh0S8hl8BgX7pgjeQ0xDVHMpsGUs3plCvIShTmBsTEgoYktIyETEl/AGxp7iB5Xp2FCNRQAAAABJRU5ErkJggg==)']),
        Tab_Properties: css(wcd('Tab_Properties'), ['font-size: 0pt', 'display: block', 'width: 32px', 'height: 32px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAfHx8iIiIioqKi4uLj4+PkJCQkZGRkpKSlJSUlpaWmZmZmpqanZ2dn5+foaGhpaWlpqamp6enqKiorKysrq6ur6+vsLCwsbGxsrKytLS0tbW1tra2t7e3uLi4urq6vb29wsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzs7Oz8/P0dHR09PT1dXV1tbW2NjY39/f4uLi4+Pj5eXl5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u7u8fHx8vLy9PT09fX19vb29/f3+fn5+vr6/Pz8/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAr1UwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAA+ElEQVQ4T73T/U+CQBzHcbOyJM0o7MnQTiQlo6LUwq586BQ///8fRBexdbEvGpvz/csx9hp3Y9/LhSv6DzhdUgQqjdQqEdBZavqagD1LzY6Ag9ScjQIOjPpq8sUf0AG8M7V2AtBlAabcRVOrJQBdFlAFmnk1IwHosgD1R9WBt9al6Ql8/IJPQIzixuK85PKBWXgCvcV7+Xb6YLV74+NrEvC9l8BhzLV6Qf2CAKI8AGdXRd+9ASgw1ObwmbG1wyzg8VCCRjwBP3Hc6UJYzDCZh+fS9xfiWxZnL4LuwcSXM9+d3e9HhyTSOsNXv2+cyEcaSLK9eySXMPwC9RuGNpXY11AAAAAASUVORK5CYII=);']),
        Tab: css(wcd('Tab'), undefined),
        SourceEdit_Files: css(wcd('Edit_Files') + ' .' + styles.Tab, ['background: #BBB', 'padding-right: 20px', 'padding-right: 20px', 'border: 1px solid #AAA', 'border-radius: 1px']),
        DesktopRibbon_Tab: css(wcd('Ribbon_Tab'), ['width: 100px', 'text-align: center']),
        DesktopRibbon_TabContainer: css(wcd('Ribbon_TabContainer'), ['width: 100%']),
        RibbonNavigator: css('.WebComponents_Desginer_RibbonNavigator', ['display: table-cell', 'vertical-align: top']),
        CommandButton: css(wcd('CommandButton'), ['float: left', 'text-align: center', 'vertical-align: bottom', 'width: 40px', 'height: 40px', 'margin: 2px', 'padding: 2px', 'background: #B0B0B0', 'border-radius: 3px', 'border: 1px solid #BBB']),
        CommandButton_Disabled: css(wcd('CommandButton_Disabled'), ['background: #999']),
        CommandButton_Enabled: css(wcd('CommandButton_Enabled'), undefined),
        CommandButton_Active: css(wcd('CommandButton_Active'), ['background: #CCC']),
        CommandBar: css(wcd('CommandBar'), 'display: none'),
        logo_Fibre: css(wcd('logo'), ['width: 20px', 'height: 20px', 'display: inline-block', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAAG6SURBVDhPY/j//z9VMW2BlpaWkLq6er6amloBkTgbpAeqHRWoqqqmamtrfwoODv5PLA4MDPwPNPAZ0GBFqDEQALIFZFhlZeX/+vp6nLixqfL/5lXu/3dvtPh/Zr0vWCwzM/O/pqbmdaAxzBDTgADkTZCN6Aag4Ia6/4d3af5fNqngf3t7/v95UzLhcoaGhv+BZvBCjWNgAIUHIQMnTon6//q0+v+mBkw5kg1sbKr6f/6I1P+Tq8OwypNk4OSp0f9vHZP///ce0/+Hx1T/z+srw1BDsgv7p4b//3lN8n9bI3Z5kg1cv9bs/4O91ljlQJhkA6+c4v+/b2kMVjkQJsnAprbc/9/usP2f3VWNVR6ESTJw1hy//9/Oq/xvwCIHwyQZuGub5v+Ta3EHBwgTb2BD9f/750T/97fWYcohYWwGZoMyOkzB5Mkp/yd1VP6fPDXy/94lsSiasWEMA1VUVGQMDAx+wwqHLest/+9f5f9/7axEvGEHwmlpaf81NDQeAM1ghxoHAUAbonR0dP7m5eX9z8/PJwonJSWBSppXQB96Qo1BBUBJVaDkPiDeTwwGOmIhsByVhmoHAgYGAAfVwijqMWR9AAAAAElFTkSuQmCC)']),
        CommandButton_NavigateTo: css(wcd('CommandButton_NavigateTo') + ' > div', ['width: 20px', 'height: 20px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAA+klEQVQ4T92Ryw2CQBCGtwNfZ+3DCqzAMkh4hVeWAuwBSDiwGjxA4kWNbViINw8QnMFdDJ5w18TEP5kDy+TLNzPkv2JZ1sa27Tn/VA8Ar77vnz3Pm/IntSAwTdOaUno0DGPBn+WDwLIsmyzLajC9mKY547/kIoBYwlTX9b4pNK2wcWDdBVCYwj5PMP6E4wiBq60ZY13Tp4WmYRgeOlNVIFZvp6rAoiiaJEmqIAhyx3HGysA4jivY4w44o3ZkWOgSVPOBdRMgNEMYjLpvzWSCl34zY9IwDAKFmeu6WzB+jikbBEZR1JppmqYGwyAQRnwdQDUwIv0a7Ech5AEik4YBcXHklgAAAABJRU5ErkJggg==)']),
        CommandButton_ToggleOff: css(wcd('CommandButton_Toggle') + ' > div', ['width: 30px', 'height: 20px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAAEfSURBVDhP7ZO/boMwEMatTn2LtK/WSH0IQKYrbEztBq+AEEgIxNhkgg1G2BhgDksq5z7k/MG10g6M+aRP1tl3P4F9xx5aV6ZpvhqG8U4rJ3/8YY5c27ZfZPlVtPnsOM5XlmU/bduKYRjEOI53jRzkosZ13U8wzrAnz/MSHOZ5LpIkQdK8Iv4PvOs6QYwYLMY539Z1LaIoEn3fi1shjuNYC1ENhmVZb8z3/T2CqqokZinsN02jhagOgmDHwjCc0jQV0zRJxFLYx7kOoJpYBwAPqwLxmfd+uSzL+X50ANXE+r48Ci5/lUc5tw2eviiKS7tgRawrVr1oG9mLc2MT6Ih+1BXpLHv3uGjsW9E4bTBOZFsZs19GjhzTjSx/aBUxdgIR/t1ldGPYwQAAAABJRU5ErkJggg==)']),
        CommandButton_ToggleOn: css(wcd('CommandButton_ToggleOn') + ' > div', ['width: 30px', 'height: 20px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAABZUlEQVQ4T2MYBdQFrs0HFd06T6S5dxyvdW8/3oAXA9W4tQPVth9XgGpHAPv6+xxBE87NKF3/7E//ke//p5/++3/GGfwYpAakFqQnaOK56fb1+znAhtXX/2cKm3pp24Sj37FqRMbTT//5X77h2f/+HQ//zz/4CExXgPhAg8OnXtwKMovBo+NEcsf+T1gNQMflax/+v/fy639kcBfIr1j36D/IDI/OE0kMSfNunMCmGR2DNOy58hpqDCrYc/n1/879n/8nzr1xnCF3xYNv2AxAx8Vrn/z/8uMP1AhUABIvXvv0P8gs6hq4HGhg4rwbx7EZgI7xeXn35VdAeaCX5904RlKkgAIfFAnIAB4p+4CR0g6MFFiy6Sci2YBw5cbn//t3Pvy/4NBjcLIB85GTDQiAE/bE89NL1z8FJ2xsBmHDkIT9FDVhIwOv7qPyoKzn1nGsHiOroWGQGlDW82o+Kg/VPgqoAhgYAKvxudsBl8q9AAAAAElFTkSuQmCC)']),
        CommandButton_Source: css(wcd('CommandButton_Source') + ' > div', ['width: 40px', 'height: 40px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAD9RtD9RtUBRtUBStUJUtUJUtkVWt0dYt0dYuEhZt0lauExcuU1euk9gu1JivFRkvFRkvVdmvVdnvllovlppv1trwF1swF9twWFvwWFvwmFwwmRyw2Z0xGh2xGx6xm58xm98xyGV8iKW8iGW8yWX8iSX8yeY8imZ8i2b8zaf8zSf9Deg8zmh8zui8zih9EGl9Eam9Eup9Eio9VOt9Fyx9XOAyHWCyXeEyniFy3uHy2S19Wu49my59nK893a+933B94KOzoSPz4aR0ImU0YyW0o2Y0pCa05Kc1Juk2IHC94vI+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQ4GoQAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAAUVJREFUOE/tk+dSAkEQBuUDc0AUM5gYEQPmrIhZwfd/nnF2dva4O0L5APSf6drquq0dihH+J8NwIH3CeuXcLNAn3CUyC/QOX4hqpoHe4SlRwzQQC4vbJswVqujM3+hwdMINYMm0TVR3cxp41wMhCncAfJofEzXd3AQyP3rSCd/k7NWcyW7mFSDnLYRf8r1br8zPRIemi1FpYQYoexMO7GbHLLK+9GEOKKkoiW1PADNuajgKFNz0NIhOTB1jwJwMDSeBeTc9R0RtU4eECzKiq4sqDqKqmcM+GB4j5ao3fiI6MxWmgHEVC1uyni2vtfjN+dCFkD+kvFOj2JsLXQtnvpfS/bDXsTeXgGzLPAq5DKzLkG3/+gO37cy3aSzkNb068eblB5NEqDwSXZgmSYd7XX8WIx0S7ZulSIdX1UuzFOmwL8NwAMx/iUt7k3ML7XIAAAAASUVORK5CYII=)', 'font-size: 0px;']),
        CommandButton_Json: css(wcd('CommandButton_Json') + ' > div', ['width: 40px', 'height: 40px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEeIx0iIx0iJyEqKyEyLyU6NylGPy1SRzFWSzFeTzVmUzluWzl6Xz16Yz1+Z0GGa0GKb0WOc0med0Wad0mad02id0Wif02mf1Gmg1G6j1XGl1nSn13yt2n+u24Cv3ISy3Yaz3ouz24m134q234213Iu24I654ZC64Zi/5JrB5Z7E56DF56HG6KTI6abJ6qjL66rM66zN7K3O7LLR7rPS7rTT77vY8bzY8b3Z8sHb88Lc88Te9MXe9cfg9cjg9cnh9s7k+NDm+Nbq+9jr+9jr/Nns/Nvt/dzu/d7v/t7w/vD1+/D2+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxyKEAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAAQtJREFUOE/tzVtTwjAQhmGXghRRFEWM9VBARUUr4NlqJahE+LD//+fUzIQilabglTOO700ms8/sLgRz9lNI0x2pSVgI8T0qR6UefpRraqbSQz8qE6A/nJRJMCIT4aRMhv5wI5Qz4JfUw3FKaOG4Pw5F6Rzu7voFXu3i8QD2Hm5K/TjYoxNhFg6vYC/ukwNGXot00KMzuTldRd4CM+ptLXzPZy/hSm0tg22ZegivQM6dvLuTAzswq/HwTUKItRVOp9gsSlhfiocuNfovYnt1kLO6mQpYpZOKhQ0j8/xIlG7DISPLJYQVC70mh7htcbn7odkF7p/Ar+Vn+rSmf/i7UJUavZGUGMHZzQmD4BN6dkxmYJI/GgAAAABJRU5ErkJggg==)', 'font-size: 0px;']),
        CommandButton_Edit: css(wcd('CommandButton_Edit') + ' > div', ['width: 40px', 'height: 40px', 'background-repeat: no-repeat', 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEeIx12XzpjM/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJFqYYcAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAAFBJREFUOE/t0tEKABAMhWFm7//Ks0wpyZZMiq92of6LcyGQkUsYDSRMKs8Qsd3AQqhwC1F1RVhHC35D/QwMpmHnZPg3stc3KtxCgxLa7A6JMiLbhZUiAZRlAAAAAElFTkSuQmCC)', 'font-size: 0px;']),
        Intercept: css(wcd('Intercept'), ["border: 1px solid transparent"]),
        Intercept_Editing: css(wcd('Intercept_editing'), ["background: #CCEEFF", "border: 1px solid #98CCFD"]),
        Intercept_Selected: css(wcd('Intercept_selected'), ["border: 1px solid #AAA"]),
        Intercept_Focus: css(wcd('Intercept_focus'), ["border: 1px dashed #DDD"])
    };
    css('body, button, input, select, textarea', ['font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;',
        '-webkit-touch-callout: none', '-webkit-user-select: none', '-moz-user-select: none', '-ms-user-select: none', 'user-select: none'
    ]);
    css(styles.TabContainer, ['background: #DDD']);
    css('.' + classes.SidePanel + ' .' + styles.Tab + ':hover', 'border: 1px solid #AAA');
    css('.' + classes.SidePanel + ' .' + styles.Tab_Selected, ['border: 1px solid #999', 'border-radius: 3px']);
    css('.' + classes.DesktopRibbon + ' .' + styles.Tab_Normal, ['border: 1px solid transparent', 'border-bottom: 1px solid lightgrey']);
    css('.' + classes.DesktopRibbon + ' .' + styles.Tab_Selected, ['font-weight: bold', 'border-radius: 3px', 'border-top: 1px solid #DEDEDE', 'border-left: 1px solid #DEDEDE', 'border-right: 1px solid #DEDEDE', 'background: #DDD', 'background-image: linear-gradient(#EEE, #BBB)']);
    css('.' + classes.RibbonNavigator + ' > div', ['display: table', 'width: 100%']);
    css('.' + classes.RibbonNavigator + ' > div > div', ['display: table-cell', 'vertical-align: top']);
    css('.' + classes.RibbonNavigator + ' input', ['background: transparent', 'border: none', 'right: 0', 'width: 100%']);
    css('.' + classes.CommandButton_Enabled + ':hover', ['background: #BBB', 'background-image: linear-gradient(#CCC, #DDD)', 'border-radius: 3px;']);
    css('.' + classes.SourceEdit_Files + ' .' + styles.Tab_Selected, ['background: #DDD', 'background-image: linear-gradient(#DDD, #CCC)']);

    var __extends = (undefined && undefined.__extends) || (function () {
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
    var __assign$2 = (undefined && undefined.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
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
                    ["Edit", [CommandBar, { sections: [{ title: "Edit",
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
                this.setState({ editing: __assign$2(__assign$2({}, this.state.editing), { activeFiles: files, selectedFile: filename }) }, function () { return app.services.events.publish(events["Edit.Event"](_this.state.editing)); });
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
                    { className: this.props.className, style: __assign$2({ height: "0%" }, this.props.style) },
                    [[TabContainer,
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

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var UI_1 = createCommonjsModule(function (module, exports) {
    exports.__esModule = true;
    (function (UI) {
    })();
    });

    unwrapExports(UI_1);
    var UI_2 = UI_1.UI;

    var app_1 = createCommonjsModule(function (module, exports) {
    exports.__esModule = true;

    var app;
    (function (app) {
        app.UI = UI_1.UI;
        var LogLevel;
        (function (LogLevel) {
            LogLevel[LogLevel["None"] = 0] = "None";
            LogLevel[LogLevel["Exception"] = 1] = "Exception";
            LogLevel[LogLevel["Error"] = 2] = "Error";
            LogLevel[LogLevel["Warn"] = 3] = "Warn";
            LogLevel[LogLevel["Info"] = 4] = "Info";
            LogLevel[LogLevel["Trace"] = 5] = "Trace";
        })(LogLevel = app.LogLevel || (app.LogLevel = {}));
        var ModuleSystem;
        (function (ModuleSystem) {
            ModuleSystem["None"] = "none";
            ModuleSystem["CommonJS"] = "commonjs";
            ModuleSystem["AMD"] = "amd";
            ModuleSystem["UMD"] = "umd";
            ModuleSystem["ES"] = "es";
        })(ModuleSystem = app.ModuleSystem || (app.ModuleSystem = {}));
        var LicenseType;
        (function (LicenseType) {
            LicenseType[LicenseType["MIT"] = 0] = "MIT";
            LicenseType[LicenseType["GNU"] = 1] = "GNU";
        })(LicenseType = app.LicenseType || (app.LicenseType = {}));
    })(app = exports.app || (exports.app = {}));
    });

    unwrapExports(app_1);
    var app_2 = app_1.app;

    var webapp_1 = createCommonjsModule(function (module, exports) {
    exports.__esModule = true;
    var webapp;
    (function (webapp) {
        var browserType;
        (function (browserType) {
            browserType[browserType["Opera"] = 0] = "Opera";
            browserType[browserType["FireFox"] = 1] = "FireFox";
            browserType[browserType["Safari"] = 2] = "Safari";
            browserType[browserType["IE"] = 3] = "IE";
            browserType[browserType["Edge"] = 4] = "Edge";
            browserType[browserType["Chrome"] = 5] = "Chrome";
            browserType[browserType["Blink"] = 6] = "Blink";
            browserType[browserType["Unknown"] = 7] = "Unknown";
        })(browserType = webapp.browserType || (webapp.browserType = {}));
    })(webapp = exports.webapp || (exports.webapp = {}));
    });

    unwrapExports(webapp_1);
    var webapp_2 = webapp_1.webapp;

    var registry_1 = createCommonjsModule(function (module, exports) {
    exports.__esModule = true;
    var registry;
    (function (registry) {
        var itemType;
        (function (itemType) {
            itemType[itemType["Service"] = 0] = "Service";
            itemType[itemType["Component"] = 1] = "Component";
        })(itemType = registry.itemType || (registry.itemType = {}));
        var licenseType;
        (function (licenseType) {
            licenseType[licenseType["MIT"] = 0] = "MIT";
            licenseType[licenseType["GNU"] = 1] = "GNU";
        })(licenseType = registry.licenseType || (registry.licenseType = {}));
    })(registry = exports.registry || (exports.registry = {}));
    });

    unwrapExports(registry_1);
    var registry_2 = registry_1.registry;

    var dist = createCommonjsModule(function (module, exports) {
    exports.__esModule = true;



    var types;
    (function (types) {
        types.app = app_1.app;
        types.registry = registry_1.registry;
        types.webapp = webapp_1.webapp;
    })(types = exports.types || (exports.types = {}));
    exports["default"] = types;
    });

    unwrapExports(dist);
    var dist_1 = dist.types;

    var __assign$3 = (undefined && undefined.__assign) || function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var __rest$1 = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var CodeMirror = function transform(attr) {
        var _this = this;
        var settings = attr.settings, style = attr.style, className = attr.className, onChange = attr.onChange, props = __rest$1(attr, ["settings", "style", "className", "onChange"]);
        var init = function (e) {
            if (e) {
                _this.services.moduleSystem.register('../../lib/codemirror', '@cdnjs/codemirror/5.48.4/codemirror.js');
                if (JSON.stringify(settings) !== e.getAttribute("codemirror")) {
                    var existing_1 = e.getAttribute("codemirror") != null;
                    var resources = [_this.services.moduleSystem["import"]('@cdnjs/codemirror/5.48.4/codemirror.js'),
                        _this.services.moduleSystem["import"]('@cdnjs/codemirror/5.48.4/codemirror.css')
                    ];
                    if (settings.matchBrackets)
                        resources.push(_this.services.moduleSystem["import"]('@cdnjs/codemirror/5.48.4/addon/edit/matchbrackets.js'));
                    if (settings.closeBrackets)
                        resources.push(_this.services.moduleSystem["import"]('@cdnjs/codemirror/5.48.4/addon/edit/closebrackets.js'));
                    if (settings.continueComments)
                        resources.push(_this.services.moduleSystem["import"]('@cdnjs/codemirror/5.48.4/addon/comment/continuecomment.js'));
                    if (settings.comment)
                        resources.push(_this.services.moduleSystem["import"]('@cdnjs/codemirror/5.48.4/addon/comment/comment.js'));
                    Promise.all(resources).then(function (cm) {
                        var codemirror = cm[0]["default"] || cm[0];
                        if (!existing_1) {
                            var editor_1 = codemirror.fromTextArea(e, settings);
                            editor_1.on('change', function () { if (onChange)
                                onChange(editor_1.getValue()); });
                        }
                        else {
                            console.log(' TODO ?????');
                        }
                    });
                    e.setAttribute("codemirror", JSON.stringify(settings));
                }
            }
        };
        return ["div", { style: style, className: className }, [["textarea", __assign$3({ style: { height: "100%", width: "100%" }, ref: init, onChange: function (e) { if (attr.onChange)
                            attr.onChange(e.target.value); } }, props)]]];
    };

    var __extends$1 = (undefined && undefined.__extends) || (function () {
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
    var DesignerViewPort /*: fibre.UI.Component<any,any>*/ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends$1(DesignerViewPort, _super);
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
                app.services.events.subscribe(events["Ribbon.Event"](), this.ribbon_event);
                app.services.events.subscribe(events["Designer.Load"](), this.designer_load);
                app.services.events.subscribe(events["Designer.Select"](), this.designer_select);
                app.services.events.subscribe(events["Edit.Event"](), this.edit_event);
                app.services.events.subscribe(events["Intercept.Mounted"](), this.intercept_mounted);
            };
            DesignerViewPort.prototype.componentWillUnmount = function () {
                if (window === window.parent) {
                    app.services.events.unsubscribe({ type: "Navigation.Redirect" }, this.onRedirect);
                }
                app.services.events.unsubscribe(events["Ribbon.Event"](), this.ribbon_event);
                app.services.events.unsubscribe(events["Designer.Load"](), this.designer_load);
                app.services.events.unsubscribe(events["Designer.Select"](), this.designer_relay);
                app.services.events.unsubscribe(events["Edit.Event"](), this.edit_event);
                app.services.events.unsubscribe(events["Intercept.Mounted"](), this.intercept_mounted);
            };
            DesignerViewPort.prototype.load_file = function (target, file) {
                return new Promise(function (resolve, reject) {
                    return app.services.moduleSystem.fetch(file).then(function (res) {
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
                app.services.events.publish(events["Edit.Event"]({ activeFiles: files, viewSource: this.state.editMode === EditMode.Source, selectedFile: this.state.selectedIndex != undefined ? files[this.state.selectedIndex] : undefined }));
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
                    app.services.events.publish(events["Edit.Event"]({ activeFiles: files, viewSource: this.state.editMode === EditMode.Source, selectedFile: this.state.selectedIndex != undefined ? files[this.state.selectedIndex] : undefined }));
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
                if (app.info.browser === dist_1.webapp.browserType.IE) { // IE does not load another instance of a page with exactly the same name  
                    var ix = location.origin.length + 2;
                    src = src.substr(0, ix) + (src[ix].toUpperCase() == src[ix] ? src[ix].toLowerCase() : src[ix].toUpperCase()) + src.substr(ix + 1);
                }
                return _super.prototype.render.call(this, [["div",
                        { className: styles.Table + ' ' + styles.Fill, style: { display: "table", border: "1px solid #AAA" } },
                        [["iframe", { className: styles.TableRow + ' ' + styles.Fill, style: { background: "white", border: "0", resize: this.state.editMode === EditMode.Source ? "vertical" : "none" }, src: src, ref: function (e) { _this["iframe"] = e; } }],
                            this.state.editMode === EditMode.Source && selectedIndex > -1 && keys.length > 0 ? ["div",
                                { className: styles.TableRow, style: { height: "50%" } },
                                [[TabContainer,
                                        { tabs: keys, className: classes.SourceEdit_Files, selectedIndex: this.state.selectedIndex, onSelectedIndexChanged: this.onSelectedIndexChanged },
                                        keys.map(function (key, index) { return [CodeMirror, { className: styles.Fill, style: index == _this.state.selectedIndex ? {} : { display: 'none' }, value: _this.state.sources[key].content, settings: { matchBrackets: true, closeBrackets: true, continueComments: "Enter", lineNumbers: true, mode: "application/ld+json", lineWrapping: true, comment: true }, onChange: function (value) { return _this.onCodeChange(keys[selectedIndex], value); } }]; })]
                                ]
                            ] : null
                        ]
                    ]]);
            };
            return DesignerViewPort;
        }(app.services.UI.Component));
    };

    var __extends$2 = (undefined && undefined.__extends) || (function () {
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
    var classes$1 = {
        'SidePanel': css('.WebComponents_Designer_SidePanel', ['display: table-cell', 'vertical-align: top', 'height: 100%', 'overflow: auto', 'border: 1px solid transparent'])
    };
    var SidePanel /*: fibre.UI.Component<any,any>*/ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends$2(SidePanel, _super);
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
                    { className: classes$1.SidePanel, style: { width: width, height: height, resize: resize, direction: direction } },
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

    var __extends$3 = (undefined && undefined.__extends) || (function () {
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
    var DesktopDesigner /*: fibre.UI.Component*/ = function inject(app) {
        return /** @class */ (function (_super) {
            __extends$3(Designer, _super);
            function Designer(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { src: props.src, leftMenuIndex: -1, rightMenuIndex: -1 };
                _this.navigateTo = _this.navigateTo.bind(_this);
                //this.designer_Load = this.designer_Load.bind(this);
                // this.onMessage = this.onMessage.bind(this);
                document.body.style.position = "absolute";
                document.body.style.top = document.body.style.left = document.body.style.right = document.body.style.bottom = "0";
                document.body.style.overflow = "hidden";
                return _this;
            }
            Designer.prototype.componentDidMount = function () {
                document.body.style.margin = '0px';
                document.body.style.height = '100%';
            };
            Designer.prototype.navigateTo = function (url) {
                this.setState({ url: url });
            };
            Designer.prototype.render = function () {
                return _super.prototype.render.call(this, ["div", { style: { display: "table", width: "100%", height: "100%", backgroundColor: "#EEE", backgroundImage: "linear-gradient(#BBB, #F0F0F0)" } },
                    [[DesktopRibbon, { className: classes.DesktopRibbon, className_Tab: classes.DesktopRibbon_Tab }],
                        ["div", { style: { display: "table", width: "100%", height: "100%" } },
                            [[SidePanel, { name: "leftSidePanel", className: classes.SidePanel, placement: "left", tabs: [{ title: 'Explore', className: classes.Tab_Explore }] }],
                                ,
                                [DesignerViewPort, { style: { display: "table-cell", resize: "horizontal" } }],
                                [SidePanel, { name: "rightSidePanel", className: classes.SidePanel, placement: "right", tabs: [{ title: 'Properties', className: classes.Tab_Properties }] }]
                            ]
                        ],
                        ["div", { style: { display: "table-row", height: "0%" } }, [[SidePanel, { name: "bottomSidePanel", className: classes.SidePanel, placement: "bottom", tabs: ['Logs'] }]]]
                    ]
                ]
                /*[   "div", {style: {display:"table", height: "100%", width: "100%", backgroundColor: "#EEE", backgroundImage: "linear-gradient(#BBB, #F0F0F0)"}},
            
                [   [ DesktopRibbon, {className: styles.desktopRibbon} ]
                  , [ Layout.SplitContainer
                    , { direction: "column", defaults: [ {}, {size: 50, min: 50, max: 50}], style: {display: "table-cell"} }
                    , [ [ Layout.SplitContainer
                        , { direction: "row", defaults: [ {size: 350, min: 100, max: 500}, {}, {size: 350, min: 100, max: 500}]}
                        , [ [ Layout.TabContainer, {placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"]}, [ [ "div", {}, "------content------"] ] ]
                          , [ DesignerViewPort ]
                          , [ Layout.TabContainer, { placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"] }, [ [ "div", {}, "------content------"] ] ]
                          ]
                        ]
                        , [ "div", {style: { display: "table-row"}}, "Footer" ]
                      ]
                    ]
                ]
            ]*/
                /*
                       [ "div", {style:{display: "table", width: "100%", height: "100%" }}
                        ,   [   [ "div", {style: {display: "table-row", background: 'red', height: "10px" }}, 'Header']
                            ,   ["div", {style: {display: "table", width: "100%", height: "100%"}}
                                ,   [   [ "div", {style: {display: "table-cell", borderRight: "1px solid grey",padding: "20px",  width: "300px", resize: "horizontal", overflowY: "auto"}}, "Panel"]
                                    ,   [ "div", {style: {display: "table-cell", resize: "horizontal"}}, "center" ]
                                    ,   [ "div", {style: {display: "table-cell", borderLeft: "1px solid grey", padding: "20px",  width: "300px", resize: "horizontal", overflowY: "auto", direction: "rtl", textAlign: "left"}}, "Panel"]
                                    ]
                                ]
                            ,   [ "div", {style: {display: "table-row", background: 'red', height: "10px" }}, 'Footer']
                            ]
                        ]
                */
                );
            };
            return Designer;
        }(app.services.UI.Component));
    };

    var __extends$4 = (undefined && undefined.__extends) || (function () {
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
    var Intercept = function inject(app) {
        return /** @class */ (function (_super) {
            __extends$4(Intercept, _super);
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
                app.services.events.subscribe(events["Designer.Select"](), this.designer_select);
                app.services.events.subscribe(events["Edit.Event"](), this.edit_event);
                var topParent = window.parent;
                while (topParent.parent != null && topParent.parent !== topParent)
                    topParent = topParent.parent;
                app.services.events.publish(events["Intercept.Mounted"]({ file: this.props.file }), topParent);
            };
            Intercept.prototype.componentWillUnmount = function () {
                //window.removeEventListener("message", this.onMessage);
                app.services.events.unsubscribe(events["Designer.Select"](), this.designer_select);
                app.services.events.unsubscribe(events["Edit.Event"](), this.edit_event);
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
                obj[1].className = (obj[1].className ? obj[1].className + ' ' : '') + classes.Intercept + (this.state.focus && !this.state.selected && !this.state.editing ? ' ' + classes.Intercept_Focus : '') + (this.state.selected ? ' ' + classes.Intercept_Selected : '') + (this.state.editing ? ' ' + classes.Intercept_Editing : '');
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

    var __extends$5 = (undefined && undefined.__extends) || (function () {
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
    var DesignerFrame /*: fibre.UI.Component<any,any>*/ = function inject(app) {
        if (app.services.transformer.settings.parsers)
            app.services.transformer.settings.parsers[".app"] = function (transformer, context, obj, offset) {
                var obj2 = {};
                var keys = Object.keys(obj);
                keys.forEach(function (z) { return obj2[z == ".app" ? "main" : z] = obj[z]; });
                return "[\".App\", {" + app.services.transformer.process(obj2, context, true, true, offset) + "}]";
            };
        app.services.processor.unwrapDefault = function (obj) {
            if (typeof obj === "object" && typeof obj.__esModule === "string")
                return app.services.processor.processElement([Intercept, { file: obj.__esModule }, typeof obj["default"] === "string" ? obj["default"] : [obj["default"]]]);
            if (obj && obj["default"])
                obj = obj["default"];
            if (Array.isArray(obj)) {
                /*if (typeof obj[0] === "object" && typeof obj[0].__esModule === "string" && obj[0].default) {
                    let __esModule = obj[0].__esModule;
                    obj[0] = obj[0].default;
                    return app.services.processor.processElement([Intercept, {file: __esModule}, [obj]]);
                }*/
                if (typeof obj[2] === "object" && typeof obj[2].__esModule === "string" && obj[2]["default"]) {
                    obj[2] = [[Intercept, { file: obj[2].__esModule }, obj[2]["default"]]];
                }
                return obj.map(function (e) { return e && e["default"] ? e["default"] : e; });
            }
            return obj;
        };
        return /** @class */ (function (_super) {
            __extends$5(Designer, _super);
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
                app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
                //document.body.onclick = function () {debugger;};
            };
            Designer.prototype.window_click = function (ev) {
                app.services.events.publish({ type: "Designer.Intercept.Select", correlationId: Date.now().toString(), data: { editMode: false, canEdit: false } }, parent);
                //parent.postMessage({eventType: "select", correlationId: Date.now().toString()}, location.href); ev.returnValue = false; 
            };
            Designer.prototype.componentWillUnmount = function () {
                app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
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

    //alert( JSON.stringify(styles.default) );
    /*let Designer = (window.parent === window) ? DesktopDesigner : function transform(this:types.IAppLoaded, a:any, c:any) {
        let app = this;
        this.services.processor.init = (obj:{default:any, [index:string]:any}) => typeof obj.__esModule === "string" ? [Intercept, {file: obj.__esModule}, [obj.default]] : obj.default;
        return app.main;
    };*/
    var Designer = (window.parent === window) ? DesktopDesigner : DesignerFrame;

    var css$1 = '.flex {\ndisplay: -webkit-box;\ndisplay: -moz-box;\ndisplay: box;\ndisplay: -moz-flex;\ndisplay: flex;\n}', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css$1));

    var index$1 = /*#__PURE__*/Object.freeze({
        Designer: Designer,
        Layout: index
    });

    exports.CodeMirror = CodeMirror;
    exports.appfibre = index$1;

    return exports;

}({}));
//# sourceMappingURL=webcomponents-appfibre.js.map
