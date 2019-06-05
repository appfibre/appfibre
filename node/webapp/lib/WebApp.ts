import { App } from "@appfibre/core";
import { WebUI } from "./services/WebUI";
import * as types from "./types";

declare class Promise<T> implements PromiseLike<T> {
    constructor(resolver: Function);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    static all(promises: Promise<any>[]): Promise<any>;
    static race(promises: Promise<any>[]): Promise<{}>;
    static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

export class WebApp extends App<types.IOptions, types.IInfo>
{
    //info: fibre.IInfo
    constructor(app:types.IWebApp = {main: []}, context?:object)
    {
        let t:Required<types.IApp<types.IOptions, types.IInfo>> = { ...app
            , info: {browser: types.browserType.Unknown, ...app.info} 
            , services: {UI: app.services && app.services.UI || WebUI, ...app.services}  
            , options: app.options || {}  
            , controllers: {...app.controllers }
            , components: {...app.components }  
        };

        super(t);

        if (typeof document === "object") { // web app
            var w:any = window;
            var g:any = global;
            var d:any = document;
            let bt = types.browserType.Unknown;
            if (w && g && d) {
                if (g.InstallTrigger !== undefined) this.info.browser = types.browserType.FireFox;
                else if (/*@cc_on!@*/false || !!d.documentMode) bt = types.browserType.IE;
                else if (!!w.StyleMedia) bt = types.browserType.Edge;
                else if (/constructor/i.test(w.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!w['safari'] || (typeof g.safari !== 'undefined' && g.safari.pushNotification))) bt = types.browserType.Safari;
                else if (!!w.chrome && (!!w.chrome.webstore || !!w.chrome.runtime)) bt = types.browserType.Chrome;
                else if ((Object.getOwnPropertyDescriptor(window, "opr") && Object.getOwnPropertyDescriptor(window, "addons")) || Object.getOwnPropertyDescriptor(window, "opera") || navigator.userAgent.indexOf(' OPR/') >= 0) bt = types.browserType.Opera;
                if ((bt === types.browserType.Chrome || bt === types.browserType.Opera) && !!w.CSS) bt = types.browserType.Blink;
            }
            this.info.browser = bt;
        } 
    }

    run() {
        this.services.logger.log.call(this, types.LogLevel.Trace, 'App.run');
        let main:any = null;
        return new Promise((resolve:any, reject:any) => {
            try {
                this.initApp();
                main = this.services.navigation.resolve.apply(this);
            } catch (e) {
                this.services.logger.log.call(this, types.LogLevel.Error, e);
                reject(e);
            }
            this.render(main).then(resolve, err => { this.services.logger.log.call(this, types.LogLevel.Error, err.message, err.stack); reject(err); this.render(["pre", {}, err.stack]) });
        });
    }

    private render(ui:any) 
    {
        return new Promise( (resolve:Function, reject:Function) => {
            this.services.logger.log.call(this, types.LogLevel.Trace, 'App.render', [{ui}]);
            this.services.processor.process(ui).then((value) => { 
                try {

                    let target:Element|null = null;
                    if (typeof document === "object") { // web app
                        if (typeof this.options.target === "string") 
                            target = document.getElementById(this.options.target);
                        else if (this.options.target && this.options.target.tagName === "IFRAME") {
                            let fr = <HTMLIFrameElement>this.options.target;
                            if (fr.contentDocument)
                                target = !fr.contentDocument.body ? fr.contentDocument.createElement('BODY') : fr.contentDocument.body;
                        } else if (!document.body) 
                            document.body = document.createElement('BODY');
                        target = target || document.body;
                        if (target.tagName === "BODY") {
                            let body = <HTMLBodyElement>target;
                            let doc = (<HTMLDocument>(body.ownerDocument ? body.ownerDocument : document.body));
                            target = doc.getElementById("main") || function(this:types.IWebApp) { 
                                let d = body.appendChild( (<HTMLDocument>(body.ownerDocument ? body.ownerDocument : document.body)).createElement("div")); 
                                if (this.options && this.options.fullHeight) 
                                {
                                    body.style.height = body.style.height || "100%";
                                    d.style.height = "100%";
                                }
                            return d; 
                            }.apply(this);
                            if (!target.id) target.setAttribute("id", "main");
                        } else 
                        if (this.options.target == null) throw new Error(`Cannot locate target (${this.options.target?'not specified':this.options.target}) in html document body.`);
                        if (this.options.title) document.title = this.options.title;
                        //if (module && module.hot) module.hot.accept();
                        if (target.hasChildNodes()) target.innerHTML = "";
                    } 
                    else throw new Error("Document node undefined.  Are you running WebApp in the context of a browser?");
                    resolve(this.services.UI.render(value, target));
            } catch (e) {
                reject(e);
                }
            } , r=>reject(r));            
        });
    }

}