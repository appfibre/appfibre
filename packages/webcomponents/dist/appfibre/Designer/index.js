import { DesktopDesigner } from "./DesktopDesigner";
import { DesignerFrame } from "./DesignerFrame";
//alert( JSON.stringify(styles.default) );
/*let Designer = (window.parent === window) ? DesktopDesigner : function transform(this:types.IAppLoaded, a:any, c:any) {
    let app = this;
    this.services.processor.init = (obj:{default:any, [index:string]:any}) => typeof obj.__esModule === "string" ? [Intercept, {file: obj.__esModule}, [obj.default]] : obj.default;
    return app.main;
};*/
var Designer = (window.parent === window) ? DesktopDesigner : DesignerFrame;
export { Designer };
