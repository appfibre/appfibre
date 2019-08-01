import { fibre } from "@appfibre/core";
export declare namespace webapp {
    enum browserType {
        "Opera",
        "FireFox",
        "Safari",
        "IE",
        "Edge",
        "Chrome",
        "Blink",
        "Unknown"
    }
    interface IInfo extends fibre.app.IInfo {
        browser: browserType;
    }
    interface IOptions extends fibre.app.IOptions {
        target?: string | HTMLElement | null;
    }
    interface IWebApp extends fibre.app.IApp<IOptions, IInfo> {
    }
    interface IWebAppLoaded extends fibre.app.IAppLoaded<IOptions, IInfo> {
    }
}
