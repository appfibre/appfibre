import { BaseComponent } from "../components";
import * as types from "../types";

function clone(o:any):any {
    if (Array.isArray(o)) 
        return o.map(o => clone(o));
    else if (typeof o === "object") {
        var z = Object.create(o);
        Object.keys(o).forEach(k => z[k] = o[k]);
        return z;
    } else 
    return o;
}

let SM = function inject(app:types.IAppLoaded) {
    return class Bind extends BaseComponent(app) {
        constructor(props:any) {
            super(app);
            this.state = {data: clone(props.data) };
            let s:{[path:string]:any} = {};
            this.visit.call(this, props.childArray, s);
            this.state.subscribers = s;
            this.render = this.render.bind(this);
        }

        setValue(path:string, value:any) {
            this.state.subscribers[path].forEach((s:{value:string}) => {if(s.value != value) s.value = value});
            this.setState({ data: (new Function('data', 'path', 'value', 'data' + (path[0] === '[' ? '' : '.') + path + ' = value; return data;'))(this.state.data, path, value)});
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

        render(e:types.promisedElement) {
            return super.render(!!e ? e : this.props.childArray);
        }
    }
}

const Data : types.IData = {

    bind: function transform(this:types.IAppLoaded, a:object, c:any) {
        return [SM, {data: a, childArray: c}];
        //return ["div", a, c];
    },

    format: function transform(str:string) {
        var s = str.toString() || "";
        return s;
    }

}

export {Data};