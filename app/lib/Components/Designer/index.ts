import { types } from "@appfibre/jst";

let Designer = function inject(app:types.IAppLoaded) {
    return class Designer extends app.services.UI.Component
    {
        constructor(props:any)
        {
            super(props);
            this.state = {};
        }

        render() {
            return super.render("DESIGNER");
        }
    }
}

export { Designer }