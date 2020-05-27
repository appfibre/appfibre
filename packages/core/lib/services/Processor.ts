//import { App } from "../app";
import { BaseComponent, Async } from '../components';
import {types} from "@appfibre/types";

export declare class Promise<T>  {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}
  
  
function s_xa(a:any,b?:any){return Object.prototype.hasOwnProperty.call(a,b)}
function clone<T>(a:T/*,b?:any*/):T{for(var c=1;c<arguments.length;c++){var d:T=arguments[c];if(d)for(var e in d)s_xa(d,e)&&(a[e]=d[e])}return a}

function Inject (app : types.app.IAppLoaded, proxy?:any) : any {
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

export class Processor implements types.app.IProcessor
{
    app:types.app.IAppLoaded
    cache = Object();
    type:"Processor";
    constructor(app:types.app.IAppLoaded<any, any>)
    {
        this.type = "Processor";
        this.app = app;
        this.cache[".App"] = function inject(app:types.app.IAppLoaded) { 
            return class Proxy extends BaseComponent<{main?:any/*types.app.element|types.app.promisedElement*/}, any>(app) {
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
        var obj = resource;
        for (var part = 0; part < parts.length; part++)
            if (obj[parts[part]] !== undefined) 
                obj = obj[path[part]];
            else
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

    // ether an element, or array of elements depending on depth == even or odd
    processElementInternal(element:any, parentkey:string, depth:number, index?:number) : any {
        if (depth % 2 === 0) 
        {
            if (typeof element != "string" && !Array.isArray(element)) {
                this.app.services.logger.log.call(this, types.app.LogLevel.Error, "Child element [2] should be either a string or array", [{element: element}]);
                return element;
            }
            else if (Array.isArray(element)) {
                if (typeof element[1] !== "string") {
                    element[1] = element[1] || {};
                    if (!element[1].key) element[1].key = parentkey + this.generateKey(index);
                    if (typeof element[0]==="function") element[1]["_key"] = element[1]["key"];
                }
            }
            
            //if (Array.isArray(element) && element[1] && element[1].context && typeof element[1].context.intercept === "function")
            //    element = element[1].context.intercept(element);
        } 
        //console.log({element, index, depth, code: JSON.stringify(element)});
        return depth % 2 === 1 || !Array.isArray(element) ? element : this.app.services.UI.createElement(element[0], element[1], element[2] /*&& typeof element[2] === "object" && !Array.isArray(element[2]) && (<{default:any}>element[2]).default ? this.init(element[2], true) : element[2]*/);
    }

    private parse(obj:any, parentkey:string, level:number, index?:number) : any {
        this.app.services.logger.log.call(this, types.app.LogLevel.Trace, 'Processor.parse', obj);
        let processor = this;
       
        return new Promise(function (r:Function, f:any) {
            if (!obj) return r(obj);
            obj = processor.unwrapDefault(obj);
            //if (typeof obj === "object" && !Array.isArray(obj) && (<{default:any/*types.app.element|types.app.promisedElement*/}>obj).default)        
            //   obj = processor.init(obj, false);

            if (Array.isArray(obj)) {
                //if (typeof obj[0] === "object" && obj[0]['default'])
                  //  obj[0] = processor.init(obj[0], false);

                if (typeof obj[0] === "string")
                    obj[0] = processor.resolve(obj[0]);

                if (typeof obj[0] === "function" && processor.getFunctionName(obj[0]) === "transform") 
                    processor.parse(obj[0].apply(processor.app, obj.slice(1)), parentkey /*+ ','*/, level, index).then(r, f);
                else 
                    Promise.all(obj.map((v,i) => {return processor.parse(v, parentkey /*+ '.' */ + processor.generateKey(i), level+1, i)})).then(o => {try { r(processor.processElementInternal(o, parentkey, level, index));} catch (e) {processor.app.services.logger.log(types.app.LogLevel.Error, 'Processor.parse: ' + e.stack, [o]); f(e)}}, f);
            }
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "inject")  
                Promise.resolve((obj)(Inject(processor.app))).then(o => processor.parse(o, parentkey, level, index).then(r, f), f);
            else if (typeof obj === "function" && processor.getFunctionName(obj) === "Component") 
                try{r(processor.createClass( BaseComponent(processor.app), obj));} catch (e) {processor.app.services.logger.log(types.app.LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}
            else if (Promise.resolve(obj) === obj)  {
                Promise.resolve(obj).then(o => processor.parse(o, parentkey, level, index).then((o2:any) => r(o2), f), f);
            }
            else if (obj)
                { try { r(processor.processElementInternal(obj, parentkey, level, index));} catch (e) {processor.app.services.logger.log(types.app.LogLevel.Error, 'Processor.parse: ' + e.stack, obj); f(e)}}
            else r(obj);
        });
    }

    resolve(fullpath: string) {
        this.app.services.logger.log.call(this, types.app.LogLevel.Trace, 'Processor.resolve', [fullpath]);

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
                else if (obj.default && obj.default[path[part]] !== undefined) {
                    //debugger;
                    obj = obj.default[path[part]];
                    if (typeof obj === "function" && this.getFunctionName(obj) == "inject") obj = obj(Inject(this.app, BaseComponent(this.app)));
                }
                else if (path.length == 1 && path[0].length > 0 && path[0].toLowerCase() == path[0])
                    obj = path[part];
                else {
                    if (fullpath === "Exception")
                        return function transform(obj:any):any { return ["pre", {"style":{"color":"red"}}, obj[1].stack ? obj[1].stack : obj[1]]; }
                    else {
                        debugger;
                        this.app.services.logger.log.call(this, types.app.LogLevel.Error, 'Unable to resolve "App.components.' + (fullpath || 'undefined') + "'" );
                        return class extends BaseComponent(this.app) { render () { return /*super.render ?*/ super.render(["span", {"style":{"color":"red"}}, `${fullpath||'undefined'} not found!`]) /*: `${fullpath||'undefined'} not found!`*/  }};
                    }
                }
            }

            //return this.cache[fullpath] = Array.isArray(obj) ? class Wrapper extends this.app.services.UI.Component { shouldComponentUpdate() { return true; } render() {if (!obj[1]) obj[1] = {}; if   (!obj[1].key) obj[1].key = 0; return this.parse(jst && !this.app.disableIntercept && window.parent !== null && window !== window.parent ? [Intercept, {"file": jst, "method": prop}, [obj]] : obj); }} : obj;
            return this.cache[fullpath] = obj;
        } 
    }

    unwrapDefault(obj:any) {
        if (obj && obj.default)
            obj = obj.default;
        if (Array.isArray(obj)) 
            return obj.map(e => e && e.default ? e.default : e);
        return obj;
    }
    
    chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    generateKey(index?:number) {
        if (!index) return '_';
        let key = '';
        if (index >= this.chars.length) {
            while (index >= this.chars.length) {
                key = this.chars[(index % this.chars.length)].toString() + key;
                index = (index - (index % this.chars.length)) / this.chars.length;
            }
            key = '_' + key;
        } else
            key = (index % this.chars.length).toString();
        return key;
    }

    processElement(obj:types.app.UI.ElementPromise, parentkey?:string, index?:number) : any {
        if (!obj) return obj;
        
        obj = this.unwrapDefault(obj);
        if (Array.isArray(obj)) {
            if (typeof obj[0] === "string"){
                obj[0] = <never>this.resolve(obj[0]);
            }

            if (typeof obj[0] === "function") {
                var name = this.getFunctionName(obj[0]);
                switch (name)
                {
                    case "transform":
                        let key = index;
                        if (obj[1] && obj[1].key) key = obj[1].key;
                        return this.processElement(obj[0].apply(this.app, obj.slice(1)), parentkey/*+','*/, key);
                    case "inject":
                        obj[0] = (obj[0])(Inject(this.app));
                        return this.processElement(obj, parentkey /*+ ','*/);
                    case "Component":
                        obj[0] = this.createClass( BaseComponent(this.app), obj[0]);
                        return this.processElement(obj, parentkey /*+ ','*/);
                }                  
            }
        }   
        if (Array.isArray(obj) && obj.some(c => Promise.resolve(c) === c)) 
            return this.processElementInternal([this.Async(), {id: Date.now()}, obj], parentkey + '_async', 0, obj && obj[1] && obj[1].key !== undefined ? obj[1].key : index);
        else if (typeof obj === "string" || !obj) 
            return obj;
        //else if (obj.then)  
        //    Promise.all( [ obj ]).then(o => processor.parse(o[0], level, path, index).then((o2:any) => r(o2), f), f);

        if (Promise.resolve(obj)===obj) 
           obj = [this.Async(), {key: parentkey}, obj];

        if (Array.isArray(obj))  {
            return this.processElementInternal([obj[0], obj[1], Array.isArray(obj[2]) ? obj[2].map((c, idx) => { return typeof c === "string" ?  c : this.processElement(c, parentkey + /*'.' +*/ this.generateKey(idx), idx)}) : obj[2]], parentkey + this.generateKey(index), 0, index);
        }
        else 
            return obj;
    }

    process(obj:any):PromiseLike<any>
    {
        this.app.services.logger.log.call(this, types.app.LogLevel.Trace, 'Processor.process', obj);

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
                    this.app.services.moduleSystem.import(this.app.services.transformer.transform(JSON.stringify(obj)).output).then((exported:any) => {
                        try{
                            this.parse(exported.default || exported, "af", 0).then(resolve, reject);
                        }
                        catch(e) {
                            reject(e);
                        }
                        
                    }, (rs:any) =>reject(rs)); 
                }
                else 
                    this.parse(obj, "af", 0).then(resolve, reject);
            }
            catch(e) {
                reject(e);
            }
        });
    }

}