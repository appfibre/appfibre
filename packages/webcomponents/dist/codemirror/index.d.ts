import { types } from "@appfibre/types";
export declare type settings = Partial<{
    value: string;
    mode: string | object;
    lineSeparator: string | null;
    theme: string;
    indentUnit: number;
    smartIndent: boolean;
    tabSize: number;
    indentWithTabs: boolean;
    electricChars: boolean;
    specialChars: RegExp;
    direction: "ltr" | "rtl";
    rtlMoveVisually: boolean;
    keyMap: string;
    extraKeys: object;
    lineWrapping: boolean;
    lineNumbers: boolean;
    firstLineNumber: number;
    gutters: Array<string | {
        className: string;
        style?: string;
    }>;
    fixedGutter: boolean;
    scrollbarStyle: string;
    coverGutterNextToScrollbar: boolean;
    inputStyle: string;
    readOnly: boolean | string;
    showCursorWhenSelecting: boolean;
    lineWiseCopyCut: boolean;
    pasteLinesPerSelection: boolean;
    selectionsMayTouch: boolean;
    undoDepth: number;
    historyEventDelay: number;
    tabindex: number;
    autofocus: boolean;
    phrases: object;
    dragDrop: boolean;
    allowDropFileTypes: Array<string>;
    cursorBlinkRate: number;
    cursorScrollMargin: number;
    cursorHeight: number;
    resetSelectionOnContextMenu: boolean;
    workTime: number;
    workDelay: number;
    pollInterval: number;
    flattenSpans: boolean;
    addModeClass: boolean;
    maxHighlightLength: number;
    viewportMargin: number;
    spellcheck: boolean;
    autocorrect: boolean;
    autocapitalize: boolean;
    matchBrackets: boolean | Partial<{
        afterCursor: boolean;
        strict: boolean;
        maxScanLines: number;
        maxScanLineLength: number;
        maxHighlighLineLenght: number;
    }>;
    closeBrackets: boolean;
    continueComments: boolean;
    comment: boolean | {
        padding: string;
        commentBlankLines: boolean;
        indent: boolean;
        fullLines: boolean;
    };
}>;
declare let CodeMirror: (this: types.webapp.IWebAppLoaded, attr: {
    value: string;
    settings: Partial<{
        value: string;
        mode: string | object;
        lineSeparator: string | null;
        theme: string;
        indentUnit: number;
        smartIndent: boolean;
        tabSize: number;
        indentWithTabs: boolean;
        electricChars: boolean;
        specialChars: RegExp;
        direction: "rtl" | "ltr";
        rtlMoveVisually: boolean;
        keyMap: string;
        extraKeys: object;
        lineWrapping: boolean;
        lineNumbers: boolean;
        firstLineNumber: number;
        gutters: (string | {
            className: string;
            style?: string | undefined;
        })[];
        fixedGutter: boolean;
        scrollbarStyle: string;
        coverGutterNextToScrollbar: boolean;
        inputStyle: string;
        readOnly: string | boolean;
        showCursorWhenSelecting: boolean;
        lineWiseCopyCut: boolean;
        pasteLinesPerSelection: boolean;
        selectionsMayTouch: boolean;
        undoDepth: number;
        historyEventDelay: number;
        tabindex: number;
        autofocus: boolean;
        phrases: object;
        dragDrop: boolean;
        allowDropFileTypes: string[];
        cursorBlinkRate: number;
        cursorScrollMargin: number;
        cursorHeight: number;
        resetSelectionOnContextMenu: boolean;
        workTime: number;
        workDelay: number;
        pollInterval: number;
        flattenSpans: boolean;
        addModeClass: boolean;
        maxHighlightLength: number;
        viewportMargin: number;
        spellcheck: boolean;
        autocorrect: boolean;
        autocapitalize: boolean;
        matchBrackets: boolean | Partial<{
            afterCursor: boolean;
            strict: boolean;
            maxScanLines: number;
            maxScanLineLength: number;
            maxHighlighLineLenght: number;
        }>;
        closeBrackets: boolean;
        continueComments: boolean;
        comment: boolean | {
            padding: string;
            commentBlankLines: boolean;
            indent: boolean;
            fullLines: boolean;
        };
    }>;
    onChange?: Function | undefined;
    style?: any;
    className?: string | undefined;
}) => any;
export default CodeMirror;
//# sourceMappingURL=index.d.ts.map