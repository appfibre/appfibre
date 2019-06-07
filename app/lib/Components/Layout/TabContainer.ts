import { types } from "@appfibre/jst";
import { SplitContainer, SplitContainer_Attributes} from "./SplitContainer";

declare interface attr {
    placement?: "top"|"bottom"|"left"|"right"
    tabs: Array<string>
    selectedIndex?: number
};


let TabContainer : types.Component = function inject(app:types.IAppLoaded) {
    return class TabContainer extends app.services.UI.Component {
        
        constructor(props:attr) {
            super();
        }


        render() {
            if (app.info.web) {

                let children:any[] = [];
                let placement: "top"|"bottom"|"left"|"right" = this.props.placement || "top";
                let v = placement === "top" || placement === "bottom" ? true : false;
                let defaults = [];
                let index = this.props.selectedIndex || 0;
                
                if (placement === "top" || placement === "left") {
                    defaults.push( {size: 20, min: 20, max: 20});
                    children.push( ["div", null, "tabs"]);
                }
                defaults.push({});
                children.push( (this.props.children && this.props.children.length > index) ? this.props.children[index] : ["div", {}, "empty"] );
                if (placement === "bottom" || placement === "right") {
                    defaults.push( {size: 20, min: 20, max: 20});
                    children.push(["div", null, "tabs"]);
                }
                
                return super.render([  SplitContainer
                                    , { direction: (v ? "column" : "row"), defaults: defaults }
                                    , children]);
            }
        }

    };
}
/*
type Tab = [types.element|types.promisedElement, {title?:string}, Array<types.element|types.promisedElement>]
type TabContainer = [types.element, SplitContainer_Attributes, Array<Tab>];

var TabContainer = function transform(a:attr, c:Array<Tab>):TabContainer {
    let children:any[] = [];
    let placement: "top"|"bottom"|"left"|"right" = a.placement || "top";
    let v = placement === "top" || placement === "bottom" ? true : false;
    let defaults = [];
    let index = a.selectedIndex || 0;
    
    if (placement === "top" || placement === "left") {
        defaults.push( {size: 20, min: 20, max: 20});
        children.push( ["div", null, "tabs"]);
    }
    defaults.push({});
    //children.push( (c && a.children.length > index) ? this.props.children[index] : ["div", {}, "empty"] );
    children.push(["div", {}, "(empty)"])

    if (placement === "bottom" || placement === "right") {
        defaults.push( {size: 20, min: 20, max: 20});
        children.push(["div", null, "tabs"]);
    }
                
    return  [ SplitContainer
            , { direction: (v ? "column" : "row"), defaults: defaults }
            , children
            ];
}
*/
export {TabContainer};
