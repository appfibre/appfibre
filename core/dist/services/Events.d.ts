import * as types from "../types";
export declare class Events {
    callbacks: {
        [eventType: string]: {
            type: types.IEventType;
            correlationId?: string;
            callback: (data: types.IEventData<any>) => any;
        }[];
    };
    constructor(app: types.IAppLoaded<any, any>);
    onWindowMessage(ev: MessageEvent): any;
    subscribe<T>(eventType: types.IEventType, callback: (data: types.IEventData<T>) => any): void;
    unsubscribe<T>(eventType: types.IEventType, callback: (data: types.IEventData<T>) => any): void;
    publish<T>(event: types.IEventData<T>, target?: {
        postMessage: (message: any, targetOrigin: string) => void;
    }): any[];
}
