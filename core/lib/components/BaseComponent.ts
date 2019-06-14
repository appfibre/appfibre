import appfibre from "@appfibre/types"
/*import { Promise } from "../types"; // Compatibility with ES3
declare class Promise<T>  {
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}*/
  
let BaseComponent = function inject<P, S>(app:appfibre.app.IAppLoaded) {
    return class BaseComponent extends app.services.UI.Component<P, S> /*implements types.Component<P,S>*/ {
        props:P&{children?:any}
        //state:S

        constructor(props:P, context:any) {
            super(props, context);
            this.props = props;
        }

        renderInternal(e:appfibre.app.element|appfibre.app.promisedElement|undefined, index?:number) : any {
            //if (e) e = types.services.intercept(e);
            if (Array.isArray(e)) {
                //if (Promise.resolve(e[0]) === e[0]) debugger;
                /*if (e[1] == null) e[1] = {};
                if (typeof e[1] === "object") e[1].context = this.context;*/
                // @ts-ignore: 'Promise' only refers to a type, but is being used as a value here                
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

        render(e?:appfibre.app.element|appfibre.app.promisedElement) : any {
            return this.renderInternal(e || this.props.children);
        }
    }
}
{}
export { BaseComponent }
