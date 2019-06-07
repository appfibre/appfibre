var css = '.flex {\ndisplay: -webkit-box;\ndisplay: -moz-box;\ndisplay: box;\ndisplay: -moz-flex;\ndisplay: flex;\n}', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
import { Flex, FlexItem } from "./Layout/FlexBox";
import { Grid, GridItem } from "./Layout/Grid";
import { SplitContainer } from "./Layout/SplitContainer";
import { TabContainer } from "./Layout/TabContainer";
var Layout = { Flex: Flex, FlexItem: FlexItem, Grid: Grid, GridItem: GridItem, TabContainer: TabContainer, SplitContainer: SplitContainer };
export { Layout };