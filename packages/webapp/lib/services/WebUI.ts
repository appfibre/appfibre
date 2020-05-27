import { types } from "@appfibre/types"
import { render, Component, createElement } from "../components/ui"
export class WebUI implements types.app.IUI<Element>
{
    Component: any;
    private app:types.webapp.IWebAppLoaded;
    renderInternal:any;
    createElement:any;
    type:"UI"
    constructor(app:types.webapp.IWebAppLoaded)
    {
        this.type="UI";
        this.app = app;
        this.app.settings = this.app.settings || {};
    }

    init() : PromiseLike<void>|void {
        if (typeof window === "object") {
            var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React"));
            if (obj) {
                this.createElement = obj.value.h || obj.value.createElement;
                this.Component = obj.value.Component;
                this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM")||{value: null}).value.render;
            } else {
                this.createElement = createElement;
                this.Component = Component;
                this.renderInternal = render;
            }
        }
    }

    render(ui:any, parent?:any, mergeWith?:any)
    {
        if (this.renderInternal){
            this.app.services.logger.log.call(this, types.app.LogLevel.Trace, "WebUI.render", [ui]);
            return this.renderInternal(ui, parent, mergeWith);
        }
        else
            this.app.services.logger.log.call(this, types.app.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    }

    
}