import { types } from ".";

declare class Promise<T>  {
  constructor(resolver: Function);
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
  static all(promises: Promise<any>[]): Promise<any>;
  static race(promises: Promise<any>[]): Promise<{}>;
}

//export type PromiseConstructor = new <T>(executor: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void) => IPromise<T>;


export interface IApp {
  main: object|Array<object>
  defaultState?: Object 
  stateChanged?:Function
  disableIntercept?:boolean
  options?:IOptions
  services?:IServices
  controllers?:{[index:string]:IController|Constructable<IController>}
  context?:IContext
  components?:{[name:string]:any}|Function
}

export interface IAppLoaded extends IApp {
  services:IServicesLoaded
  controllers:{[name:string]: IController}
  options:IOptions
  run():PromiseLike<any>
}

export interface IEventType {
  type:string
  correlationId?:string
}

export interface IEventData extends IEventType {
  data:any
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

export interface Constructable<T> {
    new (app:IAppLoaded) : T;
}

export interface ILogger {
  log: (logLevel:LogLevel, title?:string, optionalParameters?:any[])=>string|void;
}

export interface IServices {
    moduleSystem?:IModuleSystem|Constructable<IModuleSystem>
    transformer?:ITransformer|Constructable<ITransformer>
    logger?:ILogger|Constructable<ILogger>
    UI?:IUI|Constructable<IUI>
    navigation?:INavigation|Constructable<INavigation>
    data?:IData|Constructable<IData>
}

export interface IServicesLoaded extends IServices {
   moduleSystem:IModuleSystem
   transformer:ITransformer
   logger:ILogger
   UI:IUI
   navigation:INavigation
   processor:IProcessor
   events: {
    subscribe(eventType:IEventType, callback:(data:IEventData)=>any):void
    publish(data:IEventData):any
  }
}

export interface IUI {
    render(ui:any, parent?:any, mergeWith?:any):any
    //processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any
    processElement(element:any, depth:number, index?:number) : any
    Component:any
    //render:any
}

export interface INavigation {
    resolve(container?:string):any
    a:Function
    Container:Function
}

export interface IData {
  bind:Function
  format:Function
}

export interface IOptions {
  title?:string
  web?:IWebOptions
  logLevel?:LogLevel
  basePath?:string
}

export interface IProcessor {
  resolve(fullpath:string) : any
  BaseComponent() : any
  locate(resource:any, path:string) : any
  //processElement(ar : Array<any>, supportAsync?: boolean, light?:boolean):any
  //parse(obj:any, key?:number|undefined, supportAsync?:boolean):any

  process(obj:any):Promise<any>
}

export interface IWebOptions {
  target?: string|HTMLElement|null
}

export interface IModuleSystem {
  /*load (url : string, parent?: any) : PromiseLike<any> 
  exec(source:string, url?:string) :any*/
  import(moduleName: string, normalizedParentName?: string): PromiseLike<any>
  instantiate(url:string, parent?:any):Promise<any>
  init(basePath?:string):void
}

export interface IContext {

}

export interface ITransformSettings {
  async?: boolean
  indent?: string
  compact?: boolean
  namedExports?: boolean
  preferConst?: boolean
  module: ModuleSystem | ModuleSystem.None
  parsers?:{[key:string]:IParser}
  dangerouslyProcessJavaScript?: boolean
  runtimeModule?: ModuleSystem
 }


export interface ITransformer {
  transform (intput:string|object, name?:string):ITransformOutput
}

export interface ITransformOutput {
  code: string
  imports:any[string]
  exports:{[key:string]:string}
  compositeObject:boolean
  name?:string
}

export type IParser = (obj:any, output:ITransformOutput, offset:number, resolve?:Function, reject?:Function) => string|undefined;

export enum ModuleSystem {
    None = "none",  
    CommonJS = "commonjs",
    AMD = "amd",
    UMD = "umd",
    ES = "es"
}
export enum LogLevel {
  "None"=0,
  "Exception"=1,
  "Error"=2,
  "Warn"=3,
  "Info"=4,
  "Trace"=5
}