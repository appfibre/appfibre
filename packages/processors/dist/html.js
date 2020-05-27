"use strict";
exports.__esModule = true;
exports.html = void 0;
function html(jst, _transformer, _tc, _context) {
    function formatHtmlAttributeValue(jst) {
        switch (typeof jst) {
            case 'string':
                return jst;
            case 'boolean':
                return jst.toString();
            case 'object':
                return Object.keys(jst).map(function (k) { return k + ': ' + jst[k]; }).join('; ');
            default:
                throw new Error("Unsupported attribute type");
        }
    }
    function processHtmlAttributes(jst) {
        if (typeof jst == 'object')
            return Object.keys(jst).map(function (k) { return k + '="' + formatHtmlAttributeValue(jst[k]) + '"'; }).join(' ');
        else if (jst)
            throw new Error("Unexpected attributes tag (must be of type object). Received: " + JSON.stringify(jst));
        else
            return '';
    }
    function processHtml(jst) {
        var _this = this;
        if (jst === null || typeof jst === 'string' || this.format == "html" || this.format == "xml")
            return { format: "html", output: jst };
        if (this.depth % 2 == 1) // Array of ...
         {
            if (Array.isArray(jst)) {
                //console.log({format: "html", output: jst.map(e => processHtml.call({depth: this.depth+1, format: this.format/*, indent: this.indent*/ }, e).output).join('\n')});
                return { format: "html", output: jst.map(function (e) { return processHtml.call({ depth: _this.depth + 1, format: _this.format /*, indent: this.indent*/, et: _this.et, esc: _this.esc }, e).output; }).join('\n') };
            }
            else
                throw new Error("Unexpected html element - Expected array of elements: received: " + JSON.stringify(jst));
        }
        else if (Array.isArray(jst)) {
            var innerHtml = jst[2] ? processHtml.call({ format: this.format, depth: this.depth + 1 /*, indent: this.indent*/, et: this.et, esc: this.esc }, jst[2]) : null;
            //console.log({ format: "xml", output: new Array(this.depth*4/*this.indent*/).join(' ') + "<" + jst[0] + ' ' + processHtmlAttributes.call(this, jst[1]) + (innerHtml && innerHtml.output ? ">" + innerHtml.output + "</" + jst[0] + ">" : " />\n" ) });
            return { format: "xml", output: new Array(this.depth * 4 /*this.indent*/).join(' ') + "<" + jst[0] + ' ' + processHtmlAttributes.call(this, jst[1]) + (innerHtml && innerHtml.output ? ">" + innerHtml.output + "</" + jst[0] + ">" : " />\n") };
        }
        else
            throw new Error("Unexpected html element.  Content element must either be a string or Array[3]. Received: " + JSON.stringify(jst));
    }
    //return {"format": "json", "output": JSON.stringify(Object.keys(jst)[0])};
    return processHtml.call({ format: "json", depth: 0, esc: false, et: false }, jst[Object.keys(jst)[0] /*TODO: this needs to be the name of the parser, e.g. .htm or .html */]);
}
exports.html = html;
