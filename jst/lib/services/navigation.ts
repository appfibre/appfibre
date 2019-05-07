import { INavigation, IAppLoaded, LogLevel, IEventData} from "../types";

const Navigation:INavigation = {
    resolve: function transform(this:IAppLoaded, container:string) {
        let url = typeof location === "undefined" ? '' : location.href;
        
        if (this.controllers && Object.keys(this.controllers).length === 0) 
            return this.main;
        for (let c in this.controllers)
            if (this.controllers[c].container ? this.controllers[c].container : '' == (container || '')) {
                var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
                this.services.logger.log(LogLevel.Trace, `Route "${url}" ${match?'matched':'did not match'} controller "${c}"`)
                if (match) {
                    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
                    var params:{[key:string]:string} = {};
                    var index = 0;
                    if (qs) qs[1].split('&').forEach(function(p:string) {
                        var v = p.split('=');
                        params[v.length === 2 ? v[0] : index++] = v[v.length-1];
                    });
                    return this.controllers[c].resolve.call(this, params);
                }
            } else 
                this.services.logger.log(LogLevel.Trace, `Container ${container || '(blank)'} does not match controller ${c}'s container ${this.controllers[c].container  || '(blank)'}`);

        return ["Error", {}, "Could not locate controller matching " + url];
    },

    a: function inject(app:IAppLoaded) {
        return class a extends app.services.UI.Component 
        {
            click() {
                app.services.events.publish({type: "Navigation.Redirect", correlationId: this.props.container, data:this.props.href});
                if (event) event.preventDefault();
            }

            render() {
                return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
            }
        }
    },

    Container: function inject(app:IAppLoaded) {
        return class Container extends app.services.UI.Component 
        {
            state:{data?:any}
            constructor(props?:{container?:string}) {
                super();
                this.state = {};
                this.renderInternal = this.renderInternal.bind(this);
                this.resolve = this.resolve.bind(this);
                app.services.events.subscribe({type:"Navigation.Redirect", correlationId: props ? props.container : undefined}, this.onRedirect.bind(this));
            }

            onRedirect(event:IEventData) {
                if (history && history.pushState) history.pushState(null, '', event.data); else location.replace(event.data);
                return this.resolve(event.correlationId);
            }

            resolve(correlationId:any) {
                var result = app.services.navigation.resolve.call(app, correlationId);
                if (result.then) result.then(this.renderInternal); else this.renderInternal(result);
                return result != null;
            }

            _extend(obj:any, props:any) {
                if (obj == undefined) obj = {};
                for (var i in props) 
                    if (obj[i] !== props[i])
                        obj[i] = typeof obj[i] == "object" && typeof props[i] == "object" ? this._extend(obj[i], props[i]) : obj[i] || props[i];
                return obj;
            }

            renderInternal(obj:object) {
                if (Array.isArray(obj) && obj[1])
                try { obj[1] = this._extend(obj[1], this.props); } catch(e) {app.services.logger.log(LogLevel.Warn, "Could not copy navigation properties: " + e.message, [e])}
                app.services.processor.process(obj).then(o => this.setState({data: o}));
            }

            componentDidMount() {
                this.resolve(this.props.container);
            }

            render() {
                if (this.state.data) {
                    return app.services.UI.processElement(this.state.data, 1);
                }
                else if (this.props.container) {
                    return "";
                }
            }
        }
    }
    
};

export {Navigation};