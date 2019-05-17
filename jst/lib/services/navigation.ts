import { INavigation, IAppLoaded, LogLevel, IEventData, IApp, promisedElement, element} from "../types";
import { BaseComponent } from "../components";

function parse(url:string)  {
    var qs = /(?:\?)([^#]*)(?:#.*)?$/.exec(url);
    var params:{[key:string]:string} = {};
    var index = 0;
    if (qs) qs[1].split('&').forEach(function(p:string) {
        var v = p.split('=');
        params[v.length === 2 ? v[0] : index++] = v[v.length-1];
    });
    return {
        path: qs && qs[1] ? qs[1] : ''
    }
}

function clone(o:any):any {
    if (Array.isArray(o)) 
        return o.map(o => clone(o));
    else if (typeof o === "object") {
        var z = Object.create(o);
        Object.keys(o).forEach(k => z[k] = o[k]);
        return z;
    } else 
    return o;
}


const Navigation:INavigation = {

    current: parse(typeof location === "object" ? location.href : ''),
    
    resolve: function transform(this:IAppLoaded, container:string) {
        let url = typeof location === "undefined" ? '' : location.href;
        if (this.controllers && Object.keys(this.controllers).length === 0) 
            return this.main;
        for (let c in this.controllers)
            if ((this.controllers[c].container ? this.controllers[c].container : '') == (container || '')) {
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
                app.services.navigation.current = parse(this.props.href);
                if (history && history.pushState) history.pushState(null, '', this.props.href); else location.replace(this.props.href);
                app.services.events.publish({type: "Navigation.Redirect", correlationId: this.props.container, data:this.props.href});
                if (event) event.preventDefault();
            }

            render() {
                return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
            }
        }
    },

    Container: function transform(this:IAppLoaded, a:any, c:any) {
            let app = this;
            return [class Container extends BaseComponent(app) {
                state:{a?:any, c:any}

                constructor(props:{a?:any, c:any}) {
                    super();
                    this.state = { a: props.a, c: props.c };
                    this.onRedirect = this.onRedirect.bind(this)
                }

                onRedirect(event:IEventData) {
                    var e = clone(this.props.c);
                    if (Array.isArray(e)) e.forEach( (c, i) => { if (Array.isArray(c)) c[1].key = Date.now() + i ;} );
                    this.setState( {c: e });
                }

                componentWillMount() {
                    app.services.events.subscribe({type:"Navigation.Redirect"}, this.onRedirect);
                }
    
                componentWillUnmount() {
                    app.services.events.unsubscribe({type:"Navigation.Redirect"}, this.onRedirect);
                }

                render() {
                    return super.render(this.state.c);
                }

            }, {a, c}];
        }
};

export {Navigation};