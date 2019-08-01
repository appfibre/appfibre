import { types } from "@appfibre/types";
export declare class Events {
    callbacks: {
        [eventType: string]: {
            type: types.app.IEventType;
            correlationId?: string;
            callback: (data: types.app.IEventData<any>) => any;
        }[];
    };
    constructor({}: {});
    onWindowMessage(ev: MessageEvent): any;
    subscribe<T>(eventType: types.app.IEventType, callback: (data: types.app.IEventData<T>) => any): void;
    unsubscribe<T>(eventType: types.app.IEventType, callback: (data: types.app.IEventData<T>) => any): void;
    publish<T>(event: types.app.IEventData<T>, target?: {
        postMessage: (message: any, targetOrigin: string) => void;
    }): any[];
}
