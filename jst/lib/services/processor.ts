import { IAppLoaded, IProcessor, LogLevel } from "../types";
import { Intercept } from "../components/intercept";
import { basename } from "path";

declare class Promise<T>  {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
}
  
function s_xa(a:any,b?:any){return Object.prototype.hasOwnProperty.call(a,b)}
function clone(a:any,b?:any){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)s_xa(d,e)&&(a[e]=d[e])}return a}

function Inject (app : IAppLoaded, Proxy?:any) : any {
    let inj = clone(app);
    inj.services.UI.Component = Proxy || app.services.UI.Component;

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

    BaseComponent() {
        let app = this.app;
        return class extends app.services.UI.Component {
            render(obj : any) {
                return app.services.UI.processElement(obj, 0);
            }
        }
    }

    createClass(B:any, d:any) {
        return class extends B {
            constructor(tag:any, attributes:any, children:any) 
            {
                let b = super(tag, attributes, children);
                var i = typeof d === "function" ? d.call(b, b) : d;
                if (b !== undefined) for (var p in b.__proto__) if (!i[p]) i[p] = b[p];
                if (i["constructor"]) i.constructor.call(i, i);
                return i;
            }
        };        
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
       
        return new Promise(function (r:Function, f:any) {
            if (Array.isArray(obj)) {
                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);
                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform") 
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else 
                    Promise.all(obj.map((v,i) => processor.parse(v, level+1, path + '[' + i + ']', i))).then(o => {try { r(processor.app.services.UI.processElement(o,level, index));} catch (e) {processor.app.services.logger.log(LogLevel.Error, 'Processor.parse: ' + e.stack, [o]); f(e)}}, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")  
                Promise.all([ (obj)(Inject(processor.app))]).then(o => r(processor.parse(o[0], level,path, index)), f);
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component") 
                try{r(processor.createClass( processor.BaseComponent(), obj));} catch (e) {processor.app.services.logger.log(LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}
            else if (obj && obj.then)  
                Promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);
            else if (obj)
                { try { r(processor.app.services.UI.processElement(obj, level, index));} catch (e) {processor.app.services.logger.log(LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}}
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
                if (typeof obj === "function" && this.getFunctionName(obj) === "inject") obj = obj(Inject(this.app, this.BaseComponent()));
                if (obj[path[part]] !== undefined) {
                    if (part == path.length-1) jst = obj.__jst;
                    obj = obj[path[part]];
                    if (typeof obj === "function" && this.getFunctionName(obj) == "inject") obj = obj(Inject(this.app, this.BaseComponent()));
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
            //if (typeof obj == "function" && this.getFunctionName(obj) === "inject")
            //    obj = obj(Inject(this.app, jst ? class Component extends this.app.services.UI.Component { render(obj:any):any { return this.parse(!this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, this.construct(this.app.UI.Component)] : obj); }} : this.construct(this.app.services.UI.Component)));

            //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
            return this.cache[fullpath] = obj;
        } 
    }

    process(obj:any):Promise<any>
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

        return new Promise((resolve:Function, reject:Function) => {
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