export var EditMode;
(function (EditMode) {
    EditMode[EditMode["Inline"] = 0] = "Inline";
    EditMode[EditMode["Source"] = 1] = "Source";
})(EditMode || (EditMode = {}));
var events = {
    "Designer.Load": function (data) { return { type: "Designer.Load", data: data }; },
    "Designer.Intercept.Select": function (data) { return { type: "Designer.Intercept.Select", data: data }; },
    "Designer.Select": function (event) { return { type: "Designer.Select", data: event ? event.data : undefined, correlationId: event ? event.correlationId : undefined }; },
    "Designer.Ribbon.ToggleEdit": function () { return { type: "Designer.Ribbon.ToggleEdit" }; }
    //, "Designer.Deselect": function (correlationId?:string):types.app.IEventData<undefined> {return {type: "Designer.Intercept.DeSelect", correlationId, data:undefined}}
    ,
    "Designer.EditMode.Inline": function (data) { return { type: "Designer.EditMode.Inline", data: data }; },
    "Designer.EditMode.Source": function (data) { return { type: "Designer.EditMode.Source", data: data }; },
    "Ribbon.Event": function (data, correlationId) { return { type: "Ribbon.Event", correlationId: correlationId, data: data }; },
    "Edit.Event": function (data, correlationId) { return { type: "Edit.Event", correlationId: correlationId, data: data }; },
    "Intercept.Mounted": function (data, correlationId) { return { type: "Intercept.Mounted", correlationId: correlationId, data: data }; }
};
export { events };
