import appfibre from "@appfibre/types"

export class Events {

    //callbacks:{[eventType:string]: {type:IEventType, []};

    callbacks:{[eventType:string]: {type:appfibre.app.IEventType, correlationId?: string, callback:(data:appfibre.app.IEventData<any>)=>any}[]};

    constructor(app:appfibre.app.IAppLoaded<any, any>) {
        this.callbacks = {};
        if (typeof window === "object") window.addEventListener("message", this.onWindowMessage.bind(this));
    }

    onWindowMessage(ev: MessageEvent):any {
        if (typeof ev.data === "object" && typeof ev.data.type === "string") this.publish(ev.data);
    }

    subscribe<T>(eventType:appfibre.app.IEventType, callback:(data:appfibre.app.IEventData<T>)=>any):void
    {
        //console.log(callback);
        if (!this.callbacks[eventType.type])
            this.callbacks[eventType.type] = [];
        this.callbacks[eventType.type].push({type: eventType, correlationId: eventType.correlationId, callback});
    }

    unsubscribe<T>(eventType:appfibre.app.IEventType, callback:(data:appfibre.app.IEventData<T>)=>any):void
    {
        //console.log(callback);
        var callbacks;
        if (callbacks = this.callbacks[eventType.type]) {
            for (var i = callbacks.length-1; i >= 0; i--)
                if (callbacks[i].callback === callback) 
                    callbacks.splice(i, 1);
        }
    }

    publish<T>(event:appfibre.app.IEventData<T>, target?:{postMessage:(message:any, targetOrigin: string)=>void}):any[]
    {
        let subscriptions = this.callbacks[event.type];
        let response = [];

        if (target)
            target.postMessage(event, location.href);
        else 
            for (var s in subscriptions)
                if (subscriptions[s].correlationId === undefined || subscriptions[s].correlationId == event.correlationId) 
                    if (subscriptions[s].callback) {var r = subscriptions[s].callback(event); if (!!r) response.push(r);};                

        return response;
    }
    
}