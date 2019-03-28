import {IAppLoaded} from "../types";

let Async = function inject(app:IAppLoaded) {
    return class Async extends app.services.processor.construct(app.services.UI.Component)
    {
        constructor(props:any)
        {
            super(props);
            this.state = {
            value: this.props.value[3],
            };
        }

        componentDidMount() {
            if (app.services.promise.prototype.isPrototypeOf(this.props.value))
                this.props.value.then((value:any) => this.setState({"value": value }), (err:string) =>  this.setState({"value": this.props.value[4] ? this.props.value[4](err) : ["Exception", err]}));
            else if (this.props.value[0] && this.props.value[0].then)
                this.props.value[0].then((value:any) => this.setState({"value": value }), (err:string) =>  this.setState({"value": this.props.value[4] ? this.props.value[4](err) : ["Exception", err]}));
            else
                app.services.promise.all(this.props.value).then(value => this.setState({"value":value})).catch(err => { if (this.props.value[4]) this.setState({"value": this.props.value[4]})});
        }

        render() {
            return this.state.value && typeof this.state.value !== "string" ? super.render(this.state.value) : "";
        }
    }
}

export { Async }