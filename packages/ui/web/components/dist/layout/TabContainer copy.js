"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContainer = void 0;
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: 2px;
    }
 
    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
 
      width: 100%;
      height: 40px;
 
      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>
 
  <div class="container">
    <button>Label</button>
  </div>
`;
class tabContainer extends HTMLElement {
    constructor() {
        super();
        let _shadowRoot = this.attachShadow({ mode: 'open' });
        _shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
//window.customElements.define('af-tab', Button);
let TabContainer = {
    control: tabContainer,
    designer: null
};
exports.TabContainer = TabContainer;
