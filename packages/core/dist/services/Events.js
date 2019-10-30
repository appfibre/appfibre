"use strict";
exports.__esModule = true;
var Events = /** @class */ (function () {
    function Events(_a) {
        this.callbacks = {};
        if (typeof window === "object")
            window.addEventListener("message", this.onWindowMessage.bind(this));
    }
    Events.prototype.onWindowMessage = function (ev) {
        if (typeof ev.data === "object" && typeof ev.data.type === "string")
            this.publish(ev.data);
    };
    Events.prototype.subscribe = function (eventType, callback) {
        //console.log(callback);
        if (!this.callbacks[eventType.type])
            this.callbacks[eventType.type] = [];
        this.callbacks[eventType.type].push({ type: eventType, correlationId: eventType.correlationId, callback: callback });
    };
    Events.prototype.unsubscribe = function (eventType, callback) {
        //console.log(callback);
        var callbacks;
        if (callbacks = this.callbacks[eventType.type]) {
            for (var i = callbacks.length - 1; i >= 0; i--)
                if (callbacks[i].callback === callback)
                    callbacks.splice(i, 1);
        }
    };
    Events.prototype.publish = function (event, target) {
        var subscriptions = this.callbacks[event.type];
        var response = [];
        if (target)
            target.postMessage(event, location.href);
        else
            for (var s in subscriptions)
                if (subscriptions[s].correlationId === undefined || subscriptions[s].correlationId == event.correlationId)
                    if (subscriptions[s].callback) {
                        var r = subscriptions[s].callback(event);
                        if (!!r)
                            response.push(r);
                    }
        ;
        return response;
    };
    return Events;
}());
exports.Events = Events;
