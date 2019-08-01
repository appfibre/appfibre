var events = {
    "Designer.Load": function (data) { return { type: "Designer.Load", data: data }; },
    "Designer.Intercept.Select": function (data) { return { type: "Designer.Intercept.Select", data: data }; },
    "Designer.Select": function (event) { return { type: "Designer.Select", data: event ? event.data : undefined, correlationId: event ? event.correlationId : undefined }; }
    //, "Designer.Deselect": function (correlationId?:string):types.app.IEventData<undefined> {return {type: "Designer.Intercept.DeSelect", correlationId, data:undefined}}
};
export { events };
