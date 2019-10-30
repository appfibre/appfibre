import {types} from "@appfibre/types";
import styles from "./Styles";

type tab = string | {title?:string,className?:string}

export interface props {
    placement?: "top"|"bottom"|"left"|"right"
    className?: string
    className_Tab?: string
    tabs?: Array<tab>
    selectedIndex?: number
    style?: object
    tabStyle?: object
    tabStripStyle?: object
    selectedTabStyle?: object
    containerStyle?: object
    onSelectedIndexChanged?: (index:number)=>void
};


type Container = ["div", props, Array<any>];
let TabContainer = function transform(this:types.app.IAppLoaded, a:props, c:Array<any>):Container {
    let {className, placement, containerStyle, selectedIndex, onSelectedIndexChanged, tabStyle, tabs, style, selectedTabStyle, tabStripStyle, className_Tab, ...props} = a;

    let children:any[] = [];
    placement = placement || "top";
    let v = placement === "top" || placement === "bottom" ? true : false;

    let drawTab = (tab: tab, index: number) =>  Array.isArray(tab) ? tab :
                                                [ "div"
                                                ,   { className: (placement === "left" ? styles.TableRow : styles.TableCell) + (' ' + (typeof tab !== "string" && tab.className ? tab.className : className_Tab || '')) + ' ' + styles.Tab + ' ' + (index === selectedIndex ? styles.Tab_Selected : styles.Tab_Normal )
                                                    , style: index === selectedIndex ? selectedTabStyle : tabStyle, onClick: () => onSelectedIndexChanged ? onSelectedIndexChanged(index) : null 
                                                    }
                                                , typeof tab === "string" ? tab : tab.title
                                                ];

    if (placement === "top" || placement === "left") {
        children.push( [ "div"
                        , { style: tabStripStyle, className: styles.TabStrip + ' ' + (placement === "top" ? styles.TableRow : styles.TableCell)}
                        , [["div", { className: styles.Table + ' ' + styles.Fill }, tabs ? tabs.map(drawTab) : null]]
                        ]);
    }
    if (c) children.push( ["div", {className: (v ? styles.TableRow  : styles.TableCell) + ' ' + styles.Fill}, c ]);
    if (placement === "bottom" || placement === "right") {
        children.push( [ "div"
                        , { style: tabStripStyle, className: styles.TabStrip + ' ' + (placement === "bottom" ? styles.TableRow : styles.TableCell) }
                        , [["div", { className: styles.Table }, tabs ? tabs.map(drawTab) : null]]
                        ]);
    }

    return ["div", {className: styles.TabContainer + ' ' + styles.Table + (className ? ' ' + className : '') + ' ' + styles.Fill, style, ...props}, children];
}

export {TabContainer};
