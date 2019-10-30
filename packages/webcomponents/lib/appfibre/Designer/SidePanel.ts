import { types } from "@appfibre/types";
//import { events, Designer_Load, Designer_Select } from "./types";
import Style, {css} from '../Layout/Style';
import {TabContainer} from "../Layout/TabContainer";

type props = {
    placement?:"left"|"right"|"top"|"bottom",
    name?: string,
    tabs?: Array<string>

}

type state = {
    selectedIndex: number
}

const classes = {
      'SidePanel': css('.WebComponents_Designer_SidePanel', [ 'display: table-cell', 'vertical-align: top', 'height: 100%', 'overflow: auto', 'border: 1px solid transparent' ] )
}

let SidePanel /*: fibre.UI.Component<any,any>*/ = function inject(app:types.webapp.IWebAppLoaded) {

    return class SidePanel extends app.services.UI.Component<props, state>
    {
        context: any;
        base?: HTMLElement | undefined;
        props:props
        state:state

        constructor(props:props) {
            super(props);
            this.props = props;
            this.state = {selectedIndex: -1};
        }

        componentWillMount() {
            //window.addEventListener("click", this.window_click);
            //app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
            //document.body.onclick = function () {debugger;};
        }
        
        componentWillUnmount() {
            //app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
            //window.removeEventListener("click", this.window_click);
        }

        render() {
            var placement = this.props.placement || "top";
            var v = placement === "top" || placement === "bottom";
            var width = v ? '100%' : (this.state.selectedIndex > -1 ? '300px' : '1px');
            var height = v  ? (this.state.selectedIndex > -1 ? '300px' : '1px') : '100%';
            var resize = this.state.selectedIndex > -1 ? (v ? 'vertical' : 'horizontal') : undefined;
            var direction = placement === "right" ? "rtl" : "ltr";

            return super.render(
                [ "div"
                ,  { className: classes.SidePanel, style: { width, height, resize, direction}}
                ,  [ [ "div", {style: {direction: "ltr", width: "100%", height: "100%"}} 
                        , [ [ TabContainer
                            , { tabStripStyle: v ? { height: "25px" } : { width: "40px"}, placement, tabs: this.props.tabs, selectedIndex: this.state.selectedIndex, onSelectedIndexChanged: (index:number) => this.setState({selectedIndex: this.state.selectedIndex === index ? -1 : index})}
                            , this.state.selectedIndex > -1 ? [ [ "div", {}, "------content------"] ] : null 
                            ] 
                          ]
                    ] ] 
                ]
            );
        }
    }
}

export {SidePanel};
