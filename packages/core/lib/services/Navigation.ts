//import { INavigation, IAppLoaded, LogLevel, IEventData, IApp, promisedElement, element} from "../types";
import { BaseComponent } from "../components";
import { types } from "@appfibre/types";

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

const Navigation:types.app.INavigation = {

    current: parse(typeof location === "object" ? location.href : ''),
    
    resolve: function transform(this:types.app.IAppLoaded, container:string) {
        let url = typeof location === "undefined" ? '' : location.href;
        if (this.controllers && Object.keys(this.controllers).length === 0) 
            return this.main;
        for (let c in this.controllers)
            if ((this.controllers[c].container ? this.controllers[c].container : '') == (container || '')) {
                var match = this.controllers[c].match ? this.controllers[c].match.test(url) : true;
                this.services.logger.log(types.app.LogLevel.Trace, `Route "${url}" ${match?'matched':'did not match'} controller "${c}"`)
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
                this.services.logger.log(types.app.LogLevel.Trace, `Container ${container || '(blank)'} does not match controller ${c}'s container ${this.controllers[c].container  || '(blank)'}`);

        return ["Error", {}, "Could not locate controller matching " + url];
    },

    a: function inject(app:types.app.IAppLoaded) {
        return class a extends BaseComponent<{href:string, container?:string},any>(app) //app.services.UI.Component 
        {
            constructor(props:{href:string, container?:string}, context:any) {
                super(props,context);
            }

            click(e:any) {
                app.services.navigation.current = parse(this.props.href);
                var topParent = parent;
                while (topParent.parent !== topParent) topParent = topParent.parent;
                
                if (topParent.history && topParent.history.pushState) topParent.history.pushState(null, '', this.props.href); else topParent.location.replace(this.props.href);
                app.services.events.publish({type: "Navigation.Redirect", correlationId: this.props.container, data:this.props.href});
                if (e && e.nativeEvent && e.nativeEvent.preventDefault) e.nativeEvent.preventDefault();
                return false;
            }

            render() {
                return super.render(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children]);
                //return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
            }
        }
    },

    Container: function transform<P={c:any}>(this:types.app.IAppLoaded, a:any, c:any) {
            let app = this;
            return [class NavigationContainer extends BaseComponent<P&{c:any},{a?:any, c:any}>(app) {
                state:{a?:any, c:any}

                constructor(props:P&{a?:any, c:any}, context:any) {
                    super(props, context);
                    this.state = { a: props.a, c: props.c };
                    this.onRedirect = this.onRedirect.bind(this)
                }

                onRedirect(/*event:types.app.IEventData<any>*/) {
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