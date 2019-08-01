import { types } from '@appfibre/types';

export interface Designer_Select {
    editMode: boolean
    canEdit: boolean
    control?: {
        url:string
    }
}

export interface Designer_Load {
    url: string
}

let events = {
      "Designer.Load": function (data?:Designer_Load):types.app.IEventType&{data:Designer_Load|undefined} {return {type: "Designer.Load", data}}
    , "Designer.Intercept.Select": function (data?:Designer_Select):types.app.IEventType&{data:Designer_Select|undefined} {return {type: "Designer.Intercept.Select", data}}
    , "Designer.Select": function (event?:types.app.IEventData<Designer_Select|undefined>):types.app.IEventData<Designer_Select|undefined> {return {type: "Designer.Select", data: event ? event.data : undefined, correlationId: event ? event.correlationId : undefined}}
    //, "Designer.Deselect": function (correlationId?:string):types.app.IEventData<undefined> {return {type: "Designer.Intercept.DeSelect", correlationId, data:undefined}}
}


export { events };