import { IAppLoaded, promisedElement, element } from "../types";

declare class Promise<T>  {
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
  
let BaseComponent = function inject(app:IAppLoaded) {
    return class BaseComponent extends app.services.UI.Component {

        renderInternal(e:element|promisedElement, index?:number) : any {
            if (Array.isArray(e)) {
                //if (Promise.resolve(e[0]) === e[0]) debugger;
                if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, index);
                else {
                    return e.map((c, idx) => { if (Array.isArray(c)) { if (!c[1]) c[1] = {}; c[1]["key"] = c[1]["key"]||idx;} return this.renderInternal(c, idx); });
                }
            } 
            //if (!e) debugger;
            return !e || typeof e === "string" ? e : app.services.processor.processElement(e, index) ;
        }

        render(e:element|promisedElement) : any {
            return this.renderInternal(e || this.props.children);
        }
    }
}

export { BaseComponent }
