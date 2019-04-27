import { IAppLoaded, IProcessor, LogLevel } from "../types";
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
                if (Array.isArray(obj) && obj.length === 1 && !Array.isArray(obj[0])) return typeof obj[0] == "string" ? ctx.parse(obj, 0, '') : obj[0];
                return obj == null || typeof obj === "string" || obj.$$typeof ? obj : ctx.parse(obj, 0, '');
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

    private parse(obj:any, level:number, path:string, index?:number) : any {
        this.app.services.logger.log.call(this, LogLevel.Trace, 'Processor.parse', obj);
        let processor = this;
        return new this.app.services.promise(function (r, f) {
            if (Array.isArray(obj)) {
                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);
                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform") 
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "inject") {
                    obj[0] = obj[0](Inject(processor.app, processor.construct(processor.app.services.UI.Component)));
                    //processor.parse(obj, level, path, index).then(function (o:any) {console.log(o); r(o)}, f);
                    processor.parse(obj, level, path, index).then(r, f);
                }
                else 
                    processor.app.services.promise.all(obj.map((v,i) => processor.parse(v, level+1, path + '.[' + i + ']', i))).then(o => {try { r(processor.app.services.UI.processElement(o,level, index));} catch (e) {processor.app.services.logger.log(LogLevel.Error, 'Processor.parse: ' + e.stack, [o]); f(e)}}, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")  
                processor.app.services.promise.all([ (obj)(Inject(processor.app, processor.construct(processor.app.services.UI.Component)))]).then(o => r(processor.parse(o[0], level,path, index)), f);
            else if (obj && obj.then)  
                processor.app.services.promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);
            else if (obj)
                {try {r(processor.app.services.UI.processElement(obj, level, index));} catch (e) {processor.app.services.logger.log(LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}}
            else r(obj);
        });
    }

    resolve(fullpath: string) {
        this.app.services.logger.log.call(this, LogLevel.Trace, 'Processor.resolve', [fullpath]);

        if (this.cache[fullpath]) return this.cache[fullpath];
        if (fullpath.substring(0, 1) == "~") {
            var parts = fullpath.substring(1, fullpath.length).split('#');
            var obj = this.app.services.moduleSystem.instantiate(parts[0], this);
            if (parts.length == 1)
                return obj;
            
            return obj.then((x:any) => this.locate(x, parts.slice(1, parts.length).join(".")));
        } else {
            let path = fullpath ? fullpath.split('.') : [''];
            let obj:any = this.app.components || Object;
            let jst = false;
            let prop = "default";
            
            for (var part = 0; part < path.length; part++) {
                if (typeof obj === "function" && this.getFunctionName(obj) === "inject") 
                    obj = obj(Inject(this.app, this.construct(this.app.services.UI.Component)));
                if (obj[path[part]] !== undefined) {
                    if (part == path.length-1) jst = obj.__jst;
                    obj = obj[path[part]];
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj:any):any { return ["pre", {"style":{"color":"red"}}, obj[1].stack ? obj[1].stack : obj[1]]; }
                    else {
                        this.app.services.logger.log.call(this, LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'" );
                        return class extends this.app.services.UI.Component { render () { return super.render(["span", {"style":{"color":"red"}}, `${fullpath||'undefined'} not found!`]) }};
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
        this.app.services.logger.log.call(this, LogLevel.Trace, 'Processor.process', obj);

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
                    this.app.services.moduleSystem.init(this.app.options.basePath);
                    this.app.services.moduleSystem.import(this.app.services.transformer.transform(JSON.stringify(obj)).code).then((exported:any) => {
                        try{
                            this.parse(exported.default || exported, 0, '').then(resolve, reject);
                        }
                        catch(e) {
                            reject(e);
                        }
                        
                    }, (rs:any) =>reject(rs)); 
                }
                else 
                    this.parse(obj, 0, '').then(resolve, reject);
            }
            catch(e) {
                reject(e);
            }
        });
    }

    /*instanciate(url:string, parent?:any):any {
        const app = this.app;
        app.services.logger.log.call(this, LogLevel.Trace, 'Processor.instanciate', [url]);

        return app.services.moduleSystem.load(url, parent) 
          .then(function (source) {
            return app.services.transformer.transform(source, url).code;
          })
          .then(function(source) {return app.services.moduleSystem.exec(source, url)});
    }*/
}