import { IAppLoaded, IProcessor } from "../types";
import { Intercept } from "../components/intercept";
import { Async } from "../components/async";
import { Promise, IPromise } from "./promise";


function s_xa(a:any,b?:any){return Object.prototype.hasOwnProperty.call(a,b)}
function clone(a:any,b?:any){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)s_xa(d,e)&&(a[e]=d[e])}return a}

function Inject (app : IAppLoaded, Proxy:any) : any {
    let inj = clone(app);
    inj.services.UI.Component = Proxy || app.services.UI.Component;

    /*class Loader extends Component {
        load() {
            JstContext.load(this.state.url, true).then(obj => {this.setState({children: obj})}, err => {this.setState({children: ["Exception", err]})});
        }

        componentWillMount()
        {
            this.componentWillUpdate({}, this.props);
        }

        componentWillUpdate(props:any, nextprops:any) 
        {
            this.checkurl(nextprops);
        }
        
        shouldComponentUpdate(props:any) {
            return this.checkurl(props);
        }

        checkurl(props:any) {
            var url = typeof props.url === "function" ? props.url() : props.url;
            if (!this.state || this.state.url !== url)
                this.setState({children: this.props.children, url: url}, this.load);
            return !this.state || this.state.url === url;
        }

        render () {
            return super.render(this.checkurl(this.props) && this.state.children && this.state.children.length > 0 ? this.state.children : this.props.children);
        }
    }*/

    /*let { title, designer, ui, target, ...inject } = app;
    return { Component 
        , Context 
        , Loader
        , components : app.components
        , ...inject
    };*/

    return inj;
}

export class Processor implements IProcessor
{
    app:IAppLoaded
    cache = Object();
    type:"Processor";
    constructor(app:IAppLoaded)
    {
        this.type = "Processor";
        this.app = app;
    }

    construct(jstComponent : any) : any {
        let ctx = this;
        return class extends jstComponent {
            render(obj : any) {
                if (Array.isArray(obj) && obj.length === 1 && !Array.isArray(obj[0])) return typeof obj[0] == "string" ? ctx.parse(obj) : obj[0];
                return obj == null || typeof obj === "string" || obj.$$typeof ? obj : ctx.parse(obj);
            }
        }
    }

    locate(resource:any, path:string) {
        var parts = path.split('.');
        var jst = false;
        var obj = resource;
        for (var part = 0; part < parts.length; part++)
            if (obj[parts[part]] !== undefined) {
                if (part == path.length-1) jst = obj.__jst;
                obj = obj[path[part]];
            } else
                obj = null;  
        return obj;
    }

    getFunctionName(obj:any):string{
        if (obj.name)
            return obj.name;
        var name = obj.toString();
        if (name.indexOf('(') > -1)
            name = name.substr(0, name.indexOf('('));
        if (name.indexOf('function') > -1)
            name = name.substr(name.indexOf('function') + 'function'.length);
        return name.trim();
    }

    processElement(ar : Array<any>, supportAsync?: boolean, light?:boolean) {
        var done = false;
        while (!done) {
            if (typeof ar[0] === "function")
                switch (this.getFunctionName(ar[0])) {
                    case "inject": 
                        ar[0] = ar[0](Inject(this.app, this.construct(this.app.services.UI.Component)));
                        break;
                    case "transform":
                        return this.parse(ar[0](ar), undefined, supportAsync);
                    default:
                        done = true;
                }
            else if (typeof ar[0] === "string") {
                var tag = ar[0];
                ar[0] = this.resolve(ar[0]);
                done = ar[0] === tag;
                if (ar[0].then && supportAsync && !light)
                    return new this.app.services.promise((resolve:Function) => ar[0].then((x:any) => resolve(this.parse(x, ar[1].key, supportAsync))));
            } else if (ar[0] && ar[0].then && !supportAsync  && !light)
                return this.app.services.UI.processElement(Async, {"value": ar});
            else
                done = true;
        }
        return light ? ar : this.app.services.UI.processElement(ar[0], ar[1], ar[2]);
    }

