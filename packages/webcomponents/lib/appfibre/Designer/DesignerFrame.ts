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

        app.services.processor.unwrapDefault = (obj:any) => {
            if (typeof obj === "object" && typeof obj.__esModule === "string" ) 
                return app.services.processor.processElement([Intercept, {file: obj.__esModule}, typeof obj.default === "string" ? obj.default : [obj.default]]);
            if (obj && obj.default)
                obj = obj.default;
            if (Array.isArray(obj)) { 
                /*if (typeof obj[0] === "object" && typeof obj[0].__esModule === "string" && obj[0].default) {
                    let __esModule = obj[0].__esModule;
                    obj[0] = obj[0].default;
                    return app.services.processor.processElement([Intercept, {file: __esModule}, [obj]]);
                }*/

                if (typeof obj[2] === "object" && typeof obj[2].__esModule === "string" && obj[2].default) {
                    obj[2] = [[Intercept, {file: obj[2].__esModule}, obj[2].default]];
                }

                return obj.map(e => e && e.default ? e.default : e);
            }
            return obj;
        }
    

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
            if (ev.data) {
                if (ev.data.url > '')
                    app.services.moduleSystem.import(ev.data.url).then(x => {
                        this.setState({content: x});
                    }, z => alert(z));
                else
                    this.setState({content: app.main});
            }
        }

        render() {
            return super.render(this.state.content);
        }
    }
}

export {DesignerFrame};
