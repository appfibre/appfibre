"use strict";
exports.__esModule = true;
exports.css = void 0;
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
exports["default"] = Style;
function css(name, body) {
    if (body && body.length > 0)
        Style(name + " {" + (Array.isArray(body) ? body.join(';') : body) + "}");
    if (name[0] == '.') {
        var s = new RegExp(/[,.> ]/).exec(name.substr(1));
        return name.substring(1, s && s.length > 0 ? s.index + 1 : name.length);
    }
    return '';
}
exports.css = css;
