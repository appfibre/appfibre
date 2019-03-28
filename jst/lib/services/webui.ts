import { IUI, IAppLoaded, LogLevel } from "../types";

export class WebUI implements IUI
{
    Component: any;
    app:IAppLoaded;
    renderInternal:any;
    type:"UI"
    constructor(app:IAppLoaded)
    {
        this.type="UI";
        this.app = app;
        this.app.options = this.app.options || {};
        if (window) {
            var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "react"));
            if (obj) {
                this.processElement = obj.value.h;
                this.Component = obj.value.Component;
                this.renderInternal = obj.value.render;
            }
        }
    }

    render(ui:any, parent?:any, mergeWith?:any)
    {
        if (this.renderInternal)
            return this.renderInternal(ui, parent, mergeWith);
        else
            this.app.services.logger.log.call(this, LogLevel.Error, "Unable to render UI - No UI framework detected.", "Ensure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    }

    processElement(tag: any, attributes?: object | undefined, children?: any) {
        // expected to be implemented.
        this.app.services.logger.log.call(this, LogLevel.Error, "Unable to process UI element - No UI framework detected.", "Ensure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    }
    
}