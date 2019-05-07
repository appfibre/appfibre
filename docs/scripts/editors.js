define(['./codemirror.js'], function(codemirror) {
debugger;
    return {
        codemirror: function transform(a, c) {
            return ["textarea", a, c];
        },

        jst: function transform() {
            return ["div", null, "jst"];
        }
    }
})