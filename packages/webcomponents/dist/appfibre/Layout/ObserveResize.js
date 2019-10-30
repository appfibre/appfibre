var CSS = "position:relative;left:0;top:0;height:100%;right:00;margin:1px 0 0;border:1px blue soid;opacity:100;pointer-events:none;";
export default (function (element, handler) {
    var frame = document.createElement('iframe');
    var supportsPE = true; //(<any>document).documentMode < 11 && 'pointerEvents' in frame.style;
    frame.style.cssText = "" + CSS + (supportsPE ? '' : 'visibility:hidden;');
    frame.onload = function () {
        if (frame.contentWindow)
            frame.contentWindow.onresize = function () {
                handler(element);
            };
    };
    element.appendChild(frame);
    return frame;
});
