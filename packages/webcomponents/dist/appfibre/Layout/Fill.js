import observeResize from './ObserveResize';
;
//let Fill = ({ children } : { children:Array<object> }) => [children.map(x => x)];
var Fill = function transform(a, children) {
    function resize() {
    }
    function onref(e, index) {
        //if (index === undefined) {
        console.log(index);
        observeResize(e, function (element) {
            console.log('new size: ', {
                width: element.clientWidth,
                height: element.clientHeight
            });
        });
        //}
    }
    if (!a)
        a = { index: 0 };
    if (!a.style)
        a.style = { height: "100%" };
    else
        a.style.height = "100%";
    return ["div", { style: a.style, ref: onref }, children.map(function (c, i) {
            return ["div", { ref: function (e) { return onref(e, i); } }, [c]];
        })];
};
export { Fill };
