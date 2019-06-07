import * as app from "./app";
import * as UI from "./UI";
declare let fibre: {
    Component: typeof UI.Component;
    LogLevel: typeof app.LogLevel;
    ModuleSystem: typeof app.ModuleSystem;
};
export = fibre;
