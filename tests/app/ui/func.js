"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test = function inject(app) {
    return class extends app.services.UI.Component {
        render() {
            return app.services.UI.processElement(["div", null, this.props.children]);
        }
    };
};
exports.Test = Test;
const Transform = function transform(t, a, c) {
    return ["div", a, c];
};
exports.Transform = Transform;
const Children = function transform(c) {
    return c;
};
exports.Children = Children;
const TransformOwn = function transform(a, c) {
    a = a || {};
    return ["a",
        a,
        [["span", { "area-hidden": "true", "key": 1 }], ["span", { "area-hidden": "true", "key": 2 }]]
    ];
};
exports.TransformOwn = TransformOwn;
