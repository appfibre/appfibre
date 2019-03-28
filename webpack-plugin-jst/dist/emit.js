"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ types: t }, args) => ({
    //var t = _ref.types;
    visitor: {
        ObjectProperty(path) {
            if (t.isStringLiteral(path.node.key) && path.node.key.value == "__jst" && t.isObjectExpression(path.parent) && t.isExportDefaultDeclaration(path.parentPath.parent)) {
                if (path.node.value.type === "ObjectExpression") { // export {"a" : "b", ...}
                    var vars = [];
                    vars.push(t.variableDeclarator(t.identifier("__jst"), t.stringLiteral(args.name || '')));
                    for (var prop of path.node.value.properties)
                        if (prop.type === "ObjectProperty" && (prop.value.type !== "ArrayPattern" && prop.value.type !== "AssignmentPattern" && prop.value.type != "RestElement" && prop.value.type != "ObjectPattern"))
                            vars.push(t.variableDeclarator(t.identifier(t.isStringLiteral(prop.key) ? prop.key.value : prop.key.name), prop.value));
                        else
                            throw new Error(`Unsupported property type ${prop.type} ${prop.type === "ObjectProperty" ? prop.value.type : ''}`);
                    path.parentPath.parentPath.replaceWith(t.exportNamedDeclaration(t.variableDeclaration("var", vars), []));
                }
                else if (path.node.value.type === "ArrayExpression" || path.node.value.type === "CallExpression") { // export default []
                    path.parentPath.parentPath.replaceWith(t.exportDefaultDeclaration(path.node.value));
                    path.parentPath.parentPath.insertBefore(t.exportNamedDeclaration(t.variableDeclaration("var", [t.variableDeclarator(t.identifier("__jst"), t.stringLiteral(args.name || ''))]), []));
                } //else throw new Error(`Unexpected node type emmitting ${path.node.value.type}`);
            }
        }
    }
});
