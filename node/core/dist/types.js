"use strict";
exports.__esModule = true;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Exception"] = 1] = "Exception";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var ModuleSystem;
(function (ModuleSystem) {
    ModuleSystem["None"] = "none";
    ModuleSystem["CommonJS"] = "commonjs";
    ModuleSystem["AMD"] = "amd";
    ModuleSystem["UMD"] = "umd";
    ModuleSystem["ES"] = "es";
})(ModuleSystem = exports.ModuleSystem || (exports.ModuleSystem = {}));
/*function h(
    node: string,
    params: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
    ...children: ComponentChildren[]
): VNode<any>;
function h<P>(
    node: ComponentFactory<P>,
    params: Attributes & P | null,
    ...children: ComponentChildren[]
): VNode<any>;

function render(node: ComponentChild, parent: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
function rerender(): void;
function cloneElement(element: JSX.Element, props: any, ...children: ComponentChildren[]): JSX.Element;

var options: {
    syncComponentUpdates?: boolean;
    debounceRendering?: (render: () => void) => void;
    vnode?: (vnode: VNode<any>) => void;
    event?: (event: Event) => Event;
};*/
