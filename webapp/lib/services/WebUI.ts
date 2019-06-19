import appfibre from "@appfibre/types"
export class WebUI implements appfibre.app.IUI
{
    Component: any;
    private app:appfibre.webapp.IWebAppLoaded;
    renderInternal:any;
    processElementInternal:any;
    type:"UI"
    constructor(app:appfibre.webapp.IWebAppLoaded)
    {
        this.type="UI";
        this.app = app;
        this.app.settings = this.app.settings || {};
    }

    init() : PromiseLike<void>|void {
        if (typeof window === "object") {
            var obj = (Object.getOwnPropertyDescriptor(window, "preact") || Object.getOwnPropertyDescriptor(window, "React"));
            if (obj) {
                this.processElementInternal = obj.value.h || obj.value.createElement;
                this.Component = obj.value.Component;
                this.renderInternal = obj.value.render || (Object.getOwnPropertyDescriptor(window, "ReactDOM")||{value: null}).value.render;
            }
        }
    }

    render(ui:any, parent?:any, mergeWith?:any)
    {
        if (this.renderInternal){
            this.app.services.logger.log.call(this, appfibre.LogLevel.Trace, "WebUI.render", [ui]);
            return this.renderInternal(ui, parent, mergeWith);
        }
        else
            this.app.services.logger.log.call(this, appfibre.LogLevel.Error, "Unable to render UI - No UI framework detected. \nEnsure that you have referenced a UI framework before executing the application, or specify using app.services.UI");
    }

    private overrideStyles(style:any) {
        switch (this.app.info.browser) {
            case appfibre.webapp.browserType.Safari: 
                if (style.display === "flex") style.display = "-webkit-flex";
                if (style.flexDirection) style.WebkitFlexDirection = style.flexDirection;
                if (style.flexGrow) style.WebkitFlexGrow = style.flexGrow;
                if (style.flexShrink) style.WebkitFlexShrink = style.flexShrink;
                    if (style.backgroundImage && /linear-gradient/.test(style.backgroundImage)) style.backgroundImage = '-webkit-' + style.backgroundImage;
                    if (style.backgroundImage) console.log(style);
            break;
        }
    }

    // ether an element, or array of elements depending on depth == even or odd
    processElement(element:any, depth:number, index?:number) : any {
        if (depth % 2 === 0) 
        {
            if (typeof element != "string" && !Array.isArray(element)) {
                this.app.services.logger.log.call(this, appfibre.LogLevel.Error, "Child element [2] should be either a string or array", [{element: element}]);
                //throw new Error("Child element [2] should be either a string or array");
                return element;
            }
            else if (Array.isArray(element)) {
                if (index !== undefined) {
                    element[1] = element[1] || {};
                    if (!element[1].key) element[1].key = index;
                }

                if (element[1] && element[1].style) 
                    this.overrideStyles(element[1].style);
            }
            
            //if (Array.isArray(element) && element[1] && element[1].context && typeof element[1].context.intercept === "function")
            //    element = element[1].context.intercept(element);
        } 
        //console.log({element, index, depth, code: JSON.stringify(element)});
        return depth % 2 === 1 || !this.processElementInternal || !Array.isArray(element) ? element : this.processElementInternal.apply(this, element);
    }
    
}