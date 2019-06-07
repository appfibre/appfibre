import {types} from '@appfibre/webapp';

export interface Designer_Intercept_Select {
    editMode: boolean
    canEdit: boolean
    control: {
        url:string
        , method?:string
    }
}

export interface Designer_Load {
    url: string
}

let events = {
      "Designer.Load": function (data?:Designer_Load):types.IEventType&{data:Designer_Load|undefined} {return {type: "Designer.Load", data}}
    , "Designer.Intercept.Select": function (data?:Designer_Intercept_Select):types.IEventType&{data:Designer_Intercept_Select|undefined} {return {type: "Designer.Intercept.Select", data}}
}


export { events };