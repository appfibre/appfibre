import { IAppLoaded, element } from "../types";
declare let BaseComponent: (app: IAppLoaded) => {
    new (): {
        [x: string]: any;
        renderInternal(e: string | {} | Function | [TimerHandler, ({
            [key: string]: any;
        } | undefined)?, (string | {} | Function | {
            [index: number]: [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | {} | Function | any | undefined)?];
        } | undefined)?] | {
            [index: number]: string | {} | Function | [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | {} | Function | {
                [index: number]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | {} | Function | any | undefined)?];
            } | undefined)?] | any | import("../types").Promise<element> | undefined;
        } | import("../types").Promise<element> | undefined, index?: number | undefined): any;
        render(e: string | {} | Function | [TimerHandler, ({
            [key: string]: any;
        } | undefined)?, (string | {} | Function | {
            [index: number]: [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | {} | Function | any | undefined)?];
        } | undefined)?] | {
            [index: number]: string | {} | Function | [TimerHandler, ({
                [key: string]: any;
            } | undefined)?, (string | {} | Function | {
                [index: number]: [TimerHandler, ({
                    [key: string]: any;
                } | undefined)?, (string | {} | Function | any | undefined)?];
            } | undefined)?] | any | import("../types").Promise<element> | undefined;
        } | import("../types").Promise<element> | undefined): any;
    };
    [x: string]: any;
};
export { BaseComponent };
