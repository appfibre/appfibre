//import { IAppLoaded, IProcessor, LogLevel, element, promisedElement} from "../types";
import { App } from "../app";
import { BaseComponent, Async } from '../components';
import appfibre from "@appfibre/types";

export declare class Promise<T>  {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
  
  
function s_xa(a:any,b?:any){return Object.prototype.hasOwnProperty.call(a,b)}
function clone<T>(a:T,b?:any):T{for(var c=1;c<arguments.length;c++){var d:T=arguments[c];if(d)for(var e in d)s_xa(d,e)&&(a[e]=d[e])}return a}

function Inject (app : appfibre.app.IAppLoaded, proxy?:any) : any {
    let inj = clone(app);
    inj.services.UI.Component = proxy || BaseComponent(app)/*app.services.UI.Component*/;

    /*let { title, designer, ui, target, ...inject } = app;
    return { Component 
        , Context 
        , Loader
        , components : app.components
        , ...inject
    };*/

    return inj;
}

export class Processor implements appfibre.app.IProcessor
{
    app:appfibre.app.IAppLoaded
    cache = Object();
    type:"Processor";
    constructor(app:appfibre.app.IAppLoaded<any, any>)
    {
        this.type = "Processor";
        this.app = app;
        this.cache[".App"] = function inject(app:appfibre.app.IAppLoaded) { 
            return class Proxy extends BaseComponent<{main?:appfibre.app.element|appfibre.app.promisedElement}, any>(app) {
                //app:App;
                constructor(props:any, context:any) {
                    super(props, context);
                    //this.app = new App(props);
                }

                render() {
                    return super.render(this.props.main);
                }
            }
        };
    }

    private async:any;
    private Async() {
        this.async = this.async || Async(this.app);
        return this.async;
    }

    createClass(B:any, d:any) {
        return class extends B {
            constructor() 
            {
                let b:any = super(arguments);
                var i = typeof d === "function" ? d.call(b, b) : d;
                if (b !== undefined) for (var p in b.__proto__) if (!i[p]) i[p] = b[p];
                if (i["constructor"]) i.constructor.apply(i, arguments);
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
        this.app.services.logger.log.call(this, appfibre.LogLevel.Trace, 'Processor.parse', obj);
        let processor = this;
       
        return new Promise(function (r:Function, f:any) {
            if (!obj) return r(obj);
            
            if (typeof obj === "object" && !Array.isArray(obj) && (<{default:appfibre.app.element|appfibre.app.promisedElement}>obj).default)        
                obj = processor.init(<{default:appfibre.app.element|appfibre.app.promisedElement}>obj);

            if (Array.isArray(obj)) {
                if (typeof obj[0] === "object" && obj[0]['default'])
                    obj[0] = processor.init(obj[0]);

                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);

                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform") 
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), level, path + '[0]()', index).then(r, f);
                else 
                    Promise.all(obj.map((v,i) => {return processor.parse(v, level+1, path + '[' + i + ']', i)})).then(o => {try { r(processor.app.services.UI.processElement(o,level, index));} catch (e) {processor.app.services.logger.log(appfibre.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]); f(e)}}, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")  
                Promise.resolve((obj)(Inject(processor.app))).then(o => processor.parse(o, level,path, index).then(r, f), f);
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component") 
                try{r(processor.createClass( BaseComponent(processor.app), obj));} catch (e) {processor.app.services.logger.log(appfibre.LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}
            else if (Promise.resolve(obj) === obj)  {
                Promise.resolve(obj).then(o => processor.parse(o, level, path, index).then((o2:any) => r(o2), f), f);
            }
            else if (obj)
                { try { r(processor.app.services.UI.processElement(obj, level, index));} catch (e) {processor.app.services.logger.log(appfibre.LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}}
            else r(obj);
        });
    }

    resolve(fullpath: string) {
        this.app.services.logger.log.call(this, appfibre.LogLevel.Trace, 'Processor.resolve', [fullpath]);

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
            for (var part = 0; part < path.length; part++) {
                if (typeof obj === "function" && this.getFunctionName(obj) === "inject") obj = obj(Inject(this.app, BaseComponent(this.app)));
                if (obj[path[part]] !== undefined) {
                    obj = obj[path[part]];
                    if (typeof obj === "function" && this.getFunctionName(obj) == "inject") obj = obj(Inject(this.app, BaseComponent(this.app)));
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj:any):any { return ["pre", {"style":{"color":"red"}}, obj[1].stack ? obj[1].stack : obj[1]]; }
                    else {
                        this.app.services.logger.log.call(this, appfibre.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'" );
                        return class extends BaseComponent(this.app) { render () { return super.render ? super.render(["span", {"style":{"color":"red"}}, `${fullpath||'undefined'} not found!`]) : `${fullpath||'undefined'} not found!`  }};
                    }
                }
            }

            //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
            return this.cache[fullpath] = obj;
        } 
    }

    init(obj:{default:any}):any {
        return obj.default;
    }

    processElement(obj:appfibre.app.element|appfibre.app.promisedElement, index?:number) : any {
        if (!obj) return obj;
        if (typeof obj === "object" && !Array.isArray(obj) && (<{default:appfibre.app.element|appfibre.app.promisedElement}>obj).default)        
            obj = this.init(<{default:appfibre.app.element|appfibre.app.promisedElement}>obj);

        if (Array.isArray(obj)) {
            if (typeof obj[0] === "object" && obj[0]['default'])
                // TODO: Remove <never>
                obj[0] = <never>this.init(obj[0]);
            if (typeof obj[0] === "string"){
                obj[0] = this.resolve(obj[0]);
            }

            if (typeof obj[0] === "function") {
                var name = this.getFunctionName(obj[0]);
                switch (name)
                {
                    case "transform":
                        let key = index;
                        if (obj[1] && obj[1].key) key = obj[1].key;
                        return this.processElement(obj[0].apply(this.app, obj.slice(1)), key);
                    case "inject":
                        obj[0] = (obj[0])(Inject(this.app));
                        return this.processElement(obj);
                    case "Component":
                        obj[0] = this.createClass( BaseComponent(this.app), obj[0]);
                        return this.processElement(obj);
                }                  
            }
        }
        if (Array.isArray(obj) && obj.some(c => Promise.resolve(c) === c)) 
            return this.app.services.UI.processElement([this.Async(), {id: Date.now()}, obj], 0, obj && obj[1] && obj[1].key !== undefined ? obj[1].key : index);
        else if (typeof obj === "string" || !obj) 
            return obj;
        /*else if (typeof obj === "object" && (<{__jst:any}>obj).__jst)
            return this.processElement([Intercept(this.app), {}, [(<{default:any}>obj).default]]);*/

        //else if (obj.then)  
        //    Promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);

        if (Promise.resolve(obj)===obj) 
           obj = [this.Async(), {index: index}, obj];

        if (Array.isArray(obj)) 
            return this.app.services.UI.processElement([obj[0], obj[1], Array.isArray(obj[2]) ? obj[2].map((c, idx) => { return typeof c === "string" ?  c : this.processElement(c, idx)}) : obj[2]], 0, index);
        else 
            return obj;
    
    }

    process(obj:any):PromiseLike<any>
    {
        this.app.services.logger.log.call(this, appfibre.LogLevel.Trace, 'Processor.process', obj);

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
                    this.app.services.moduleSystem.init(this.app.settings.baseExecutionPath);
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

}