import { events, Designer_Select, Designer_Load } from "./types";
import { types } from "@appfibre/types";
import * as Layout from "../Layout";

let menus = [ [ "File", [ [ "div", null, "File content"] ] ] 
            , [ "Edit", [ [ "div", null, "Edit content"] ] ] 
            , [ "View", [ [ "div", null, "View content"] ] ] 
            , [ "Insert", [ [ "div", null, "Insert content"] ] ]
            , [ "Layout", [ [ "div", null, "Layout content"] ] ]
            , [ "Data", [ [ "div", null, "Data content"] ] ] 
            ];


let DesktopRibbon /*: fibre.UI.Component */= function inject(app:types.app.IAppLoaded) {
    return class DesktopRibbon extends app.services.UI.Component<any, {selectedContext: types.app.IEventData<Designer_Select>|null, source?: string|null, url: string}> {
        constructor(props:any) {
            super(props);
            this.state = {selectedContext: null, source: null, url: './pages/latest/index.json'};
            //this.onMessage = this.onMessage.bind(this);
            //this.edit = this.edit.bind(this);
            this.url_change = this.url_change.bind(this);
            this.navigate_click = this.navigate_click.bind(this);
            this.edit_click = this.edit_click.bind(this);
            this.onSelect = this.onSelect.bind(this);
        }

        componentDidMount() {
            //this.setState({url: this.props.document});
            //window.addEventListener('message', this.onMessage);
            app.services.events.subscribe(events["Designer.Intercept.Select"](), this.onSelect);
        }

        componentWillUnmount() {
            //window.removeEventListener('message', this.onMessage);
            app.services.events.unsubscribe(events["Designer.Intercept.Select"](), this.onSelect);
        }

        url_change(ev: any) {
            this.setState({url: ev.target.value});
        }

        navigate_click() {
            app.services.events.publish(events["Designer.Load"]({url: this.state.url}));
        }

        edit_click() {
            if (this.state.selectedContext && this.state.selectedContext.data.control)
                app.services.events.publish(events["Designer.Load"]({url: this.state.selectedContext.data.control.url}));
        }

        render() {

            return super.render(    [ 'div'
                                    , {}
                                    , [
                                            [ 'div', {},    [ [ 'input', {type: 'text', 'style': { width: 'calc(100% - 45px)', background: 'transparent'}, value: this.state.url, onChange: this.url_change} ]
                                                          , [ 'button', {style: { float: 'right'}, onClick: this.navigate_click}, 'GO' ]
                                                          ]
                                            ]

                                        ,   [ Layout.TabContainer
                                            ,   { placement: "top", tabs: menus.map(m => m[0])
                                                , style: { width: "100%"}
                                                , tabStyle: {  width: "100px", textAlign: "center", display: "inline-block", borderBottom: "1px solid grey", cursor: "hand" } 
                                                , selectedTabStyle: { display: "inline-block", width: "100px", textAlign: "center", fontWeight: "bold", borderLeft: "1px solid grey", borderTop: "1px solid grey", borderRight: "1px solid grey", cursor: "default"} 
                                                }
                                            , menus.map(m => m[2])
                                            ]

                                        , [ 'label', {}, this.state.selectedContext && this.state.selectedContext.data.control ? this.state.selectedContext.data.control.url : '(none)' ]
                                        , this.state.selectedContext && this.state.selectedContext.data.control && this.state.selectedContext.data.canEdit ? ['button', {onClick: this.edit_click}, 'Edit'] : ['span', {}, '------']
                                    ]
                                    ]);
        }

        /*edit() {
            if (this.state.selectedContext && this.state.selectedContext.control) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET',  this.state.selectedContext.control.file);
                xhr.setRequestHeader('Content-Type', 'application/jst');
                xhr.send();
                var context = this;
                xhr.addEventListener('load', function(this: XMLHttpRequest, e: ProgressEvent) {
                    if (this.status === 200)
                        context.state.source.postMessage({eventType: 'edit', editMode: 'inline', correlationId: context.state.selectedContext.correlationId}, location.href);
                    });
            }
        }

        onMessage(ev: any) {
            if (this.props.document && this.props.document.substr(0, ev.origin.length) === ev.origin && ev.data) {
                switch (ev.data.eventType) {
                    case 'select':
                        if (this.state.selectedContext && this.state.selectedContext.correlationId && ev.source)
                            ev.source.postMessage({eventType: 'deselect', correlationId: this.state.selectedContext.correlationId}, location.href);
                        this.setState({selectedContext: ev.data, source: ev.source});
                    break;
                }
            }
        }*/

        onSelect(ev:types.app.IEventData<Designer_Select>) {
            this.setState({selectedContext: ev});
            app.services.events.publish(events["Designer.Select"](ev));
        }

    }
}

export { DesktopRibbon }