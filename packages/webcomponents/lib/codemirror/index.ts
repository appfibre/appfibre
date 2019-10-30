import { types } from "@appfibre/types";

export type settings = Partial<{
  value: string//|CodeMirror.Doc
  mode: string|object
  lineSeparator: string|null
  theme: string
  indentUnit: number
  smartIndent: boolean
  tabSize: number
  indentWithTabs: boolean
  electricChars: boolean
  specialChars: RegExp
  //specialCharPlaceholder: function(char) → Element
  direction: "ltr" | "rtl"
  rtlMoveVisually: boolean
  keyMap: string
  extraKeys: object
  //configureMouse: fn(cm: CodeMirror, repeat: "single" | "double" | "triple", event: Event) → Object
  lineWrapping: boolean
  lineNumbers: boolean
  firstLineNumber: number
  //lineNumberFormatter: function(line: integer) → string
  gutters: Array<string | {className: string, style?: string}>
  fixedGutter: boolean
  scrollbarStyle: string
  coverGutterNextToScrollbar: boolean
  inputStyle: string
  readOnly: boolean|string
  showCursorWhenSelecting: boolean
  lineWiseCopyCut: boolean
  pasteLinesPerSelection: boolean
  selectionsMayTouch: boolean
  undoDepth: number
  historyEventDelay: number
  tabindex: number
  autofocus: boolean
  phrases: object
  dragDrop: boolean
  allowDropFileTypes: Array<string>
  cursorBlinkRate: number
  cursorScrollMargin: number
  cursorHeight: number
  resetSelectionOnContextMenu: boolean
  workTime: number
  workDelay: number
  pollInterval: number
  flattenSpans: boolean
  addModeClass: boolean
  maxHighlightLength: number
  viewportMargin: number
  spellcheck: boolean
  autocorrect: boolean
  autocapitalize: boolean

  matchBrackets: boolean|Partial<{afterCursor:boolean, strict: boolean, maxScanLines:number, maxScanLineLength:number, maxHighlighLineLenght: number}>
  closeBrackets: boolean
  continueComments: boolean
  comment: boolean|{padding: string, commentBlankLines: boolean, indent: boolean, fullLines: boolean} //non-standard
}>

type props = { style:any, className:any, settings?: settings, children: any[], value: string, onChange?:(e:{target: {value:string}})=>void}
type state = { value:string, ready: boolean}

let CodeMirror = function transform(this:types.webapp.IWebAppLoaded, attr:{value:string, settings:settings, onChange?:Function, style?:any, className?:string}):any {
  let {settings, style, className, onChange, ...props} = attr;
  let init = (e:HTMLTextAreaElement) => {
    if (e) {
      this.services.moduleSystem.register('../../lib/codemirror', '@cdnjs/codemirror/5.48.4/codemirror.js');
      if (JSON.stringify(settings) !== e.getAttribute("codemirror")) {
        let existing = e.getAttribute("codemirror") != null;
        let resources = [ this.services.moduleSystem.import('@cdnjs/codemirror/5.48.4/codemirror.js')
                        , this.services.moduleSystem.import('@cdnjs/codemirror/5.48.4/codemirror.css')
                        ];
        if (settings.matchBrackets) resources.push(this.services.moduleSystem.import('@cdnjs/codemirror/5.48.4/addon/edit/matchbrackets.js'));
        if (settings.closeBrackets) resources.push(this.services.moduleSystem.import('@cdnjs/codemirror/5.48.4/addon/edit/closebrackets.js'));
        if (settings.continueComments) resources.push(this.services.moduleSystem.import('@cdnjs/codemirror/5.48.4/addon/comment/continuecomment.js'));
        if (settings.comment) resources.push(this.services.moduleSystem.import('@cdnjs/codemirror/5.48.4/addon/comment/comment.js'));
        Promise.all(resources).then(cm => {
          let codemirror = cm[0].default || cm[0];
          if (!existing) {
            let editor = codemirror.fromTextArea(e, settings);
            editor.on('change', () => {if (onChange) onChange(editor.getValue())}); 
          } else {
            console.log(' TODO ?????');
          }

        });

        e.setAttribute("codemirror", JSON.stringify(settings));
      }
    }
  }

  return ["div", {style, className}, [["textarea", {style: {height: "100%", width: "100%"}, ref: init, onChange: (e:any) => { if (attr.onChange) attr.onChange(e.target.value) }, ...props}]]];
};

export default CodeMirror;