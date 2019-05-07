define([  './codemirror/lib/codemirror.js'
        , './codemirror/lib/codemirror.css'
        , './codemirror/addon/edit/matchbrackets.js'
        , './codemirror/addon/comment/continuecomment.js'
        , './codemirror/addon/comment/comment.js'
       ], function(CodeMirror) {
        
    return function Component (base) {
        /*testing
        return  { "constructor": function (b) { this.state = { ref: this["init"], value: 123}; this.onChange = this.onChange.bind(this); / *debugger; this.setState = this.setState.bind(b);* / }
                , "init": function(txt) { if (txt) base["editor"] = CodeMirror.fromTextArea(txt, base.props.settings);}
                , "onChange": function (e) { this.setState({value: e.target.value}); }
                , "render": function() { return base.render(["div", {}, [base.render(["textarea", {onChange: this.onChange, value: this.state.value}, this.props.children]),base.render(["textarea", {onChange: this.onChange, value: this.state.value}, this.props.children])]]);}
                , "componentWillUnmount": function() { if (base["editor"]) base["editor"].toTextArea(); }
                };
        */
       return  { "constructor": function (b) { this.state = { ref: this["init"], value: 123}; this.onChange = this.onChange.bind(this); }
                , "init": function(txt) { if (txt) base["editor"] = CodeMirror.fromTextArea(txt, base.props.settings);}
                , "onChange": function (e) { this.setState({value: e.target.value}); }
                , "render": function() { return base.render(["textarea", this.state, this.props.children]);}
                , "componentWillUnmount": function() { if (base["editor"]) base["editor"].toTextArea(); }
                };
    }
});