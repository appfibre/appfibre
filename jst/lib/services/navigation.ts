import { INavigation, IAppLoaded, LogLevel, IApp} from "../types";

const Navigation:INavigation = {
    resolve: function transform(this:IAppLoaded, container:string) {
        let url = (Object.getOwnPropertyDescriptor(global, "location")) ? location.href : '';
        if (Object.keys(this.controllers).length === 0) 
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
                alert(this.props.href);
                if (event) event.preventDefault();
            }

            render() {
                return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
            }
        }
    },

    container: function transform(app:IAppLoaded, t:string, a: object, c: any) {
        return class Container extends app.services.UI.Component 
        {
            constructor() {
                super();
            }

            render() {
                return app.services.UI.processElement([t, {...a, onClick: this.click.bind(this)}, c], 0, undefined);
                //return app.services.UI.processElement(["a", {...this.props, onClick: this.click.bind(this)}, this.props.children], 0, undefined);
            }
        }
    }
    
};

export {Navigation};