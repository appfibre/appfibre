import { UI as _UI } from './UI'
import { jst } from '../jst'

export namespace app {
  export import UI = _UI

  export interface Constructable<T, U=any> {
      new (arg:U) : T;
  }
  
  export interface ILogger {
    log: (logLevel:LogLevel, title?:string, optionalParameters?:any[])=>string|void;
  }

  export interface IApp<O,I> {
    main: object|Array<object>
    settings?:ISettings&O
    info?:IInfo&I
    services?:IServices<IAppLoaded<O, I>>
    controllers?:{[index:number]:IController|Constructable<IController, IApp<O, I>>}
    components?:{[name:string]:any}|Function
  }
    
  export interface IAppLoaded<O={},I={}> extends IApp<O, I> {
    services:IServicesLoaded<IAppLoaded<O, I>>
    controllers:{[name:string]: IController}
    settings:ISettings&O
    info: IInfo&I
    //run():PromiseLike<any>
  }
    
  export interface IEventType {
      type:string
      correlationId?:string
  }
      
  export interface IEventData<T> extends IEventType {
      data:T
  }
      
  export interface IInfo {
  }
      
  export interface IController {
      path:string
      match:{test:(url:string)=>boolean}
      resolve(args:{
        [key:string]:string;
        [index:number]:string
      }):any
      container?:string
  }
      
      
  export interface IServices<T> {
      moduleSystem?:IModuleSystem|Constructable<IModuleSystem, T>
      transformer?:ITransformer|Constructable<ITransformer, T>
      logger?:ILogger|Constructable<ILogger, T>
      UI?:IUI<any>|Constructable<IUI<any>, T>
      navigation?:INavigation|Constructable<INavigation, T>
      data?:IData|Constructable<IData, T>
      events?:IEvents|Constructable<IEvents, T>
      externals?:{[index:string]:object}
  }
    
  export interface IServicesLoaded<T> extends IServices<T> {
      moduleSystem:IModuleSystem
      transformer:ITransformer
      logger:ILogger
      UI:IUI<any>
      navigation:INavigation
      processor:IProcessor
      events:IEvents
      externals:{[index:string]:object}
  }
    
  export interface IEvents {
    subscribe<T>(eventType:IEventType, callback:(data:IEventData<T>)=>any):void
    unsubscribe<T>(eventType:IEventType, callback:(data:IEventData<T>)=>any):void
    publish<T={}>(data:IEventData<T>&{data?:T}, target?:{postMessage: (message:any, targetOrigin:string)=>void}):any[]
  }
    
  export interface IUI<BaseElement> {
      //render(node: any, parent?: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element|Text;
      //instantiate h<P>(node: ComponentFactory<P>,params: Attributes & P | null, ...children: ComponentChildren[]): VNode<any>;
      //render(ui:any, parent?:any, mergeWith?:any):any
      //processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any
      //processElement(element:any, depth:number, index?:number) : any
      //Component: typeof UI.AppComponent
      init?() : PromiseLike<void>|void
      //render:any

      createElement<P>(node: UI.ComponentFactory<P>, params: P | null, ...children: UI.ComponentChildren[]): UI.VNode<any>;
      render(node: UI.ComponentChild, parent: BaseElement): BaseElement
      Component: typeof UI.Component
  }
    
  export interface INavigation {
      current: {
        path: string
      }
      resolve(container?:string):any
      a:Function
      Container:Function
  }
    
  export interface IData {
    bind:Function
    format:Function
  }
    
  export interface ISettings {
    title?:string
    logLevel?:LogLevel
    baseExecutionPath?:string
    cdn?:{[index:string]:string}
  }
    
  export interface IProcessor {
    resolve(fullpath:string) : any
    locate(resource:any, path:string) : any
  
    process(obj:any):PromiseLike<any>
    processElement(obj:UI.ElementPromise, parentkey?:string, index?:number):any
    //init(obj:{default:UI.ElementPromise}, innerElement:boolean):UI.ElementPromise

    unwrapDefault(obj:any):UI.ElementPromise
  }

  export interface filedetail {
    text: string
    contentType: string
  }
        
  export interface IModuleSystem {
    /*load (url : string, parent?: any) : PromiseLike<any> 
    exec(source:string, url?:string) :any*/
    register(source:string, target:string):void
    fetch(url:string, headers?:Record<string, string>): PromiseLike<app.filedetail>
    import(moduleName: string, normalizedParentName?: string, references?:{[name:string]:any}): PromiseLike<any>
    instantiate(url:string, parent?:any, references?:{[name:string]:any}):Promise<any>
    init(basePath?:string):void
    resolve(name:string):string
  }
  
  export interface ITransformSettings {
    async?: boolean
    indent?: string
    compact?: boolean
    namedExports?: boolean
    preferConst?: boolean
    module: ModuleSystem | ModuleSystem.None
    parsers?:{ [key:string]:IParser }
    dangerouslyProcessJavaScript?: boolean
    runtimeModule?: ModuleSystem
    }
  
  
  export interface ITransformer {
    transform (input:jst.template, name?:string):ITransformOutput
    //_process(obj:any, esc:boolean, et:boolean, parseSettings:ITransformOutput, offset:number) : string
    process(obj:any, context:ITransformContext, esc:boolean, et:boolean, offset:number) : string
    loadModule(context:ITransformContext, val:string, offset:number) : string
    settings:ITransformSettings
  }
  
  export interface ITransformContext {
    references:{[key:string]:any}
    imports:any[string]
    exports:{[key:string]:string}
    compositeObject:boolean
    name?:string
  }

  export interface ITransformOutput extends ITransformContext {
    code: string
  }
    
  export type IParser = (transformer:ITransformer, context:ITransformContext, obj:any, offset:number /*output:ITransformOutput, offset:number, resolve?:Function, reject?:Function*/) => string|undefined;

  export enum LogLevel {
      "None"=0,
      "Exception"=1,
      "Error"=2,
      "Warn"=3,
      "Info"=4,
      "Trace"=5
    }
    
  export enum ModuleSystem {
      None = "none",  
      CommonJS = "commonjs",
      AMD = "amd",
      UMD = "umd",
      ES = "es"
  }

  export enum LicenseType {
    "MIT",
    "GNU"         
  }
}