import { Designer_Select } from "./types";
import appfibre from "@appfibre/types";
import { events } from "./types";

let Intercept = function inject(app:appfibre.app.IAppLoaded) {

    return class Intercept extends app.services.UI.Component<{file?:string, children?:any}, {focus:boolean, selected:boolean, selectedCorrelationId?:string, editMode:any, canEdit: boolean}> {

        state:{focus:boolean, selected: boolean, selectedCorrelationId?:string, editMode:any, canEdit: boolean};
        constructor(props:any) 
        {
            super(props);
            this.state = {focus: false, selected: false, editMode: null, canEdit: true}; 
            //this.onMessage = this.onMessage.bind(this);
            this.click = this.click.bind(this);
            this.mouseEnter = this.mouseEnter.bind(this);
            this.mouseLeave = this.mouseLeave.bind(this);
            this.designer_select = this.designer_select.bind(this);
        }

        componentDidMount()
        {
            //window.addEventListener("message", this.onMessage);
            app.services.events.subscribe(events["Designer.Select"](), this.designer_select);
        }

        componentWillUnmount()
        {
            //window.removeEventListener("message", this.onMessage);
            app.services.events.unsubscribe(events["Designer.Select"](), this.designer_select);
        }

        designer_select(ev:appfibre.app.IEventData<Designer_Select>) {
            this.setState({selected: this.state.selectedCorrelationId == ev.correlationId});
        }

        reconstruct(obj:any) {
            if (!obj[1]) obj[1] = {};
            if (!obj[1].style) obj[1].style = {}; 
            if (!obj[1].style.border && !obj[1].style.padding && !obj[1].onMouseEnter && !obj[1].onMouseLeave) {
                obj[1].style.padding = this.state.focus || this.state.selected ? "1px" : "2px";
                if (this.state.editMode) obj[1].style.background = "lightblue";
                if (this.state.selected) obj[1].style.border = "1px solid black";
                else if (this.state.focus) obj[1].style.border = "1px dashed grey";
                obj[1].onMouseEnter = this.mouseEnter;
                obj[1].onMouseLeave = this.mouseLeave;
                obj[1].onClick = this.click;
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

        click(ev:any) {
            ev.stopPropagation();
            //Designer.notify(this.props.file);
            var parent = window;
            while (parent.parent !== parent && window.parent != null)
                parent = parent.parent;
            
            var correlationId = Date.now().toString();
            //parent.postMessage({eventType: "select", editMode: this.state.editMode, canEdit: this.state.canEdit, correlationId, control: {file:this.props.file, method:this.props.method}}, location.href);
            if (this.props.file) { 
                let file = this.props.file;
                this.setState( {selectedCorrelationId: correlationId}
                             , () => app.services.events.publish<Designer_Select>({type: "Designer.Intercept.Select", correlationId, data: {editMode: this.state.editMode, canEdit: this.state.canEdit, control: {url:file}}}, parent));
            }

        }
    }
}

export {Intercept};