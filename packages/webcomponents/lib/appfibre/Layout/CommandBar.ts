import {types} from "@appfibre/types";
//import { jst } from "@appfibre/types/dist/jst";

export interface command_attr {
    title: string
    commandType?: "button"
    style?: object
    className?: string
    hoverStyle: object
    onClick?: ()=>void
}

export interface section_attr {
    title: string
    className?: string
    commands: Array<command_attr>
}
export interface attr {
    style?: object
    className?: string
    sections?: Array<section_attr>
    section_style?: object
    placement?: "top"|"bottom"|"left"|"right"
};


type CommandBarElement = ["div", attr, Array<any>];
let CommandBar = function transform(this:types.app.IAppLoaded, props:attr, children:Array<any>):CommandBarElement {
    let c:any[] = [];
    
    if (props.sections)
        for (var section of props.sections) {
            c.push( [ "div"
                            , { style : {...props.section_style, display: "table-cell"}, className: 'Section' } 
                            , [ [ "div"
                                , { style: {height: '80px'}, className: 'Section-Commands' }
                                , section.commands ? section.commands.map(s => ["div", {className: s.className, ...s.style}, [[ "div", { title: s.title, onClick: s.onClick}, s.title] ] ]) : null
                                ] 
                              , ["div", { className: 'Section-Title', style: {color: 'gray', textAlign: "center"} }, section.title] 
                              ]  
                            ]);
                }
   
    
    return [  "div"
            , { className: 'Full CommandBar', style: { display: "table"} }
            , c ];

}
export {CommandBar};
