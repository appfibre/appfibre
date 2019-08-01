import { types } from "@appfibre/types";
import { Intercept } from "./Intercept";
import { events, Designer_Load, Designer_Select } from "./types";

let DesignerFrame /*: fibre.UI.Component<any,any>*/ = function inject(app:types.webapp.IWebAppLoaded) {
    if (app.services.transformer.settings.parsers)
        app.services.transformer.settings.parsers[".app"] = (transformer:types.app.ITransformer, context:types.app.ITransformContext, obj:any, offset:number) => {
            var obj2:{[key:string]:any} = {};
            var keys = Object.keys(obj);
            keys.forEach(z => obj2[z == ".app" ? "main" : z] = obj[z]);
            return `[".App", {${app.services.transformer.process(obj2, context, true, true, offset)}}]`;
        };
    app.services.processor.init = (obj:{default:any, [index:string]:any}) => typeof obj.__esModule === "string" ? [Intercept, {file: obj.__esModule}, [obj.default]] : obj.default;

    return class Designer extends app.services.UI.Component<{}, {content:any}>
    {
        context: any;
        base?: HTMLElement | undefined;
        props:{}
        state:{content:any}

        constructor(props:{}) {
            super(props);
            this.props = props;
            this.state = {content: app.main};
            this.designer_Load = this.designer_Load.bind(this);
            this.window_click = this.window_click.bind(this);
        }

        componentWillMount() {
            window.addEventListener("click", this.window_click);
            app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
            //document.body.onclick = function () {debugger;};
        }

        window_click(ev:Event) {
            app.services.events.publish<Designer_Select>({type: "Designer.Intercept.Select", correlationId: Date.now().toString(), data: {editMode:false, canEdit: false}}, parent);
            //parent.postMessage({eventType: "select", correlationId: Date.now().toString()}, location.href); ev.returnValue = false; 
        }
        
        componentWillUnmount() {
            app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
            window.removeEventListener("click", this.window_click);
        }

        designer_Load(ev:types.app.IEventData<Designer_Load>) {
            if (ev.data)
                app.services.moduleSystem.import(ev.data.url).then(x => {
                    this.setState({content: x});
                }, z => alert("loaded "+z));
        }

        render() {
            return super.render(this.state.content);
        }
    }
}

export {DesignerFrame};
