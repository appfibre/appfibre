export declare module types {
    namespace jst {
    }
    namespace app {
        namespace UI {
            type Element<T = string, A extends {
                [key: string]: any;
            } = {}, C = undefined> = C | [T, A, (C | {
                [index: number]: Element<T, A, C>;
            })?];
        }
    }
    namespace webapp {
        enum browserType {
            "Opera" = 0,
            "FireFox" = 1,
            "Safari" = 2,
            "IE" = 3,
            "Edge" = 4,
            "Chrome" = 5,
            "Blink" = 6,
            "Unknown" = 7
        }
        namespace UI {
            type element = app.UI.Element<string | Function, {}, string> | Promise<app.UI.Element<string | Function, {}, string>>;
            interface HTMLTagMap {
                "a": ["a", Partial<HTMLAnchorElement>, (string | Array<element>)?];
                "abbr": ["abbr", Partial<HTMLElement>, (string | Array<element>)?];
                "address": ["address", Partial<HTMLElement>, (string | Array<element>)?];
                "applet": ["applet", Partial<HTMLAppletElement>];
                "area": ["area", Partial<HTMLAreaElement>, (string | Array<element>)?];
                "article": ["article", Partial<HTMLElement>, (string | Array<element>)?];
                "aside": ["aside", Partial<HTMLElement>, (string | Array<element>)?];
                "audio": ["audio", Partial<HTMLAudioElement>];
                "b": ["b", Partial<HTMLElement>, (string | Array<element>)?];
                "base": ["base", Partial<HTMLBaseElement>];
                "bdi": ["bdi", Partial<HTMLElement>, (string | Array<element>)?];
                "bdo": ["bdo", Partial<HTMLElement>, (string | Array<element>)?];
                "blockquote": ["blockquote", Partial<HTMLQuoteElement>, (string | Array<element>)?];
                "body": ["body", Partial<HTMLBodyElement>, (string | Array<element>)?];
                "br": ["br", Partial<HTMLBRElement>];
                "button": ["button", Partial<HTMLButtonElement>, (string | Array<Element>)?];
                "caption": ["caption", Partial<HTMLTableElement>, (string | Array<Element>)?];
                "cite": ["cite", Partial<HTMLElement>, (string | Array<Element>)?];
                "code": ["code", Partial<HTMLElement>, (string | Array<Element>)?];
                "col": ["col", Partial<HTMLTableColElement>];
                "colgroup": ["colgroup", Partial<HTMLTableColElement>, Array<HTMLTagMap["col"]>?];
                "data": ["data", Partial<HTMLDataElement>, (string | Array<Element>)?];
                "datalist": ["datalist", Partial<HTMLDataListElement>, (string | Array<HTMLTagMap["option"]>)?];
                "dd": ["dd", Partial<HTMLElement>, (string | Array<element>)?];
                "del": ["del", Partial<HTMLModElement>, (string | Array<element>)?];
                "details": ["details", Partial<HTMLDetailsElement>, (string | Array<element>)?];
                "dfn": ["dfn", Partial<HTMLElement>, (string | Array<phrasing>)?];
                "dialog": ["dialog", Partial<HTMLDialogElement>, (string | Array<element>)?];
                "div": ["div", Partial<HTMLDivElement>, (string | Array<element>)?];
                "dl": ["dl", Partial<HTMLDListElement>, (string | Array<HTMLTagMap["dt" | "dd" | "script" | "template" | "div"]>)?];
                "dt": ["dt", Partial<HTMLElement>, (string | Array<element>)?];
                "em": ["em", Partial<HTMLElement>, (string | Array<element>)?];
                "embed": ["embed", Partial<HTMLEmbedElement>];
                "fieldset": ["fieldset", Partial<HTMLFieldSetElement>, (string | Array<element>)?];
                "figcaption": ["figcaption", Partial<HTMLElement>, (string | Array<element>)?];
                "figure": ["figure", Partial<HTMLElement>, (string | Array<element>)?];
                "font": ["font", Partial<HTMLFontElement>, (string | Array<element>)?];
                "footer": ["footer", Partial<HTMLElement>, (string | Array<element>)?];
                "form": ["form", Partial<HTMLFormElement>, (string | Array<element>)?];
                "h1": ["h1", Partial<HTMLHeadingElement>, (string | Array<element>)?];
                "h2": ["h2", Partial<HTMLHeadingElement>, (string | Array<element>)?];
                "h3": ["h3", Partial<HTMLHeadingElement>, (string | Array<element>)?];
                "h4": ["h4", Partial<HTMLHeadingElement>, (string | Array<element>)?];
                "h5": ["h5", Partial<HTMLHeadingElement>, (string | Array<element>)?];
                "h6": ["h6", Partial<HTMLHeadingElement>, (string | Array<element>)?];
                "head": ["head", Partial<HTMLHeadElement>, Array<HTMLTagMap["script" | "base" | "table" | "title"]>?];
                "header": ["header", Partial<HTMLElement>, (string | Array<element>)?];
                "hgroup": ["hgroup", Partial<HTMLElement>, (string | Array<HTMLTagMap["h1" | "h2" | "h3" | "h4" | "h5" | "h6"]>)?];
                "hr": ["hr", Partial<HTMLHRElement>];
                "html": ["html", Partial<HTMLHtmlElement>, (string | Array<HTMLTagMap["head"]>)?];
                "i": ["i", Partial<HTMLElement>];
                "iframe": ["iframe", Partial<HTMLIFrameElement>, (string | Array<element>)?];
                "img": ["img", Partial<HTMLImageElement>, (string | Array<element>)?];
                "input": ["input", Partial<HTMLInputElement>, (string | Array<HTMLTagMap["datalist"]>)?];
                "ins": ["ins", Partial<HTMLModElement>, (string | Array<element>)?];
                "kbd": ["kbd", Partial<HTMLElement>, (string | Array<element>)?];
                "label": ["abbr", Partial<HTMLLabelElement>, (string | Array<element>)?];
                "li": ["abbr", Partial<HTMLElement>, (string | Array<element>)?];
                "main": ["main", Partial<HTMLElement>, (string | Array<element>)?];
                "option": ["option", Partial<HTMLOptionElement>];
                "script": ["script", Partial<HTMLScriptElement>];
                "summary": ["summary", Partial<HTMLElement>, (string | Array<element>)?];
                "table": ["table", Partial<HTMLTableElement>, Array<HTMLTagMap["caption" | "colgroup" | "thead" | "tbody" | "tr" | "tfoot"]>?];
                "tbody": ["tbody", Partial<HTMLTableSectionElement>, Array<HTMLTagMap["th"]>?];
                "td": ["td", Partial<HTMLTableDataCellElement>, (string | Array<element>)?];
                "template": ["abbr", Partial<HTMLTemplateElement>, (string | Array<element>)?];
                "tfoot": ["tfoot", Partial<HTMLTableSectionElement>, Array<HTMLTagMap["th"]>?];
                "th": ["th", Partial<HTMLTableHeaderCellElement>, Array<HTMLTagMap["tr"]>?];
                "thead": ["thead", Partial<HTMLTableSectionElement>, Array<HTMLTagMap["th"]>?];
                "title": ["title", Partial<HTMLTitleElement>, (string | Array<element>)?];
                "tr": ["tr", Partial<HTMLTableRowElement>, Array<HTMLTagMap["td"]>?];
            }
            type html<K extends keyof HTMLTagMap> = HTMLTagMap[K];
            type head = HTMLTagMap["head"];
            type body = HTMLTagMap["body"];
            type table = HTMLTagMap["table"];
            type phrasing = HTMLTagMap["abbr" | "audio" | "b" | "bdo" | "br" | "button" | "cite" | "code" | "data" | "datalist" | "em" | "embed"];
        }
    }
    enum LogLevel {
        "None" = 0,
        "Exception" = 1,
        "Error" = 2,
        "Warn" = 3,
        "Info" = 4,
        "Trace" = 5
    }
    enum ModuleSystem {
        None = "none",
        CommonJS = "commonjs",
        AMD = "amd",
        UMD = "umd",
        ES = "es"
    }
}
export default types;
//# sourceMappingURL=index copy.d.ts.map