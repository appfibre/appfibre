"use strict";
exports.__esModule = true;
var Events = /** @class */ (function () {
    function Events(app) {
        this.callbacks = {};
    }
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
    Events.prototype.publish = function (event) {
        var subscriptions = this.callbacks[event.type];
        var response = null;
        for (var s in subscriptions)
            if (subscriptions[s].correlationId === undefined || subscriptions[s].correlationId == event.correlationId) {
                if (subscriptions[s].callback)
                    response = subscriptions[s].callback(event);
            }
        return response;
    };
    return Events;
}());
exports.Events = Events;
