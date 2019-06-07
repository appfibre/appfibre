import * as types from "../types";

declare class Promise<T>  {
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
  
let BaseComponent = function inject<P, S>(app:types.IAppLoaded):types.Constructable<types.IComponent<any, any>> {
    return class BaseComponent<P, S> extends app.services.UI.Component implements types.IComponent<P,S> {
        props:P&{children?:any}
        state:S|undefined

        constructor(props:P) {
            super(app);
            this.props = props;
        }

        renderInternal(e:types.element|types.promisedElement|undefined, index?:number) : any {
            //if (e) e = types.services.intercept(e);
            if (Array.isArray(e)) {
                //if (Promise.resolve(e[0]) === e[0]) debugger;
                /*if (e[1] == null) e[1] = {};
                if (typeof e[1] === "object") e[1].context = this.context;*/
                if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, index);
                else {
                    return e.map((c, idx) => { if (Array.isArray(c)) { if (!c[1]) c[1] = {}; c[1]["key"] = c[1]["key"]||idx;} return this.renderInternal(c, idx); });
                }
            } //else if (typeof e !== "string")
                //debugger;
            //if (!e) debugger;
            
            return !e || typeof e === "string" ? e : app.services.processor.processElement(e, index) ;
        }

        render(e?:types.element|types.promisedElement) : any {
            return this.renderInternal(e || this.props.children);
        }
    }
}

export { BaseComponent }
