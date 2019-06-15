var Flex = function transform(tag, a, c) {
    a.className = "flex";
    return [tag, a, c];
};
var FlexItem = function transform(tag, a, c) {
    return [tag, a, c];
};
export { Flex, FlexItem };
