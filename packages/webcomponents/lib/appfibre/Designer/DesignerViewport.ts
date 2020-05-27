import { types } from "@appfibre/types";
import { events, Designer_Load, Designer_Select, Ribbon_Event, EditMode, Edit_Event } from "./types";
import styles from '../Layout/Styles';
import { classes } from './Styles';
import { TabContainer } from "../Layout";
import CodeMirror from "../../codemirror"

type file = {
    content: string
}

type state = {
    selectedIndex?: number
    editMode?: EditMode
    sources: {[filename:string]:file}
}

let DesignerViewPort /*: fibre.UI.Component<any,any>*/ = function inject(app:types.webapp.IWebAppLoaded) {

    return class DesignerViewPort extends app.services.UI.Component<{}, state>
    {
        props:{}

        iframe?:HTMLFrameElement
        constructor(props:{}) {
            super(props);
            this.props = props;
            this.state = { sources: {} };
            this.ribbon_event = this.ribbon_event.bind(this);
            this.designer_relay = this.designer_relay.bind(this);
            this.onRedirect = this.onRedirect.bind(this);
            this.edit_event = this.edit_event.bind(this);
            this.designer_select = this.designer_select.bind(this);
            this.designer_load = this.designer_load.bind(this);
            this.intercept_mounted = this.intercept_mounted.bind(this);
            this.onSelectedIndexChanged = this.onSelectedIndexChanged.bind(this);
            this.onCodeChange = this.onCodeChange.bind(this);
        }

        componentWillMount() {
            if (window === window.parent) {
                app.services.events.subscribe({type:"Navigation.Redirect"}, this.onRedirect);
            } 
            app.services.events.subscribe(events["Ribbon.Event"](), this.ribbon_event);
            app.services.events.subscribe(events["Designer.Load"](), this.designer_load);
            app.services.events.subscribe(events["Designer.Select"](), this.designer_select);
            app.services.events.subscribe(events["Edit.Event"](), this.edit_event);
            app.services.events.subscribe(events["Intercept.Mounted"](), this.intercept_mounted);
        }

        
        componentWillUnmount() {
            if (window === window.parent) {
                app.services.events.unsubscribe({type:"Navigation.Redirect"}, this.onRedirect);
            } 
            
            app.services.events.unsubscribe(events["Ribbon.Event"](), this.ribbon_event);
            app.services.events.unsubscribe(events["Designer.Load"](), this.designer_load);
            app.services.events.unsubscribe(events["Designer.Select"](), this.designer_relay);
            app.services.events.unsubscribe(events["Edit.Event"](), this.edit_event);
            app.services.events.unsubscribe(events["Intercept.Mounted"](), this.intercept_mounted);
        }

        load_file(target: {[filename:string]:file}, file: string) {
            return new Promise( (resolve, reject) => {
                return app.services.moduleSystem.fetch(file, {"Cache-Control": "no-cache", "Mode": "edit"} ).then(res => {
                    target[file] = {content: res.text}
                    resolve();
                }, reject);
            });
        }

        edit_event(ev: types.app.IEventData<Edit_Event>) {
            let sources = this.state.sources;
            let files = Object.keys(sources);
            let toLoad = [];
            for (var f of files)
                if (ev.data.activeFiles.indexOf(f) == -1)
                    delete sources[f];
            for (var f of ev.data.activeFiles)
                if (files.indexOf(f) == -1) 
                    toLoad.push(this.load_file(sources, f));
            Promise.all(toLoad).then(() => {
                files = Object.keys(sources);
                let selectedIndex:number|undefined = ev.data.selectedFile ? files.indexOf(ev.data.selectedFile) : -1;
                if (selectedIndex === -1) selectedIndex = files.length - 1;
                if (selectedIndex === -1) selectedIndex = undefined;
                this.setState({sources,selectedIndex}, () => this.designer_relay(ev));
            });                  
            
        }

        ribbon_event(ev:types.app.IEventData<Ribbon_Event>) {
            this.setState({editMode: ev.data.editMode});
        }

        designer_select(ev:types.app.IEventData<Designer_Select>) {
            let files = Object.keys(this.state.sources);
            let selectedIndex = (ev.data.control) ? files.indexOf(ev.data.control.url) : undefined;
            if (selectedIndex == -1) selectedIndex = undefined;
            if ((selectedIndex != undefined || files.length == 0) && selectedIndex !== this.state.selectedIndex) this.setState({selectedIndex:selectedIndex});
            this.designer_relay(ev);
        }

        designer_load(ev:types.app.IEventData<Designer_Load>) {
            this.designer_relay(ev);
            var files = Object.keys(this.state.sources);
            app.services.events.publish(events["Edit.Event"]({activeFiles: files, viewSource: this.state.editMode === EditMode.Source, selectedFile: this.state.selectedIndex != undefined ? files[this.state.selectedIndex] : undefined }));
        }

        designer_relay<T>(ev:types.app.IEventData<T>) {
            if (this.iframe && this.iframe.contentWindow /*&& ev.data*/) 
                app.services.events.publish(ev, this["iframe"].contentWindow);
        }

        onRedirect(event:types.app.IEventData<any>) {
            //debugger;cd
            //if (history && history.pushState) history.pushState(null, '', event.data); else location.replace(event.data);
        }

        intercept_mounted(ev:types.app.IEventData<{file?:string}>) {
            if (ev.data.file && this.state.sources[ev.data.file]) {
                var files = Object.keys(this.state.sources);
                app.services.events.publish(events["Edit.Event"]({activeFiles: files, viewSource: this.state.editMode === EditMode.Source, selectedFile: this.state.selectedIndex != undefined ? files[this.state.selectedIndex] : undefined }));            
            }
        }

        onSelectedIndexChanged(index:number) {
            this.setState({selectedIndex: index}, () => {
                if (this.state.selectedIndex != undefined && this.state.selectedIndex > -1) {
                    var files = Object.keys(this.state.sources);
                    if (files.length > this.state.selectedIndex)
                        app.services.events.publish<Designer_Select>({type: "Designer.Intercept.Select", correlationId: files[this.state.selectedIndex], data: {editMode: true, canEdit: true, control: {url:files[this.state.selectedIndex]}}});
                }
            });
        }

        onCodeChange (file:string, value:string) {
            let sources :{[filename:string]:file}={};
            Object.keys(this.state.sources).forEach( (key) => {
                sources[key] = key == file ? {content: value} : this.state.sources[key];
            });
            this.setState({sources});
        }

        render() {
            let keys = Object.keys(this.state.sources);
            let selectedIndex = this.state.selectedIndex === undefined ? -1 : this.state.selectedIndex;
            if (keys.length < selectedIndex) selectedIndex = keys.length-1;
            var src = location.href;
            if (app.info.browser === types.webapp.browserType.IE) { // IE does not load another instance of a page with exactly the same name  
                let ix = location.origin.length + 2;
                src =  src.substr(0, ix) + (src[ix].toUpperCase() == src[ix] ? src[ix].toLowerCase() : src[ix].toUpperCase()) + src.substr(ix+1);
            }

            return super.render([ ["div"
                                  , { className: styles.Table + ' ' + styles.Fill, style: { border: "1px solid #AAA",}}
                                  , [   [ "div",  { className: styles.TableRow, style: {  position: "relative", height: "100%"}}, [[ "iframe" , { className: styles.Fill, style: { background: "white", border: "0", resize: this.state.editMode === EditMode.Source ? "vertical" : "none"}, src: src, ref: (e:HTMLFrameElement) => {this["iframe"] = e; }}]]  ]
                                    ,   [ "div" , { className: styles.TableRow, style: {  display: this.state.editMode === EditMode.Source ? "table-row" : "none"} }
                                                                                                            , [ selectedIndex > -1 && keys.length > 0 ? [ TabContainer
                                                                                                            , { tabs: keys, className: classes.SourceEdit_Files, selectedIndex: this.state.selectedIndex, onSelectedIndexChanged: this.onSelectedIndexChanged}
                                                                                                            , keys.map( (key, index) => [ CodeMirror, { className: styles.Fill, style: index==this.state.selectedIndex ? {} : {display: 'none'}, value: this.state.sources[key].content, settings: {matchBrackets: true, closeBrackets: true , continueComments: "Enter", lineNumbers: true, mode: "application/ld+json", lineWrapping: true, comment: true}, onChange: (value: string) => this.onCodeChange(keys[selectedIndex], value) } ] ) ] : null
                                                                                                            ] ]
                                    ] 
                                 ] ]
                                  );
        }
    }
}

export {DesignerViewPort};
