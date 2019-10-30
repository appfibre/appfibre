import types from "@appfibre/types"
const seed = '0123456789abcdefgihjlmnopqrstuvwxyzABCDEFGIHJKLMNOPQRSTUVWXYZ'

let BaseComponent = function inject<P, S>(app:types.app.IAppLoaded) {

    function generateId () {
        let n = 8;
        var id = ''
        while (0 < n--) {
          id += seed[Math.random() * 61 | 0]
        }
        return id
      }

    return class BaseComponent extends app.services.UI.Component<P, S> /*implements types.Component<P,S>*/ {
        props:types.app.UI.RenderableProps<P>&{key?:string}
        key:string;
        //state:S

        constructor(props:Readonly<P>, context:any) {
            super(props, context);
            if (!props) throw new Error ("Expected properties object from parent constructor.  Please ensure that you are passing props to super() call");
            this.key = (<{_key?:string}>props)["_key"] || ('bc_' + generateId());
            this.props = props;
        }

        renderInternal(e:types.app.UI.ElementPromise|undefined, index?:number) : any {
            if (Array.isArray(e)) {
                if (typeof e[0] === "object" && e[0].default && (typeof e[0].default === "string" || typeof e[0].default === "function" || Promise.resolve(e[0].default) ===e[0].default))
                    return app.services.processor.processElement(e, this.key, index);
                else if (typeof e[0] === "string" || typeof e[0] === "function" || Promise.resolve(e[0]) === e[0])
                    return app.services.processor.processElement(e, this.key, index);
                else {
                    return e.map((c, idx) => { if (Array.isArray(c)) { if (!c[1]) c[1] = {}; c[1]["key"] = c[1]["key"]||idx;} return this.renderInternal(c, idx); });
                }
            } 
            return !e || typeof e === "string" ? e : app.services.processor.processElement(e, this.key, index) ;
        }


        render(props?: types.app.UI.RenderableProps<P>|types.app.UI.ElementPromise/*, state?: Readonly<S>, context?: any*/): any {
            return this.renderInternal(props || this.props.children);
        }
    }
}
{}
export { BaseComponent }
