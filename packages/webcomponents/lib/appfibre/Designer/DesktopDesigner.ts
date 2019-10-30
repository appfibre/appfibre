import types from "@appfibre/types";
import { events, Designer_Load } from "./types";
import { DesktopRibbon } from "./DesktopRibbon";
import { DesignerViewPort } from "./DesignerViewport";
import { SidePanel } from './SidePanel';
import { classes } from './Styles';


let DesktopDesigner /*: fibre.UI.Component*/ = function inject(app:types.app.IAppLoaded) {
    return class Designer extends app.services.UI.Component<any, {src?: string, url?: string, leftMenuIndex: number, rightMenuIndex: number}>
    {
        iframe?:HTMLFrameElement
        constructor(props:{src?:string}) {
            super(props);
            this.state = {src: props.src, leftMenuIndex: -1, rightMenuIndex: -1};
            this.navigateTo = this.navigateTo.bind(this);
            //this.designer_Load = this.designer_Load.bind(this);
            // this.onMessage = this.onMessage.bind(this);
            document.body.style.position = "absolute"
            document.body.style.top  = document.body.style.left = document.body.style.right = document.body.style.bottom = "0";
            document.body.style.overflow = "hidden";
        }

        componentDidMount() {
            document.body.style.margin = '0px';
            document.body.style.height = '100%';
        }

        navigateTo(url: string) {
            this.setState({url});
        }

        render() {
            return super.render(
                       [ "div", {style: {display: "table", width: "100%", height: "100%",backgroundColor: "#EEE", backgroundImage: "linear-gradient(#BBB, #F0F0F0)"  }}
                        ,   [   [ DesktopRibbon, { className: classes.DesktopRibbon, className_Tab: classes.DesktopRibbon_Tab } ]
                            ,   ["div", {style: {display: "table", width: "100%", height: "100%"}}
                                ,   [   [ SidePanel, { name:"leftSidePanel", className: classes.SidePanel, placement: "left", tabs: [{title:'Explore', className:classes.Tab_Explore}] } ],
                                    ,   [ DesignerViewPort, {style: {display: "table-cell", resize: "horizontal"}} ]
                                    ,   [ SidePanel, { name:"rightSidePanel", className: classes.SidePanel, placement: "right", tabs: [{title:'Properties', className: classes.Tab_Properties }] } ]
                                    ] 
                                ]
                            ,   [ "div", {style: {display: "table-row", height: "0%" }}, [[ SidePanel, { name:"bottomSidePanel", className: classes.SidePanel, placement: "bottom", tabs: ['Logs'] } ]]]
                            ]
                        ]
                    

                    /*[   "div", {style: {display:"table", height: "100%", width: "100%", backgroundColor: "#EEE", backgroundImage: "linear-gradient(#BBB, #F0F0F0)"}}, 
                
                    [   [ DesktopRibbon, {className: styles.desktopRibbon} ]
                      , [ Layout.SplitContainer
                        , { direction: "column", defaults: [ {}, {size: 50, min: 50, max: 50}], style: {display: "table-cell"} }
                        , [ [ Layout.SplitContainer
                            , { direction: "row", defaults: [ {size: 350, min: 100, max: 500}, {}, {size: 350, min: 100, max: 500}]}
                            , [ [ Layout.TabContainer, {placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"]}, [ [ "div", {}, "------content------"] ] ] 
                              , [ DesignerViewPort ]
                              , [ Layout.TabContainer, { placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"] }, [ [ "div", {}, "------content------"] ] ]
                              ]
                            ]
                            , [ "div", {style: { display: "table-row"}}, "Footer" ]
                          ]
                        ]
                    ]
                ]*/
                /*
                       [ "div", {style:{display: "table", width: "100%", height: "100%" }}
                        ,   [   [ "div", {style: {display: "table-row", background: 'red', height: "10px" }}, 'Header']
                            ,   ["div", {style: {display: "table", width: "100%", height: "100%"}}
                                ,   [   [ "div", {style: {display: "table-cell", borderRight: "1px solid grey",padding: "20px",  width: "300px", resize: "horizontal", overflowY: "auto"}}, "Panel"]
                                    ,   [ "div", {style: {display: "table-cell", resize: "horizontal"}}, "center" ]
                                    ,   [ "div", {style: {display: "table-cell", borderLeft: "1px solid grey", padding: "20px",  width: "300px", resize: "horizontal", overflowY: "auto", direction: "rtl", textAlign: "left"}}, "Panel"]
                                    ] 
                                ]
                            ,   [ "div", {style: {display: "table-row", background: 'red', height: "10px" }}, 'Footer']
                            ]
                        ]
                */

                );
        }
    }
}

export {DesktopDesigner};