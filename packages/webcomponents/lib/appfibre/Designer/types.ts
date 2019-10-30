import { types } from '@appfibre/types';

export interface Designer_Select {
    editMode: boolean
    canEdit: boolean
    control?: {
        url:string
    }
}

export interface _url {
    url: string
}

export interface Designer_Load extends _url {
}

export enum EditMode {
    "Inline",
    "Source"
}

export interface Edit_Event {
    viewSource: boolean
    activeFiles: Array<string>
    selectedFile?: string
}

export interface Ribbon_Event {
    editMode?: EditMode
}

let events = {
      "Designer.Load": function (data?:Designer_Load):types.app.IEventType&{data:Designer_Load|undefined} {return {type: "Designer.Load", data}}
    , "Designer.Intercept.Select": function (data?:Designer_Select):types.app.IEventType&{data:Designer_Select|undefined} {return {type: "Designer.Intercept.Select", data}}
    , "Designer.Select": function (event?:types.app.IEventData<Designer_Select|undefined>):types.app.IEventData<Designer_Select|undefined> {return {type: "Designer.Select", data: event ? event.data : undefined, correlationId: event ? event.correlationId : undefined}}
    , "Designer.Ribbon.ToggleEdit": function ():types.app.IEventType {return {type: "Designer.Ribbon.ToggleEdit"}}
    //, "Designer.Deselect": function (correlationId?:string):types.app.IEventData<undefined> {return {type: "Designer.Intercept.DeSelect", correlationId, data:undefined}}

    , "Designer.EditMode.Inline": function (data?:_url):types.app.IEventType&{data:_url|undefined} {return {type: "Designer.EditMode.Inline", data}}
    , "Designer.EditMode.Source": function (data?:_url):types.app.IEventType&{data:_url|undefined} {return {type: "Designer.EditMode.Source", data}}

    , "Ribbon.Event": function(data?:Ribbon_Event, correlationId?:string):types.app.IEventData<Ribbon_Event|undefined> { return { type: "Ribbon.Event", correlationId, data} }
    , "Edit.Event": function(data?:Edit_Event, correlationId?:string):types.app.IEventData<Edit_Event|undefined> { return { type: "Edit.Event", correlationId, data} }

    , "Intercept.Mounted": function(data?:{file?:string}, correlationId?:string):types.app.IEventData<{file?:string}|undefined> { return {type: "Intercept.Mounted", correlationId, data} }
}


export { events };