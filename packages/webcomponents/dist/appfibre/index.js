var css = '.flex {\ndisplay: -webkit-box;\ndisplay: -moz-box;\ndisplay: box;\ndisplay: -moz-flex;\ndisplay: flex;\n}', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
import * as Layout from "./Layout";
import { Designer } from "./Designer";
export { Designer, Layout };
