const _cache : Array<string> = [];

export default function Style (css?:string|string[]) {
    var head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
    style.type = 'text/css';
    if (Array.isArray(css)) {
        css = css.filter(c => _cache.indexOf(c) == -1).map(c => { _cache.push(c); return c}).join(';');
    } else if (css && _cache.indexOf(css) == -1) {
        _cache.push(css);
    } else css = '';
    if (css.length > 0) {
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }
    return css;    
}

export function css(name:string, body?:string|Array<string>) {
    if (body && body.length > 0) 
        Style(`${name} {${Array.isArray(body) ? body.join(';') : body}}`);
    if (name[0] == '.') {
        var s = new RegExp(/[,.> ]/).exec(name.substr(1));
        return name.substring(1, s && s.length > 0 ? s.index+1 : name.length);
    }
    return '';
}