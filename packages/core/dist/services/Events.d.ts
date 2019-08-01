import appfibre from "@appfibre/types";
export declare class Events {
    callbacks: {
        [eventType: string]: {
            type: appfibre.app.IEventType;
            correlationId?: string;
            callback: (data: appfibre.app.IEventData<any>) => any;
        }[];
    };
    constructor(app: appfibre.app.IAppLoaded<any, any>);
    onWindowMessage(ev: MessageEvent): any;
    subscribe<T>(eventType: appfibre.app.IEventType, callback: (data: appfibre.app.IEventData<T>) => any): void;
    unsubscribe<T>(eventType: appfibre.app.IEventType, callback: (data: appfibre.app.IEventData<T>) => any): void;
    publish<T>(event: appfibre.app.IEventData<T>, target?: {
        postMessage: (message: any, targetOrigin: string) => void;
    }): any[];
}
