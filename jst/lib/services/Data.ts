import { IData, IAppLoaded, LogLevel, IEventData} from "../types";

let SM = function inject(app:IAppLoaded) {
    return class Bind extends app.services.UI.Component {
        constructor(props:any) {
            super();
            this.state = {data: props.data };
            let s:{[path:string]:any} = {};
            this.visit.call(this, props.children, s);
            this.state.subscribers = s;
            app.services.processor.parse(["div", null, props.children], 0, '').then((o:any) => {
                this.setState({children: o.props.children});
            });
        }

        setValue(path:string, value:any) {
            this.state.subscribers[path].forEach((s:{value:string}) => {if(s.value != value) s.value = value});
            app.services.processor.parse(["div", null, this.props.children], 0, '').then((o:any) => {
                this.setState({children: o.props.children, data: (new Function('data', 'path', 'value', 'data' + (path[0] === '[' ? '' : '.') + path + ' = value; return data;'))(this.state.data, path, value)});
            })
        }

        getValue(path:string, obj?:any) {
            return (new Function('data', 'path', 'return data' + (path[0] === '[' ? '' : '.') + path))(this.state.data, path); 
        }

        subscribe(a:any, s:{[path:string]:any}) {
            let path = a["bind"];
            a.onChange = (v:any) => this.setValue.call(this, path, v.target.value);
            a.value = this.getValue.call(this, path);
            if (s[path] === undefined) s[path] = [];
            s[path].push(a);
            delete a.bind;
        }

        visit(obj:any, s:{[path:string]:any}) {
            if (Array.isArray(obj)) {
                obj.forEach(e => {
                    if (Array.isArray(e) && e[0] != "Data.bind") {
                        if (e[1] && typeof e[1] === "object" && e[1]["bind"] ) this.subscribe(e[1], s);
                        if (e[2] && Array.isArray(e[2])) this.visit(e[2], s);
                    }
                });
            }
        }

        render() {
            return this.state.children ? this.state.children : "Loading Data";
        }
    }
}

const Data : IData = {

    bind: function transform(this:IAppLoaded, a:object, c:any) {
        return [SM, {data: a, children: c}];
        //return ["div", a, c];
    },

    format: function transform(str:string) {
        var s = str.toString() || "";
        return s;
    }

}

export {Data};