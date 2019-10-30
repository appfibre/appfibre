var __assign = (this && this.__assign) || function () {
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
import Style from './Style';
var Table /*: fibre.UI.Component*/ = function transform(props, children) {
    Style(['.WebComponents_Layout_Table { display: table } ']);
    //let {fill, p} = props;
    return ['div', { className: 'WebComponents_Layout_Table' + (props.className ? ' ' + props.className : ''), props: props }, children];
};
var TableRow /*: fibre.UI.Component*/ = function transform(props, children) {
    Style(['.WebComponents_Layout_TableRow { display: table-row } ']);
    return ['div', __assign({ className: 'WebComponents_Layout_RTableow' + (props.className ? ' ' + props.className : '') }, props), children];
};
var TableCell /*: fibre.UI.Component*/ = function transform(props, children) {
    Style(['.WebComponents_Layout_TableCell { display: table-cell } ']);
    return ['div', __assign({ className: 'WebComponents_Layout_TableCell' + (props.className ? ' ' + props.className : '') }, props), children];
};
var TableColumn /*: fibre.UI.Component*/ = function transform(props, children) {
    Style(['.WebComponents_Layout_TableColumn { display: table-column } ']);
    return ['div', __assign({ className: 'WebComponents_Layout_TableColumn' + (props.className ? ' ' + props.className : '') }, props), children];
};
var TableColumn /*: fibre.UI.Component*/ = function transform(props, children) {
    Style(['.WebComponents_Layout_TableCell { display: table-cell } ']);
    return ['div', __assign({ className: 'WebComponents_Layout_TableColumn' + (props.className ? ' ' + props.className : '') }, props), children];
};
export { Table, TableRow, TableCell };
