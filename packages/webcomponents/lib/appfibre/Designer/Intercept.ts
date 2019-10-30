import { Designer_Select, Edit_Event } from "./types";
import { types } from "@appfibre/types";
import { events } from "./types";
import { classes } from "./Styles";

let Intercept = function inject(app:types.app.IAppLoaded) {

    return class Intercept extends app.services.UI.Component<{file?:string, children?:any}, {focus:boolean, selected:boolean, editing:boolean, selectedCorrelationId?:string, editMode:any, canEdit: boolean}> {

        state:{focus:boolean, selected: boolean, editing: boolean, selectedCorrelationId?:string, editMode:any, canEdit: boolean};
        constructor(props:any) 
        {
            super(props);
            this.state = {focus: false, selected: false, editing: false, editMode: null, canEdit: true}; 
            //this.onMessage = this.onMessage.bind(this);
            this.click = this.click.bind(this);
            this.doubleclick = this.doubleclick.bind(this);
            this.mouseEnter = this.mouseEnter.bind(this);
            this.mouseLeave = this.mouseLeave.bind(this);
            this.designer_select = this.designer_select.bind(this);
            this.edit_event = this.edit_event.bind(this);
        }

        componentDidMount()
        {
            //window.addEventListener("message", this.onMessage);
            app.services.events.subscribe(events["Designer.Select"](), this.designer_select);
            app.services.events.subscribe(events["Edit.Event"](), this.edit_event);
            var topParent = window.parent;
            while (topParent.parent != null && topParent.parent !== topParent) topParent = topParent.parent;
            app.services.events.publish(events["Intercept.Mounted"]({file:this.props.file}), topParent);
        }

        componentWillUnmount()
        {
            //window.removeEventListener("message", this.onMessage);
            app.services.events.unsubscribe(events["Designer.Select"](), this.designer_select);
            app.services.events.unsubscribe(events["Edit.Event"](), this.edit_event);
        }
        
        edit_event(ev: types.app.IEventData<Edit_Event>) {
            let editing = this.props.file ? ev.data.activeFiles.indexOf(this.props.file) > -1 : false;
            if (this.state.editing != editing) 
                this.setState({editing});
        }

        designer_select(ev:types.app.IEventData<Designer_Select>) { 
            if (this.state.selected != (this.props.file == ev.correlationId))
                this.setState({selected: !this.state.selected});
        }

        reconstruct(obj:any) {
            if (!obj[1]) obj[1] = {};
            obj[1].className = (obj[1].className ? obj[1].className + ' ' : '') + classes.Intercept + (this.state.focus && !this.state.selected && !this.state.editing ? ' ' + classes.Intercept_Focus : '') + (this.state.selected ? ' ' + classes.Intercept_Selected : '')  + (this.state.editing ? ' ' + classes.Intercept_Editing : '');
            if (!obj[1].style) obj[1].style = {};
            if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
                //obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
                //if (this.state.editing) obj[1].style.background = "#98CCFD";

                //if (this.state.selected || this.state.editing || this.state.focus)
                //    obj[1].style.border = `1px ${this.state.selected&&this.state.editing?"solid":"dashed"} ${this.state.editing ? "blue" : "grey"}`;
                //else
                //    obj[1].style.padding = '1px';

                /*if (this.state.selected) obj[1].style.border = "1px solid " + (this.state.editing ? "blue" : "grey");
                else if (this.state.focus) obj[1].style.border = "1px dashed grey";
                )*/
                obj[1].onMouseEnter = this.mouseEnter;
                obj[1].onMouseLeave = this.mouseLeave;
                obj[1].onClick = this.click;
                obj[1].onDoubleClick = this.doubleclick;
            }
            return obj;
        }

        render() {
            //return super.render(Array.isArray(this.props.children) ? this.reconstruct(["div", {style: {display: "inline-block"}}, this.props.children])  : this.reconstruct(this.props.children));
            return super.render(this.reconstruct(["div", {style: {display: ""}, key: 0}, this.props.children]));
        }

        mouseEnter() {
            
            //x.Designer.notify("x");
            this.setState({"focus": true})
        }

        mouseLeave() {
            //x.Designer.notify("y");
            this.setState({"focus": false})
        }

        doubleclick(ev:MouseEvent) {
            app.services.events.publish<{}>({type: "Designer.Ribbon.ToggleEdit", correlationId: Date.now().toString(), data: {}}, parent);
        }

        click(ev:MouseEvent) {
            ev.stopPropagation();
            //ev.stopImmediatePropagation();
            
            //Designer.notify(this.props.file);
            var parent = window;
            while (parent.parent !== parent && window.parent != null)
                parent = parent.parent;
            
            //parent.postMessage({eventType: "select", editMode: this.state.editMode, canEdit: this.state.canEdit, correlationId, control: {file:this.props.file, method:this.props.method}}, location.href);
            if (this.props.file) { 
                app.services.events.publish<Designer_Select>({type: "Designer.Intercept.Select", correlationId: this.props.file, data: {editMode: this.state.editMode, canEdit: this.state.canEdit, control: {url:this.props.file}}}, parent)
                //let file = this.props.file;
                //this.setState( {selectedCorrelationId: file}
                //             , () => app.services.events.publish<Designer_Select>({type: "Designer.Intercept.Select", correlationId: file, data: {editMode: this.state.editMode, canEdit: this.state.canEdit, control: {url:file}}}, parent));
            }

        }
    }
}

export {Intercept};