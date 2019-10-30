import { types } from "@appfibre/core";
export import IApp = types.IApp;
export import IAppLoaded = types.IAppLoaded;
export import Constructable = types.Constructable;
export import Component = types.Component;
export import IController = types.IController;
export import IData = types.IData;
export import IEventData = types.IEventData;
export import IEventType = types.IEventType;
export import IEvents = types.IEvents;
export import ILogger = types.ILogger;
export import IModuleSystem = types.IModuleSystem;
export import INavigation = types.INavigation;
export import IParser = types.IParser;
export import IProcessor = types.IProcessor;
export import IServicesLoaded = types.IServicesLoaded;
export import ITransformOutput = types.ITransformOutput;
export import ITransformSetting = types.ITransformSettings;
export import ITransformer = types.ITransformer;
export import IUI = types.IUI;
export import LogLevel = types.LogLevel;
export import ModuleSystem = types.ModuleSystem;
export import promisedElement = types.promisedElement;
export import element = types.element;
export import elementBase = types.elementBase;
export declare enum browserType {
    "Opera" = 0,
    "FireFox" = 1,
    "Safari" = 2,
    "IE" = 3,
    "Edge" = 4,
    "Chrome" = 5,
    "Blink" = 6,
    "Unknown" = 7
}
export interface IInfo extends types.IInfo {
    browser: browserType;
}
export interface IOptions extends types.IOptions {
    target?: string | HTMLElement | null;
    fullHeight?: boolean;
}
export interface IWebApp extends types.IApp<IOptions, IInfo> {
}
export interface IWebAppLoaded extends types.IAppLoaded<IOptions, IInfo> {
}
export declare namespace HTML {
    type element = div | table;
    type div = ["div", Partial<HTMLDivElement>?, (string | {
        [index: number]: HTML.element;
    })?];
    type table = ["table", Partial<HTMLTableElement>?, Array<HTML.tr>?];
    type tr = ["tr", Partial<HTMLTableRowElement>?, Array<HTML.td>?];
    type td = ["td", Partial<HTMLTableCellElement>?, (string | {
        [index: number]: HTML.element;
    })?];
}
