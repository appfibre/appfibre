import types from "@appfibre/types"
  
let BaseComponent = function inject<P, S>(app:types.app.IAppLoaded) {
    return class BaseComponent extends app.services.UI.Component<P, S> /*implements types.Component<P,S>*/ {
        props:types.app.UI.RenderableProps<P>
        //state:S

        constructor(props:Readonly<P>, context:any) {
            super(props, context);
            this.props = props;
        }

        renderInternal(e:types.app.UI.ElementPromise|undefined, index?:number) : any {
            if (Array.isArray(e)) {
                if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, index);
                else {
                    return e.map((c, idx) => { if (Array.isArray(c)) { if (!c[1]) c[1] = {}; c[1]["key"] = c[1]["key"]||idx;} return this.renderInternal(c, idx); });
                }
            } return !e || typeof e === "string" ? e : app.services.processor.processElement(e, index) ;
        }


        render(props?: types.app.UI.RenderableProps<P>|types.app.UI.ElementPromise/*, state?: Readonly<S>, context?: any*/): any {
            return this.renderInternal(props || this.props.children);
        }
    }
}
{}
export { BaseComponent }
