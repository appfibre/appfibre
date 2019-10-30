import { events, Designer_Select, Designer_Load, EditMode, Edit_Event } from "./types";
import { types } from "@appfibre/types";
import * as Layout from "../Layout";
import { classes } from './Styles';
import styles from "../Layout/Styles";

type props = {
      style?:object
    , className?:string 
    , className_Tab?: string
    /*menuIndex_changed?:(menuIndex: number)=>void, menuIndex?:number*/
}

type state = {
      menuIndex:number
    , selectedContext: types.app.IEventData<Designer_Select>|null
    , source?: string|null
    , allowEdit: boolean
    , editMode?:EditMode
    , editing: { viewSource: boolean, activeFiles: Array<string>, selectedFile?: string}
}

let DesktopRibbon /*: fibre.UI.Component */= function inject(app:types.app.IAppLoaded) {
    type navigatorProps =  {
        url?:string
        activeFiles: Array<string>
        toggleActiveFile: (file:string)=>void
    }
    let navigator = function inject(app:types.app.IAppLoaded) {

        return class Navigator extends app.services.UI.Component<navigatorProps,{url?:string, allowEdit: boolean}> {
            state: {url:string, allowEdit:boolean}
            constructor(props:navigatorProps) {
                super(props);
                this.state = {url:this.props.url||'', allowEdit: false};
                this.url_change = this.url_change.bind(this);
                this.navigate_click = this.navigate_click.bind(this);
            }

            url_change(ev: any) { 
                this.setState({url: ev.target.value});
            }

            navigate_click() {
                app.services.events.publish(events["Designer.Load"]({url: this.state.url}));
            }

    
            render() {
                var toggle = (this.state.url && this.props.activeFiles.indexOf(this.state.url) > -1) ? classes.CommandButton_ToggleOn : classes.CommandButton_ToggleOff;
                return super.render([ "div"
                , { className: classes.RibbonNavigator, style: { background: "#DDD", overflow: "hidden" } }
                , [ [ "div"
                    , {}
                    , [   ["div", { }, [ [ 'input', { type: 'text', style: {  }, value: this.state.url, onChange: this.url_change} ] ] ]
                        , ["div", { title: 'Navigate To', style: {width: "25px"}, className: classes.CommandButton_NavigateTo, onClick: this.navigate_click}, [['div']] ] 
                        , ["div", { title: 'Edit', style: {width: '20px'}, className: toggle, onClick: () => this.props.toggleActiveFile(this.state.url)}, [['div']]]
                      ] 
                    ]  
                  ]
                ]);
            }
        }
    }

    return class DesktopRibbon extends app.services.UI.Component<props, state> {

        command_button(editMode:EditMode, title:string, className:string) {
            return { title: title, className: classes.CommandButton + ' ' + className + ' ' + (this.state.allowEdit ? this.state.editMode === editMode ? classes.CommandButton_Active : classes.CommandButton_Enabled : classes.CommandButton_Disabled), onClick: () => this.command_click(editMode)};
        }
                                                                    
        menus() {
            return [ 
                [ ["div", { className: styles.TableCell, style: {width: '40px', textAlign: 'center', verticalAlign: 'middle' }}, [[ "a", { className: classes.logo_Fibre }]]]]
              , [ "File", [ "div", {},
                      [ [ 'label', {}, this.state.selectedContext && this.state.selectedContext.data.control ? this.state.selectedContext.data.control.url : '(none)' ]
                    , this.state.selectedContext && this.state.selectedContext.data.control && this.state.selectedContext.data.canEdit ? ['button', {onClick: this.nav_click}, 'Edit'] : ['span', {}, '------']
                    ]]
                 ]
              , [ "Edit", [ Layout.CommandBar, { sections: [  { title: "Edit"
                                                            , commands: [ this.command_button(EditMode.Inline, 'Edit', classes.CommandButton_Edit)
                                                                        , this.command_button(EditMode.Source, 'Edit Source', classes.CommandButton_Source) 
                                                                        ]
                                                            } 
                                                         ,  { title: "Format" }
                                                         ] 
                                             , section_style: { height: "100%"}} ] ] 
            , [ "View", [ "div", null, "View content"] ] 
            , [ "Insert", [ "div", null, "Insert content"] ] 
            , [ "Layout", [ "div", null, "Layout content"] ]
            , [ "Data", [ "div", null, "Data content"] ] 
            , [ [ navigator, {url:this.state.selectedContext && this.state.selectedContext.data.control ? this.state.selectedContext.data.control.url:'', activeFiles: this.state.editing.activeFiles, toggleActiveFile: this.toggle_ActiveFile} ] ]
            ];
        }

        toggle_ActiveFile(filename:string) {    
            let files = this.state.editing.activeFiles;
            let index = files.indexOf(filename);
            if (index > -1) files.splice(index, 1); else files.push(filename);
            this.setState({editing: {...this.state.editing, activeFiles: files, selectedFile: filename}}, () => app.services.events.publish(events["Edit.Event"](this.state.editing)));
        }

        constructor(props:any) {
            super(props);
            this.state = {selectedContext: null, source: null, menuIndex: -1, allowEdit: false, editing: { viewSource: false, activeFiles: [] }};
            //this.onMessage = this.onMessage.bind(this);
            //this.edit = this.edit.bind(this);
            this.nav_click = this.nav_click.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.ribbon_toggle_edit = this.ribbon_toggle_edit.bind(this);
            this.command_click = this.command_click.bind(this);
            this.toggle_ActiveFile = this.toggle_ActiveFile.bind(this);
        }

        componentDidMount() {
            //this.setState({url: this.props.document});
            //window.addEventListener('message', this.onMessage);
            app.services.events.subscribe(events["Designer.Intercept.Select"](), this.onSelect);
            app.services.events.subscribe(events["Designer.Ribbon.ToggleEdit"](), this.ribbon_toggle_edit);
        }

        componentWillUnmount() {
            //window.removeEventListener('message', this.onMessage);
            app.services.events.unsubscribe(events["Designer.Intercept.Select"](), this.onSelect);
            app.services.events.unsubscribe(events["Designer.Ribbon.ToggleEdit"](), this.ribbon_toggle_edit);
        }

        nav_click() {
            if (this.state.selectedContext && this.state.selectedContext.data.control)
                app.services.events.publish(events["Designer.Load"]({url: this.state.selectedContext.data.control.url}));
        }

        command_click(editMode?:EditMode) {
            if (this.state.allowEdit && this.state.selectedContext && this.state.selectedContext.data.control) {
                const url = this.state.selectedContext.data.control;
                if (this.state.editMode === editMode) editMode = undefined;
                this.setState({editMode: editMode}, () => {
                    app.services.events.publish(events["Ribbon.Event"]({ editMode: editMode }));
                });
            }
        }

        ribbon_toggle_edit() {
            this.setState({menuIndex: this.state.menuIndex > -1 ? -1 : 1});
        }

        

        render() {
            var menus = this.menus();
            return super.render(    [ "div"
                                    , { className: this.props.className, style: { height: "0%", ...this.props.style} }
                                    , [   [ Layout.TabContainer
                                            ,   { placement: "top", tabs: menus.map(m => m ? m[0] : [])
                                                //, containerStyle: this.state.menuIndex < 0 ? { display: "none"} : { width: "100%", height: "100px", borderBottom: "1px solid #DDD" }
                                                , selectedIndex: this.state.menuIndex 
                                                , onSelectedIndexChanged: (index:number) => this.setState({menuIndex: this.state.menuIndex === index ? -1 : index})
                                                , className: classes.DesktopRibbon_TabContainer
                                                , className_Tab: this.props.className_Tab
                                                }
                                            , this.state.menuIndex >= 0 ? [menus[this.state.menuIndex][1]]: undefined
                                            ]
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
            this.setState({selectedContext: ev, allowEdit: ev.data.control ? true : false});
            app.services.events.publish(events["Designer.Select"](ev));
        }

    }
}

export { DesktopRibbon }