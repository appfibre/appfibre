import { app } from '../app';
import { UI as _UI } from './UI';
export declare namespace webapp {
    export import UI = _UI;
    interface IInfo extends app.IInfo {
        browser: browserType;
    }
    interface ISettings extends app.ISettings {
        target?: string | HTMLElement | null;
        fullHeight?: boolean;
    }
    interface IWebApp extends app.IApp<ISettings, IInfo> {
    }
    interface IWebAppLoaded extends app.IAppLoaded<ISettings, IInfo> {
    }
    enum browserType {
        "Opera" = 0,
        "FireFox" = 1,
        "Safari" = 2,
        "IE" = 3,
        "Edge" = 4,
        "Chrome" = 5,
        "Blink" = 6,
        "Unknown" = 7
    }
}
//# sourceMappingURL=index.d.ts.map