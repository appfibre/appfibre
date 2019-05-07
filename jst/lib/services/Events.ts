import { IEventType, IEventData, IAppLoaded } from "../types";

export class Events {

    //callbacks:{[eventType:string]: {type:IEventType, []};

    callbacks:{[eventType:string]: {type:IEventType, correlationId?: string, callback:(data:IEventData)=>any}[]};

    constructor(app:IAppLoaded) {
        this.callbacks = {};
    }

    subscribe(eventType:IEventType, callback:(data:IEventData)=>any):void
    {
        //console.log(callback);
        if (!this.callbacks[eventType.type])
            this.callbacks[eventType.type] = [];
        this.callbacks[eventType.type].push({type: eventType, correlationId: eventType.correlationId, callback});
    }

    publish(event:IEventData):any
    {
        let subscriptions = this.callbacks[event.type];
        let response = null;

        for (var s in subscriptions)
            if (subscriptions[s].correlationId === undefined || subscriptions[s].correlationId == event.correlationId) {
                if (subscriptions[s].callback) response = subscriptions[s].callback(event);
            }

        return response;
    }
    
}