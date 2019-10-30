'use strict';

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
var CodeMirror = function transform(attr) {
    var _this = this;
    var settings = attr.settings, style = attr.style, className = attr.className, onChange = attr.onChange, props = __rest(attr, ["settings", "style", "className", "onChange"]);
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
    return ["div", { style: style, className: className }, [["textarea", __assign({ style: { height: "100%", width: "100%" }, ref: init, onChange: function (e) { if (attr.onChange)
                        attr.onChange(e.target.value); } }, props)]]];
};

module.exports = CodeMirror;
//# sourceMappingURL=webcomponents-codemirror.cjs.js.map
