"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (r, options) => ({
    visitor: {
        ObjectProperty(path, state) {
            const visitor = {
                TemplateLiteral(path) {
                    if (path.parentPath.node.type === "ArrayExpression" && path.key === 0 && path.parentPath.container) {
                        var elements = [];
                        for (var e of path.parentPath.node.elements)
                            if (e !== null && e.type !== "SpreadElement")
                                elements.push(e);
                        elements[0] = r.types.callExpression(r.types.identifier("__e"), [r.types.identifier("this"), r.types.objectExpression([r.types.objectProperty(r.types.stringLiteral("parent"), r.types.identifier("this"))])]);
                        path.parentPath.replaceWith(r.types.callExpression(r.types.memberExpression(r.types.functionExpression(null, [], r.types.blockStatement([r.types.expressionStatement(r.types.assignmentExpression('=', r.types.memberExpression(r.types.identifier("this"), r.types.stringLiteral("arguments"), true), r.types.identifier("[...arguments]"))),
                            r.types.returnStatement(path.node)])), r.types.identifier('call')), elements));
                    }
                    else if (r.types.isArrayExpression(path.parentPath) && path.container) {
                        path.replaceWith(r.types.callExpression(r.types.memberExpression(r.types.functionExpression(null, [], r.types.blockStatement([r.types.returnStatement(path.node)])), r.types.identifier('apply')), [r.types.identifier("this"), r.types.memberExpression(r.types.identifier("this"), r.types.identifier("arguments"))]));
                    }
                },
                ObjectProperty(path) {
                    var commented = false;
                    if (r.types.isStringLiteral(path.node.key) && path.node.key.value.startsWith(".")) {
                        //console.log(cmd);
                        var expr;
                        if (path.node.key.value.startsWith(".."))
                            commented = true;
                        /*else if (path.node.key.value == ".")
                          expr = options.parsers["id"].parse.call(this, r, path, options.name);
                        else*/ if (options.parsers[path.node.key.value])
                            expr = options.parsers[path.node.key.value].call(this, r, path, options.name);
                        else
                            throw new Error("Unresolved plugin: " + path.node.key.value);
                        if (expr) {
                            if (path.parentPath.container) {
                                path.parentPath.replaceWith(expr);
                                path.parentPath.traverse(visitor); // run again on inner function to catch nested properties
                            }
                            else {
                                console.warn("container is falsy: " + path.node.value);
                            }
                        }
                        else if (commented)
                            path.parentPath.replaceWith(r.types.objectExpression([]));
                    }
                }
            };
            /*if (r.types.isStringLiteral(path.node.key) && path.node.key.value== "__name" && r.types.isObjectExpression(path.parent))
              name = path.get('value').node.value;
            else*/ if (r.types.isStringLiteral(path.node.key) && path.node.key.value == "__jst" && r.types.isObjectExpression(path.parent)) {
                options = state.opts;
                path.get('value').traverse(visitor);
            }
        }
    }
});