    parse(obj:any, key?:number|undefined, supportAsync?:boolean):any {  
        if (obj && obj.default) 
            obj = obj.__jst ? [Intercept, { file: obj.__jst }, [obj.default]] : obj.default;

        if (Array.isArray(obj)) {
            if (key && !obj[1]) obj[1] = {key:key};
            if (key && !obj[1].key) obj[1].key = key;
        }
        else
            obj = [obj, key ? {key:key} : null];

        var isAsync = false;

        for (var idx = 0; idx < obj.length; idx++) {
            if (typeof obj[idx] === "function") {
                //obj[idx] = this.processElement([obj[idx]], supportAsync, true)[0];
            }

            if (Array.isArray(obj[idx])) {
                for (var i = 0; i < obj[idx].length; i++) {
                    if (Array.isArray(obj[idx][i]) || typeof obj[idx][i] === "function" || typeof obj[idx][i] === "object" ) {
                        if (typeof obj[idx][i] === "function" || Array.isArray(obj[idx][i])) obj[idx][i] = (idx==2) ? this.parse(obj[idx][i], undefined, supportAsync) : this.processElement(obj[idx][i], supportAsync, true);
                        if (obj[idx][i] && obj[idx][i].then) isAsync = true;
                    } else if (idx == 2)
                        throw new Error(`Expected either double array or string for children Parent:${String(obj[0])}, Child:${JSON.stringify(obj[idx][i], (key,value) => typeof value === "function" ? String(value) : value)}`);
                }
            }
        }
        
        //if (isAsync && !obj[idx].then) obj[idx] = new Promise((resolve,reject) => Promise.all(obj[idx]).then(output => resolve(output), reason => reject(reason)));
        if (isAsync) for (var idx = 0; idx < obj.length; idx++) if (!obj[idx].then) obj[idx] = this.app.services.promise.all(obj[idx]);
        if (!isAsync && ((typeof obj[0] === "function" &&  obj[0].then) || (typeof obj[1] === "function" &&  obj[1].then))) isAsync = true;

        if (!isAsync) {
            obj = this.processElement(obj, supportAsync);
            if (typeof obj === 'function' && obj.then && !supportAsync) 
                return  this.processElement([Async, {value: obj}], supportAsync);
            else 
                return obj;
        }

        if (!supportAsync && isAsync) 
            return this.processElement([Async, {value: this.app.services.promise.all(obj).then(o => this.processElement(o, supportAsync))}]);
        
        return isAsync ? new this.app.services.promise((resolve:any) => this.app.services.promise.all(obj).then(o => resolve(this.processElement(o, supportAsync)))) : this.processElement([obj[0], obj[1], obj[2]], supportAsync);
    }

    resolve(fullpath: string) {
        if (this.cache[fullpath])  return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            //var obj = AppContext.xhr(parts[0], true);
            var obj = this.instanciate(parts[0], this);
            if (parts.length == 1)
                return obj;
            
            return obj.then((x:any) => this.locate(x, parts.slice(1, parts.length).join(".")));
        } else {
            let path = fullpath.split('.');
            let obj:any = this.app.components || Object;
            let jst = false;
            let prop = "default";
            
            for (var part = 0; part < path.length; part++) {
                if (typeof obj === "function" && this.getFunctionName(obj) === "inject") 
                        //obj = obj( Inject( app.designer ? class Component extends app.ui.Component { render(obj) { return parse(jst ? [require("@appfibre/jst/intercept.js").default, {"file": jst, "method": prop}, obj] : obj); }}:obj));
                        obj = obj(Inject(this.app, this.construct(this.app.services.UI.Component)));
                
                if (obj[path[part]] !== undefined) {
                    if (part == path.length-1) jst = obj.__jst;
                    obj = obj[path[part]];
                }
                else if (path.length == 1 && path[0].toLowerCase() == path[0])
                    obj = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj:any):any { return ["pre", {"style":{"color":"red"}}, obj[1].stack ? obj[1].stack : obj[1]]; }
                    else {
                        console.error('Cannot load ' + fullpath);
                        return class extends this.app.services.UI.Component { render () { return super.render(["span", {"style":{"color":"red"}}, `${fullpath} not found!`]) }};
                    }
                }
            }

            if (obj.default) {
                if (obj.__jst) jst = obj.__jst;
                obj = obj.default;
            }
            else if (jst) 
                prop = path[path.length-1];

            if (typeof obj == "function" && this.getFunctionName(obj) === "inject")
                obj = obj(Inject(this.app, jst ? class Component extends this.app.services.UI.Component { render(obj:any):any { return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, this.construct(this.app.UI.Component)] : obj); }} : this.construct(this.app.services.UI.Component)));

            return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
        } 
    }

    process(obj:any):IPromise<any>
    {
        function visit(obj:any):boolean {
            if (Array.isArray(obj)) {
                for (var i in obj)
                    if (visit(obj[i])) 
                        return true;
            } else if (typeof obj === "object" && obj != null) {
                var keys = Object.keys(obj);
                for (var i in keys)
                    if (keys[i].substr(0,1) == ".") 
                        return true;
                    else if (visit(obj[keys[i]]))
                        return true;
            }
            return false;
        }

        return new this.app.services.promise((resolve:Function, reject:Function) => {
            let isTemplate = visit(obj);
            try {
                if (isTemplate) {
                    this.app.services.moduleSystem.exec(this.app.services.transformer.transform(JSON.stringify(obj)).code).then((exported:any) => {
                        try{
                            var output = this.parse(exported.default || exported);
                            resolve(output);
                        }
                        catch(e) {
                            reject(e);
                        }
                        
                    }, (rs:any) =>reject(rs)); 
                }
                else 
                    resolve(this.parse(obj));
            }
            catch(e) {
                reject(e);
            }
        });
    }

    instanciate(url:string, parent?:any):any {
        return this.app.services.moduleSystem.load(url, parent) 
          .then(function (this:Processor, source) {
            return this.app.services.transformer.transform(url, source).code;
          })
          .then(this.app.services.moduleSystem.exec);
    }
}