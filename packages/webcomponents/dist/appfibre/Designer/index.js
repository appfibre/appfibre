"use strict";
exports.__esModule = true;
exports.Designer = void 0;
var DesktopDesigner_1 = require("./DesktopDesigner");
var DesignerFrame_1 = require("./DesignerFrame");
//alert( JSON.stringify(styles.default) );
/*let Designer = (window.parent === window) ? DesktopDesigner : function transform(this:types.IAppLoaded, a:any, c:any) {
    let app = this;
    this.services.processor.init = (obj:{default:any, [index:string]:any}) => typeof obj.__esModule === "string" ? [Intercept, {file: obj.__esModule}, [obj.default]] : obj.default;
    return app.main;
};*/
var Designer = (window.parent === window) ? DesktopDesigner_1.DesktopDesigner : DesignerFrame_1.DesignerFrame;
exports.Designer = Designer;
