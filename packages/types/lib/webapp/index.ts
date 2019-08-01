import { app } from '../app'
import { UI as _UI } from './UI'

export namespace webapp {
    export import UI = _UI

    export interface IInfo extends app.IInfo {
      browser: browserType
    }
  
    export interface ISettings extends app.ISettings {
      target?: string|HTMLElement|null
      fullHeight?: boolean  
  }
  
  export interface IWebApp extends app.IApp<ISettings, IInfo> { }
  export interface IWebAppLoaded extends app.IAppLoaded<ISettings, IInfo> { }

  export enum browserType {
      "Opera", 
      "FireFox",
      "Safari",
      "IE", 
      "Edge",
      "Chrome",
      "Blink",
      "Unknown"
    }
}