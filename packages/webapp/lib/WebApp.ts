import { App, types } from "@appfibre/core";
import { WebUI } from "./services/WebUI";

declare class Promise<T> implements PromiseLike<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

export class WebApp extends App<types.webapp.ISettings, types.webapp.IInfo>
{
    //info: fibre.IInfo
    constructor(app:types.webapp.IWebApp = {main: []}/*, context?:object*/)
    {
        let t:Required<types.app.IApp<types.webapp.ISettings, types.webapp.IInfo>> = { ...app
            , info: {browser: types.webapp.browserType.Unknown, ...app.info} 
            , services: {UI: app.services && app.services.UI || WebUI, ...app.services}  
            , settings: app.settings || {}  
            , controllers: {...app.controllers }
            , components: {...app.components }  
        };
        super(t);
    }

    initApp() : PromiseLike<void>|void
    {
        if (typeof document === "object") { // web app
            var w:any = window;
            var g:any = global;
            var d:any = document;
            let bt = types.webapp.browserType.Unknown;
            if (w && g && d) {
                if (g.InstallTrigger !== undefined) this.info.browser = types.webapp.browserType.FireFox;
                else if (/*@cc_on!@*/false || !!d.documentMode) bt = types.webapp.browserType.IE;
                else if (!!w.StyleMedia) bt = types.webapp.browserType.Edge;
                else if (/constructor/i.test(w.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!w['safari'] || (typeof g.safari !== 'undefined' && g.safari.pushNotification))) bt = types.webapp.browserType.Safari;
                else if (!!w.chrome && (!!w.chrome.webstore || !!w.chrome.runtime)) bt = types.webapp.browserType.Chrome;
                else if ((Object.getOwnPropertyDescriptor(window, "opr") && Object.getOwnPropertyDescriptor(window, "addons")) || Object.getOwnPropertyDescriptor(window, "opera") || navigator.userAgent.indexOf(' OPR/') >= 0) bt = types.webapp.browserType.Opera;
                if ((bt === types.webapp.browserType.Chrome || bt === types.webapp.browserType.Opera) && !!w.CSS) bt = types.webapp.browserType.Blink;
            }
            this.info.browser = bt;

            if (!this.settings.baseExecutionPath && document.head)
                this.settings.baseExecutionPath = document.head.baseURI;
            
        } 
        return super.initApp();
    }

    run() : PromiseLike<Element>{
        this.services.logger.log.call(this, types.app.LogLevel.Trace, 'App.run');
        return new Promise((resolve:any, reject:any) => {
            Promise.resolve(this.initApp()).then(() => {
                  let main = this.services.navigation.resolve.apply(this);
                  this.render(main).then(resolve, err => { this.services.logger.log.call(this, types.app.LogLevel.Error, err.message, err.stack); reject(err); this.render(["pre", {}, err.stack]) })
                  }, (e) => {this.services.logger.log.call(this, types.app.LogLevel.Error, e); reject(e)});
            
        });
    }

    private render(ui:any) 
    {
        return new Promise( (resolve:Function, reject:Function) => {
            this.services.logger.log.call(this, types.app.LogLevel.Trace, 'App.render', [{ui}]);
            this.services.processor.process(ui).then((value) => { 
                try {

                    let target:Element|null = null;
                    if (typeof document === "object") { // web app
                        if (typeof this.settings.target === "string") 
                            target = document.getElementById(this.settings.target);
                        else if (this.settings.target && this.settings.target.tagName === "IFRAME") {
                            let fr = <HTMLIFrameElement>this.settings.target;
                            if (fr.contentDocument)
                                target = !fr.contentDocument.body ? fr.contentDocument.createElement('BODY') : fr.contentDocument.body;
                        } else if (!document.body) 
                            document.body = document.createElement('BODY');
                        else target = document.body;

                        if (target && target.tagName === "BODY") {
                            let body = <HTMLBodyElement>target;
                            let doc = (<HTMLDocument>(body.ownerDocument ? body.ownerDocument : document.body));
                            target = doc.getElementById("main") || function(this:types.webapp.IWebApp) { 
                                let d = body.appendChild( (<HTMLDocument>(body.ownerDocument ? body.ownerDocument : document.body)).createElement("div")); 
                                if (this.settings && this.settings.fullHeight) 
                                {
                                    body.style.height = body.style.height || "100vh";
                                    body.style.margin = body.style.margin || "0px";
                                    d.style.height = "100vh";
                                }
                                return d; 
                            }.apply(this);
                            if (target && !target.id) target.setAttribute("id", "main");
                        } else if (this.settings.target !== null) throw new Error(`Cannot locate target (${this.settings.target?'not specified':this.settings.target}) in html document body.`);
                        if (this.settings.title) document.title = this.settings.title;
                        //if (module && module.hot) module.hot.accept();
                        if (target && target.hasChildNodes()) target.innerHTML = "";
                        
                    } 
                    //throw new Error("Document node undefined.  Are you running WebApp in the context of a browser?");
                    resolve(this.services.UI.render(value, target ? target : undefined ));
                    
            } catch (e) {
                reject(e);
                }
            } , r=>reject(r));            
        });
    }

}