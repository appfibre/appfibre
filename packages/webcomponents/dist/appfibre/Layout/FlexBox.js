"use strict";
exports.__esModule = true;
exports.FlexItem = exports.Flex = void 0;
var Flex = function transform(tag, a, c) {
    a.className = "flex";
    return [tag, a, c];
};
exports.Flex = Flex;
var FlexItem = function transform(tag, a, c) {
    return [tag, a, c];
};
exports.FlexItem = FlexItem;
