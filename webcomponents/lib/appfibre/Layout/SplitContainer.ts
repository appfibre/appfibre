import appfibre from "@appfibre/types";

export interface SplitContainer_Attributes {
    direction?: "row"|"column"|"row-reverse"|"column-reverse"
    defaults?: Array<initial>
    children?: Array<any>
};

export interface state {
    direction: "row"|"column"|"row-reverse"|"column-reverse"
    vertical: boolean
    container?: HTMLElement
    panels: Array<panel>
    resize?: {
        splitter:number
        prev:number,
        next:number,
        prev_ratio:number,
        next_ratio:number,
        start:number
    }
};

export interface initial {
    size?:number
    min?:number
    max?:number
};

export interface panel extends initial {
    ratio?:any
    content: any
}

let SplitContainer /*: fibre.UI.Component*/ = function inject(app:appfibre.webapp.IWebAppLoaded) {
    return class SplitContainer extends app.services.UI.Component<SplitContainer_Attributes, state> {
        state:state
        
        constructor(props:SplitContainer_Attributes) {
            super(props);
            var panels = (props.children||[]).map((c:any, i:number) => props.defaults && i < props.defaults.length ? {...props.defaults[i], content: c} : {content: c});
            var vertical = props.direction === "column" || props.direction === "column-reverse";
            this.state = {direction: props.direction || "row", vertical, panels: this.distributeSpace(panels, vertical ? screen.availHeight : screen.availWidth) };
            //this.window_resize = this.window_resize.bind(this);
            this.window_mouseup = this.window_mouseup.bind(this);
            this.window_mousemove = this.window_mousemove.bind(this);
            this.splitter_mousedown = this.splitter_mousedown.bind(this);
        }

        distributeSpace(panels:Array<panel>, available:number):Array<panel> {
            var n = 0;
            var left = panels.reduce((pv, cv) => { if (!cv.size) n++; return cv.size ? pv - cv.size : pv}, available - ((panels.length-1)));
            return panels.map(c => {return {...c, ratio: ((c.size || (left / n)) / available)}});
        }
        
        window_mousemove(e:MouseEvent) {
            if (this.state.resize) {
                let index = this.state.resize.splitter;
                let delta = (this.state.vertical ? e.clientY : e.clientX) - this.state.resize.start;
                let prev = this.state.panels[index];
                let next = this.state.panels[index+1];
                let p = this.state.resize.prev;
                let n = this.state.resize.next;
                let pr = this.state.resize.prev_ratio;
                let nr = this.state.resize.next_ratio;
                if ((!prev.max || prev.max >= p + delta) && (!prev.min || prev.min <= p + delta) && (!next.min || next.min <= n - delta) && (!next.max || next.max >= n - delta)) {
                    this.setState({panels: this.state.panels.map((c, i) => { 
                        if (i === index || i === index + 1) {
                            if (!c.size || app.info.browser === appfibre.webapp.browserType.Safari) {
                                c.ratio = (i === index ? pr : nr) + ((i === index ? 1 : -1) * (delta / (this.state.vertical ? screen.availHeight : screen.availWidth )));
                            }
                            else 
                                c.size = i === index ? p + delta : n - delta;
                        }
                        return c;
                    })});
                }
        
            }
        }

        splitter_mousedown(e:MouseEvent, index:number) {
            if (e.target) {
                var t = (<HTMLElement>e.target);
                var p = t.previousElementSibling;
                var n = t.nextElementSibling;
                var v = this.state.vertical;
                if (p && n)
                    this.setState({resize: {splitter: index, prev: p[v ? "clientHeight" : "clientWidth"], next: n[v ? "clientHeight" : "clientWidth"], start: v ? e.clientY : e.clientX, prev_ratio: this.state.panels[index].ratio, next_ratio: this.state.panels[index+1].ratio }});
            }
            window.addEventListener('mouseup', this.window_mouseup);
            window.addEventListener('mousemove', this.window_mousemove);
        }

        window_mouseup(e:MouseEvent) {
            window.removeEventListener('mouseup', this.window_mouseup);
            window.removeEventListener('mousemove', this.window_mousemove);
            this.setState({resize: undefined });
        }

        render() {
            let children:any[] = [];
            let bt = app.info.browser;
            
            var sep_style:{[index:string]: any} = {margin: 0, padding: 0, width: '1px', cursor: this.state.vertical ? "row-resize" : "col-resize"};
            sep_style[this.state.vertical ? "width" : "height"] = "100%";
            if (!this.state.vertical) { sep_style.display = "inline-block"; sep_style.verticalAlign = "top"; }

            this.state.panels.forEach((c:panel, i:number) => {
                if (i > 0)
                    children.push(["div", {style: sep_style, onMouseDown: (e:MouseEvent) => this.splitter_mousedown.call(this, e, i-1)}]);

                var style:{[index:string]: any} = {border: "0px solid grey", margin: 0, padding: 0};
                style[this.state.vertical ? "width" : "height"] = "100%";
                style[this.state.vertical ? "height" : "width"] = (!c.size || bt === appfibre.webapp.browserType.Safari) ? ((c.ratio * 100) + '%') : (c.size + 'px');
                if (!c.size) style.flexGrow = 1;
                if (this.state.resize) style["pointerEvents"] = "none";
                
                if (!this.state.vertical) { style.display = "inline-block"; style.verticalAlign = "top"; }
                children.push(["div", {style}, [c.content]]);
            });
        
            return super.render(["div", {style: {display: "flex", flexDirection: this.state.direction, margin:0, padding: 0, height: "100%", width: "100%", overflow: "hidden"}}, children]);
        }

    };
}

export {SplitContainer};
