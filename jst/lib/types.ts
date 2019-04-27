import { IPromise } from "./services/promise";

export interface IApp {
  main: object|Array<object>
  defaultState?: Object 
  //ui?: {Component: any, processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any, render:any}
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

export type PromiseConstructor = new <T>(executor: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void) => IPromise<T>;
export interface IServices {
    promise?:PromiseConstructor&{ all(promises:IPromise<any>[]) : IPromise<any> }
    moduleSystem?:IModuleSystem|Constructable<IModuleSystem>
    transformer?:ITransformer|Constructable<ITransformer>
    logger?:ILogger|Constructable<ILogger>
    UI?:IUI|Constructable<IUI>
    navigation?:INavigation|Constructable<INavigation>
}

export interface IServicesLoaded extends IServices {
   promise:PromiseConstructor&{ all(promises:IPromise<any>[]) : IPromise<any> }
   moduleSystem:IModuleSystem
   transformer:ITransformer
   logger:ILogger
   UI:IUI
   navigation:INavigation
   processor:IProcessor
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
    container:Function
}

export interface IOptions {
  title?:string
  web?:IWebOptions
  logLevel?:LogLevel
  basePath?:string
}

export interface IProcessor {
  resolve(fullpath:string) : any
  construct(jstComponent : any) : any
  locate(resource:any, path:string) : any
  //processElement(ar : Array<any>, supportAsync?: boolean, light?:boolean):any
  //parse(obj:any, key?:number|undefined, supportAsync?:boolean):any

  process(obj:any):IPromise<any>
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