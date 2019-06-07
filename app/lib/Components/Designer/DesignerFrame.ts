import { types } from "@appfibre/jst";
import {Intercept} from "./Intercept";
import { events, Designer_Load } from "./types";

let DesignerFrame : types.Component = function inject(app:types.IAppLoaded) {
    if (app.services.transformer.settings.parsers)
        app.services.transformer.settings.parsers[".app"] = (obj:any, parseSettings:types.ITransformOutput, offset:number) => {
            var obj2:{[key:string]:any} = {};
            var keys = Object.keys(obj);
            keys.forEach(z => obj2[z == ".app" ? "main" : z] = obj[z]);
            return `[".App", {${app.services.transformer._process(obj2, true, true, parseSettings, offset)}}]`;
        };
    app.services.processor.init = (obj:{default:any, [index:string]:any}) => typeof obj.__esModule === "string" ? [Intercept, {file: obj.__esModule}, [obj.default]] : obj.default;

    return class Designer extends app.services.UI.Component
    {
        constructor() {
            super();
            this.state = {content: app.main};
            this.designer_Load = this.designer_Load.bind(this);
        }

        componentWillMount() {
            app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
        }
        
        componentWillUnmount() {
            app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
        }

        designer_Load(ev:types.IEventData<Designer_Load>) {
            app.services.moduleSystem.import(ev.data.url).then(x => {
                this.setState({content: x});
            }, alert);
        }

        render() {
            return super.render(this.state.content);
        }
    }
}

export {DesignerFrame};
