import {UI} from '../app/UI'

export namespace UI {

    export type element     = UI.Element<string|Function, {}, string>|Promise<UI.Element<string|Function, {}, string>>;

    export interface HTMLTagMap {
      "a": ["a", Partial<HTMLAnchorElement>, (string|Array<element>)?]
      "abbr": ["abbr", Partial<HTMLElement>, (string|Array<element>)?]
      "address": ["address", Partial<HTMLElement>, (string|Array<element>)?]
      "applet": ["applet", Partial<HTMLAppletElement>]
      "area": ["area", Partial<HTMLAreaElement>, (string|Array<element>)?]
      "article": ["article", Partial<HTMLElement>, (string|Array<element>)?]
      "aside": ["aside", Partial<HTMLElement>, (string|Array<element>)?]
      "audio": ["audio", Partial<HTMLAudioElement>]
      "b": ["b", Partial<HTMLElement>, (string|Array<element>)?]
      "base": ["base", Partial<HTMLBaseElement>]
      //deprecated "basefont": HTMLBaseFontElement;
      "bdi": ["bdi", Partial<HTMLElement>, (string|Array<element>)?]
      "bdo": ["bdo", Partial<HTMLElement>, (string|Array<element>)?]
      "blockquote": ["blockquote", Partial<HTMLQuoteElement>, (string|Array<element>)?]
      "body": ["body", Partial<HTMLBodyElement>, (string|Array<element/*HTMLTagMap["a"|"address"|"applet"|"area"|"article"|"aside"|"audio"|"b"|"bdi"|"bdo"|"blockquote"|"br"|
                                                                         "button"|"cite"|"code"|"data"|"dl"|"div"|"del"|"details"|"dfn"|"em"|"dialog"|"embed"|"fieldset"|
                                                                         "figure"|"font"|"footer"|   "input"|"ins"|"script"|"table"|"template"]*/>)?];
      "br": ["br", Partial<HTMLBRElement>]
      "button": ["button", Partial<HTMLButtonElement>, (string|Array<Element>)?]
      //how to implement? "canvas": HTMLCanvasElement;
      "caption": ["caption", Partial<HTMLTableElement>, (string|Array<Element>)?]
      "cite": ["cite", Partial<HTMLElement>, (string|Array<Element>)?]
      "code": ["code", Partial<HTMLElement>, (string|Array<Element>)?]
      "col": ["col", Partial<HTMLTableColElement>]
      "colgroup": ["colgroup", Partial<HTMLTableColElement>, Array<HTMLTagMap["col"]>?]
      "data": ["data", Partial<HTMLDataElement>, (string|Array<Element>)?]
      "datalist": ["datalist", Partial<HTMLDataListElement>, (string|Array<HTMLTagMap["option"]>)?]
      "dd": ["dd", Partial<HTMLElement>, (string|Array<element>)?]
      "del": ["del", Partial<HTMLModElement>, (string|Array<element>)?]
      "details": ["details", Partial<HTMLDetailsElement>, (string|Array<element>)?]
      "dfn": ["dfn", Partial<HTMLElement>, (string|Array<phrasing>)?] 
      "dialog": ["dialog", Partial<HTMLDialogElement>, (string|Array<element>)?];
      //deprecated "dir": HTMLDirectoryElement;
      "div": ["div", Partial<HTMLDivElement>, (string|Array<element>)?]
      "dl": ["dl", Partial<HTMLDListElement>, (string|Array<HTMLTagMap["dt"|"dd"|"script"|"template"|"div"]>)?]
      "dt": ["dt", Partial<HTMLElement>, (string|Array<element>)?]
      "em": ["em", Partial<HTMLElement>, (string|Array<element>)?]
      "embed": ["embed", Partial<HTMLEmbedElement>]
      "fieldset": ["fieldset", Partial<HTMLFieldSetElement>, (string|Array<element>)?]
      "figcaption": ["figcaption", Partial<HTMLElement>, (string|Array<element>)?] // parent must be figure
      "figure": ["figure", Partial<HTMLElement>, (string|Array<element>)?] 
      "font": ["font", Partial<HTMLFontElement>, (string|Array<element>)?]
      "footer": ["footer", Partial<HTMLElement>, (string|Array<element>)?]
      "form": ["form", Partial<HTMLFormElement>, (string|Array<element>)?]
      //deprecated "frame": ["frame", Partial<HTMLFrameElement>, (string|Array<element>)?]
      //deprecated "frameset": HTMLFrameSetElement;
      "h1": ["h1", Partial<HTMLHeadingElement>, (string|Array<element>)?];
      "h2": ["h2", Partial<HTMLHeadingElement>, (string|Array<element>)?];
      "h3": ["h3", Partial<HTMLHeadingElement>, (string|Array<element>)?];
      "h4": ["h4", Partial<HTMLHeadingElement>, (string|Array<element>)?];
      "h5": ["h5", Partial<HTMLHeadingElement>, (string|Array<element>)?];
      "h6": ["h6", Partial<HTMLHeadingElement>, (string|Array<element>)?];
      "head": ["head", Partial<HTMLHeadElement>, Array<HTMLTagMap["script"|"base"|"table"|"title"]>?];
      "header": ["header", Partial<HTMLElement>, (string|Array<element>)?]
      "hgroup": ["hgroup", Partial<HTMLElement>, (string|Array<HTMLTagMap["h1"|"h2"|"h3"|"h4"|"h5"|"h6"]>)?]
      "hr": ["hr", Partial<HTMLHRElement>]
      "html": ["html", Partial<HTMLHtmlElement>, (string|Array<HTMLTagMap["head"]>)?]
      "i": ["i", Partial<HTMLElement>]
      "iframe": ["iframe", Partial<HTMLIFrameElement>, (string|Array<element>)?]
      "img": ["img", Partial<HTMLImageElement>, (string|Array<element>)?]
      "input": ["input", Partial<HTMLInputElement>, (string|Array<HTMLTagMap["datalist"]>)?]
      "ins": ["ins", Partial<HTMLModElement>, (string|Array<element>)?]
      "kbd": ["kbd", Partial<HTMLElement>, (string|Array<element>)?] //phrasing
      "label": ["abbr", Partial<HTMLLabelElement>, (string|Array<element>)?]
      //"legend": HTMLLegendElement;
      "li": ["abbr", Partial<HTMLElement>, (string|Array<element>)?]
      //"link": HTMLLinkElement;
      "main": ["main", Partial<HTMLElement>, (string|Array<element>)?]
      //"map": HTMLMapElement;
      //"mark": HTMLElement;
      //"marquee": HTMLMarqueeElement;
      //math (MathML)
      //"menu": HTMLMenuElement;
      //"meta": HTMLMetaElement;
      //"meter": HTMLMeterElement;
      //"nav": HTMLElement;
      //"noscript": HTMLElement;
      //"object": HTMLObjectElement;
      //"ol": HTMLOListElement;
      //"optgroup": HTMLOptGroupElement;
      "option": ["option", Partial<HTMLOptionElement>];
      //"output": HTMLOutputElement;
      //"p": HTMLParagraphElement;
      //"param": HTMLParamElement;
      //"picture": HTMLPictureElement;
      //"pre": HTMLPreElement;
      //"progress": HTMLProgressElement;
      //"q": HTMLQuoteElement;
      //"rp": HTMLElement;
      //"rt": HTMLElement;
      //"ruby": HTMLElement;
      //"s": HTMLElement;
      //"samp": HTMLElement;
      "script": ["script", Partial<HTMLScriptElement>];
      //"section": HTMLElement;
      //"select": HTMLSelectElement;
      //"slot": HTMLSlotElement;
      //"small": HTMLElement;
      //"source": HTMLSourceElement;
      //"span": HTMLSpanElement;
      //"strong": HTMLElement;
      //"style": HTMLStyleElement;
      //"sub": HTMLElement;
      "summary": ["summary", Partial<HTMLElement>, (string|Array<element>)?] // parent must be ["details"]
      //"sup": HTMLElement;
      "table": ["table", Partial<HTMLTableElement>, Array<HTMLTagMap["caption"|"colgroup"|"thead"|"tbody"|"tr"|"tfoot"]>?] // need to consider order:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
      "tbody": ["tbody", Partial<HTMLTableSectionElement>, Array<HTMLTagMap["th"]>?]
      "td": ["td", Partial<HTMLTableDataCellElement>, (string|Array<element>)?]
      "template": ["abbr", Partial<HTMLTemplateElement>, (string|Array<element>)?];
      //"textarea": HTMLTextAreaElement;
      "tfoot": ["tfoot", Partial<HTMLTableSectionElement>, Array<HTMLTagMap["th"]>?]
      "th": ["th", Partial<HTMLTableHeaderCellElement>, Array<HTMLTagMap["tr"]>?]
      "thead": ["thead", Partial<HTMLTableSectionElement>, Array<HTMLTagMap["th"]>?]
      //"time": HTMLTimeElement;
      "title": ["title", Partial<HTMLTitleElement>, (string|Array<element>)?]
      "tr": ["tr", Partial<HTMLTableRowElement>, Array<HTMLTagMap["td"]>?]
      //"track": HTMLTrackElement;
      //"u": HTMLElement;
      //"ul": HTMLUListElement;
      //"var": HTMLElement;
      //"video": HTMLVideoElement;
      //"wbr": HTMLElement;
  }
  

    //export type htmlElement<K extends keyof HTMLElementTagNameMap> = [ K, Partial<HTMLElementTagNameMap[K]>, Array<any> ] 
    export type html<K extends keyof HTMLTagMap> = HTMLTagMap[K];
    export type head = HTMLTagMap["head"];
    export type body = HTMLTagMap["body"];
    export type table = HTMLTagMap["table"];
    export type phrasing = HTMLTagMap["abbr"|"audio"|"b"|"bdo"|"br"|"button"/*|"canvas"*/|"cite"|"code"|"data"|"datalist"|"em"|"embed"]
    /*
    Elements belonging to this category are <abbr>, <audio>, <b>, <bdo>, <br>, <button>, <canvas>, <cite>, <code>, <command>
    , <data>, <datalist>, <dfn>, <em>, <embed>, <i>, <iframe>, <img>, <input>, <kbd>, <keygen>, <label>, <mark>, <math>, <meter>, <noscript>, <object>, <output>, <picture>, <progress>, <q>, <ruby>, <samp>, <script>, <select>, <small>, <span>, <strong>, <sub>, <sup>, <svg>, <textarea>, <time>, <var>, <video>, <wbr> 
    and plain text (not only consisting of white spaces characters).
    */
}


