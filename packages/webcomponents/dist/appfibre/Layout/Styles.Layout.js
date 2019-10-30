var _cache = [];
export default function (css) {
    var head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
    style.type = 'text/css';
    if (Array.isArray(css)) {
        css = css.filter(function (c) { return _cache.indexOf(c) == -1; }).map(function (c) { _cache.push(c); return c; }).join(';');
    }
    else if (_cache.indexOf(css) == -1) {
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
