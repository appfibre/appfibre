export module appfibre {
    export namespace app {
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
              UI?:IUI|Constructable<IUI, T>
              navigation?:INavigation|Constructable<INavigation, T>
              data?:IData|Constructable<IData, T>
              events?:IEvents|Constructable<IEvents, T>
              externals?:{[index:string]:object}
          }
          
          export interface IServicesLoaded<T> extends IServices<T> {
              moduleSystem:IModuleSystem
              transformer:ITransformer
              logger:ILogger
              UI:IUI
              navigation:INavigation
              processor:IProcessor
              events:IEvents
              externals:{[index:string]:object}
          }
          
          export interface IEvents {
            subscribe<T>(eventType:IEventType, callback:(data:IEventData<T>)=>any):void
            unsubscribe<T>(eventType:IEventType, callback:(data:IEventData<T>)=>any):void
            publish<T>(data:IEventData<T>&{data?:T}, target?:{postMessage: (message:any, targetOrigin:string)=>void}):any[]
          }
          
          export interface IUI {
              render(node: any, parent?: Element | Document | ShadowRoot | DocumentFragment, mergeWith?: Element): Element;
              //render(ui:any, parent?:any, mergeWith?:any):any
              //processElement(tag:any, attributes?:object|undefined, children?:any|undefined) : any
              processElement(element:any, depth:number, index?:number) : any
              Component: typeof Component
              init?() : PromiseLike<void>|void
              //render:any
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
            //processElement(ar : Array<any>, supportAsync?: boolean, light?:boolean):any
            //parse(obj:any, key?:number|undefined, supportAsync?:boolean):any
          
            process(obj:any):PromiseLike<any>
            processElement(obj:element|promisedElement, index?:number):any
            init(obj:{default:element|promisedElement}):element|promisedElement
          }
                
          export interface IModuleSystem {
            /*load (url : string, parent?: any) : PromiseLike<any> 
            exec(source:string, url?:string) :any*/
            import(moduleName: string, normalizedParentName?: string): PromiseLike<any>
            instantiate(url:string, parent?:any):Promise<any>
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
            parsers?:{[key:string]:IParser}
            dangerouslyProcessJavaScript?: boolean
            runtimeModule?: ModuleSystem
            }
          
          
          export interface ITransformer {
            transform (intput:string|object, name?:string):ITransformOutput
            _process(obj:any, esc:boolean, et:boolean, parseSettings:ITransformOutput, offset:number) : string
            settings:ITransformSettings
          }
          
          export interface ITransformOutput {
            code: string
            imports:any[string]
            exports:{[key:string]:string}
            compositeObject:boolean
            name?:string
          }
          
          export type IParser = (obj:any, output:ITransformOutput, offset:number, resolve?:Function, reject?:Function) => string|undefined;
          
          
          export type elementBase = [ string|Function, { [key:string]:any }?, (string|Function|{ [index:number]: elementBase}|{ [index:string]: elementBase})? ]
          export type element = elementBase|string|Function|{ [index:number]: element|Promise<element> };
          export type promisedElement = Promise<element>;          

          declare abstract class Component<P, S> {
            constructor(props?: P, context?: any);
          
              static displayName?: string;
              static defaultProps?: any;
          
              state: Readonly<S>;
              props: Readonly<P>;
              context: any;
              base?: HTMLElement;
          
              setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
              setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
          
              forceUpdate(callback?: () => void): void;
          
              render(props?: Readonly<P|element|promisedElement>, state?: Readonly<S>, context?: any): any;
          
          }
    }

    export namespace webapp {
        export enum browserType {
            "Opera", 
            "FireFox",
            "Safari",
            "IE", 
            "Edge",
            "Chrome",
            "Blink",
            "Unknown"
          }
        
        export interface IInfo extends app.IInfo {
            browser: browserType
          }
        
          export interface ISettings extends app.ISettings {
            target?: string|HTMLElement|null
            fullHeight?: boolean  
        }
        
        export interface IWebApp extends app.IApp<ISettings, IInfo> { }
        export interface IWebAppLoaded extends app.IAppLoaded<ISettings, IInfo> { }
     
        export namespace HTML {
            export type element = div|table;
        
            export type div = ["div", Partial<HTMLDivElement>?, (string|{ [index:number]: HTML.element})?];
            export type table = ["table", Partial<HTMLTableElement>?, Array<HTML.tr>?];
            export type tr = ["tr", Partial<HTMLTableRowElement>?, Array<HTML.td>?]
            export type td = ["td", Partial<HTMLTableCellElement>?, (string|{ [index:number]: HTML.element})?]
        }
        
    }


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

}
export default appfibre;
