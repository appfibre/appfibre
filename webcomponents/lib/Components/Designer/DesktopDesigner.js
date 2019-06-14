var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { events } from "./types";
import { DesktopRibbon } from "./DesktopRibbon";
import { Layout } from "../Index";
var DesktopDesigner /*: fibre.UI.Component*/ = function inject(app) {
    return /** @class */ (function (_super) {
        __extends(Designer, _super);
        function Designer(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { src: props.src };
            _this.navigateTo = _this.navigateTo.bind(_this);
            _this.onRedirect = _this.onRedirect.bind(_this);
            _this.designer_Load = _this.designer_Load.bind(_this);
            return _this;
            // this.onMessage = this.onMessage.bind(this);
        }
        Designer.prototype.componentWillMount = function () {
            //window.onmessage = this.onMessage;
            if (window === window.parent) {
                app.services.events.subscribe({ type: "Navigation.Redirect" }, this.onRedirect);
            }
            app.services.events.subscribe(events["Designer.Load"](), this.designer_Load);
        };
        Designer.prototype.componentWillUnmount = function () {
            //document.body.style.margin = '';
            //document.body.style.background = '';
            if (window === window.parent) {
                app.services.events.unsubscribe({ type: "Navigation.Redirect" }, this.onRedirect);
            }
            app.services.events.unsubscribe(events["Designer.Load"](), this.designer_Load);
        };
        Designer.prototype.designer_Load = function (ev) {
            if (this.iframe && this.iframe.contentWindow)
                app.services.events.publish(ev, this["iframe"].contentWindow);
        };
        /* onMessage(ev) {
            if (this.state.document.startsWith(ev.origin) && ev.data )
            {
                switch (ev.data.eventType)
                {

                }
            }
        }  */
        Designer.prototype.componentDidMount = function () {
            document.body.style.margin = '0px';
            document.body.style.height = '100%';
        };
        Designer.prototype.navigateTo = function (url) {
            this.setState({ url: url });
        };
        Designer.prototype.onRedirect = function (event) {
            //debugger;cd
            //if (history && history.pushState) history.pushState(null, '', event.data); else location.replace(event.data);
        };
        Designer.prototype.render = function () {
            var _this = this;
            return _super.prototype.render.call(this, 
            /*[   Grid( "div"
                        , { style: { "display": "grid", "gridTemplateColumns": "100px auto 100px", "gridTemplateRows": "150px auto 100px", "height": "100vh", "width": "100vw" } }
                        , [
                              GridItem("div", { style: {"gridArea": "1/1/1/4", "background": "#AAA"}}, [[ DesktopRibbon, {register: this.props.register, document: this.state.url, navigateTo: this.navigateTo}]])
                            , GridItem("div", { style: {"gridArea": "2/1/2/1", "background": "red"}}, "left")
                            , GridItem("iframe", { style: {"gridArea": "2/2/2/2", "justifySelf": "stretch", "alignSelf": "stretch", border: '2px solid grey'}, src: location.href, ref: (e:any) => {this["iframe"] = e;}  })
                            , GridItem("div", { style: {"gridArea": "2/3/2/3", "background": "green"}}, "right")
                            , GridItem("div", { style: {"gridArea": "3/1/3/4", "background": "yellow"}}, "output")
                          ]
                    )
            ]*/
            ["div", { style: { height: "100%", backgroundColor: "#EEE", backgroundImage: "linear-gradient(#DEDEDE, #EFEFEF)" } },
                [[Layout.SplitContainer,
                        { direction: "column", defaults: [{ size: 120, min: 120, max: 120 }, {}, { size: 50, min: 50, max: 50 }] },
                        [[DesktopRibbon, {}, "top"],
                            [Layout.SplitContainer,
                                { direction: "row", defaults: [{ size: 350, min: 100, max: 500 }, {}, { size: 350, min: 100, max: 500 }] },
                                [[Layout.TabContainer, { placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"] }, [["div", {}, "tab 1 content"]]],
                                    ["iframe", { style: { width: "100%", height: "100%", background: "white" }, src: location.href, ref: function (e) { _this["iframe"] = e; } }],
                                    [Layout.TabContainer, { placement: "bottom", tabs: ["Tab1", "Tab2", "Tab3"] }, [["div", {}, "tab 1 content"]]]
                                ]
                            ],
                            ["div", {}, "bottom"]
                        ]]
                ]
                /*Flex( "div"
                        , { style: { display: "flex", "flexDirection": "column", "WebkitBoxOrient": "vertical", "alignItems": "stretch", "height": "100vh", "minHeight": "100%"} }
                        , [   FlexItem("div", { style: { "background": "#AAA", "flexBasis": "150px", "flexGrow": "0", "flexShrink": "0"}}, [[ DesktopRibbon, {register: this.props.register, document: this.state.url, navigateTo: this.navigateTo}]])
                            , FlexItem(   "div"
                                        , { style: { "flexGrow": "1", "alignSelf": "stretch"}}
                                        , [
                                            Flex( "div"
                                                , { style: { display: "flex", "flexDirection": "row", "flexGrow": "1", "flexShrink": "1", "height": "100%", "width": "100%", "alignItems": "stretch"} }
                                                , [ FlexItem("div", { style: {"flexBasis": "300px", "width": "300px", "flexShrink": "0", "flexGrow": "0", "background": "red"}}, "left")
                                                  , FlexItem("iframe", { style: { "flexGrow": "1", "flexShrink": "0", "justifySelf": "stretch", "alignSelf": "stretch", "height": "100%"}, src: location.href + ' ', ref: (e:any) => {this["iframe"] = e;}  }, "TEST")
                                                  , FlexItem("div", { style: {"flexBasis": "300px", "width": "300px", "flexShrink": "0", "flexGrow": "0", "background": "green"}}, "right")
                                                ]
                                            )
                                        ]
                              )
                            , FlexItem("div", { style: {"background": "yellow", "flexBasis": "100px", "flexShrink": "0"}}, "output")
                          ]
                    )*/
                /*[Layout.SplitContainer, {direction: "column", defaults: [ {size: 200, min: 100, max: 300}, {}, {size: 200},{}, {size: 200, min: 100, max: 300}]} , [
                      [ "div", null, [["p", {}, "I'm the left pane"], ["ul", , [["li", {}, "Item 1"], ["li", {}, "Item 2"]] ] ] ]
                      , [ "div", null, [["p", {}, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium at cum cupiditate dolorum, eius eum eveniet facilis illum maiores molestiae necessitatibus optio possimus sequi sunt, vel voluptate. Asperiores, voluptate!"]]]
                      , [ "div", null, [["p", {}, "I'm the right pane"], ["ul", {}, [["li", {}, "Item 1"], ["li", {}, "Item 2"]] ] ] ]
                      , [ "div", null, [["p", {}, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium at cum cupiditate dolorum, eius eum eveniet facilis illum maiores molestiae necessitatibus optio possimus sequi sunt, vel voluptate. Asperiores, voluptate!"]]]
                      , [ "div", null, [["p", {}, "I'm the right pane"], ["ul", {}, [["li", {}, "Item 1"], ["li", {}, "Item 2"]] ] ] ]
                     ]]*/
            ]);
        };
        return Designer;
    }(app.services.UI.Component));
};
export { DesktopDesigner };
3;
