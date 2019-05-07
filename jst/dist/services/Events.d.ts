import { IEventType, IEventData, IAppLoaded } from "../types";
export declare class Events {
    callbacks: {
        [eventType: string]: {
            type: IEventType;
            correlationId?: string;
            callback: (data: IEventData) => any;
        }[];
    };
    constructor(app: IAppLoaded);
    subscribe(eventType: IEventType, callback: (data: IEventData) => any): void;
    publish(event: IEventData): any;
}
