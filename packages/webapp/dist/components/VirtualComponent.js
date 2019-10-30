"use strict";
exports.__esModule = true;
var VirtualComponent = /** @class */ (function () {
    function VirtualComponent(type, props, document, context) {
        var _this = this;
        this.props = props;
        this.context = context;
        this.document = document;
        if (typeof type === "function") {
            if (type.prototype && type.prototype.render) {
                this.type = new type(props, context);
                this.construct.call(this.type, props, context);
            }
            else {
                this.type = { props: props, context: context, render: function () { return type(_this.props, _this.context); }, update: this.update };
                return this.construct.call(this.type, props, context);
            }
            if (typeof this.type === "object" && this.type.setState) {
                this.setState = this.setState.bind(this);
                var setState_1 = this.type.setState;
                this.type.setState = function (fn, callback) { return _this.setState(setState_1, fn, callback); };
            }
        }
        else
            this.type = type;
    }
    VirtualComponent.prototype.construct = function (props, context) {
        this.props = props;
        this.context = context;
        return this;
    };
    VirtualComponent.prototype.setState = function (inner, fn, callback) {
        inner.call(this.type, fn, callback);
        if (this.element && this.element.parentElement) {
            this.element = this.element.parentElement.replaceChild(this.renderElement(this.render()), this.element);
        }
    };
    ;
    VirtualComponent.prototype.renderElement = function (element) {
        if (!element || typeof element === "string")
            return this.document.createTextNode(element || "");
        if (element.tagName)
            return element;
        else if (element.textContent)
            return element;
        else
            return this.renderElement(element.render());
    };
    VirtualComponent.prototype.render = function () {
        var _this = this;
        debugger;
        if (this.type === "textarea")
            debugger;
        if (typeof this.type === "string") {
            var element_1 = this.document.createElement(this.type);
            this.element = this.element || element_1;
            if (this.props)
                Object.keys(this.props).forEach(function (key) {
                    //if (key === "onChange") debugger;
                    if (key == "style") {
                        Object.keys(_this.props.style).forEach(function (skey) {
                            element_1.style.setProperty(skey, _this.props.style[skey]);
                        });
                    }
                    else if (key != "key" && key != "children")
                        element_1.setAttribute(key === "className" ? "class" : key.toLowerCase(), _this.props[key]);
                });
            if (typeof this.props.children === "string")
                element_1.textContent = this.props.children;
            else if (Array.isArray(this.props.children)) {
                //new ComponentManager(children).renderAll(el);
                this.props.children.forEach(function (child) { element_1.appendChild(_this.renderElement(child.render())); });
                /*this.props.children.forEach(child => {
                    if (child) {
                        if ((<Element>child).nodeType) {
                            element.appendChild(<Element>child);
                        }
                        else {
                            //element.appendChild(this.renderInternal(el, c));
                            //let c = <Component<any,any>>child;
                           debugger;
                           //element.appendChild(this.renderInternal(c.render()));
                        }
                    } else debugger;
                });*/
            }
            return element_1;
        }
        else if (typeof this.type === "object") {
            return this.renderElement(this.type.render());
            /*let element:HTMLElement|Text|undefined = undefined;
            let e = this.type.render();
            if (!e || typeof e === "string")
                element = this.document.createTextNode(e||"");
            else if (Array.isArray(e)) {
                element = this.document.createElement("div");
                e.forEach(c => { if (element) {
                    element.appendChild(c);
                }});
            } else if (e instanceof HTMLCollection) {
                element = this.document.createElement("div");
                for (var i = 0; i < e.length; i++)
                    element.appendChild(e[i]);
            }
            else if (e instanceof HTMLElement)
                element = e;
            else
                debugger;

            if (!this.element)
                this.element = element;
            if (element) return element;*/
        }
        throw new Error("Tag " + this.type + " not supported");
    };
    VirtualComponent.prototype.update = function (parent) {
        var cv = this.render();
        if (typeof cv === "string")
            parent.textContent = cv;
        else
            parent.appendChild(cv);
        return cv;
    };
    return VirtualComponent;
}());
exports.VirtualComponent = VirtualComponent;
