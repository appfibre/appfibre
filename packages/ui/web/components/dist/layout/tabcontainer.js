"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContainer = void 0;
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
      font-family: sans-serif;
    }
 
    .dropdown {
      padding: 3px 8px 8px;
    }
 
    .label {
      display: block;
      margin-bottom: 5px;
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }
 
    .dropdown-list-container {
      position: relative;
    }
 
    .dropdown-list {
      position: absolute;
      width: 100%;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      background-color: #ffffff;
      border: 1px solid #a1a1a1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      list-style: none;
    }
 
    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      font-size: 16px;
      height: 40px;
      cursor: pointer;
    }
  </style>
 
  <div class="dropdown">
    <span class="label">Label</span>
 
    <my-button as-atom>Content</my-button>
 
    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
`;
class tabContainer extends HTMLElement {
    constructor() {
        super();
        this._sR = this.attachShadow({ mode: 'open' });
        this._sR.appendChild(template.content.cloneNode(true));
        this.label = this._sR.querySelector('.label');
        this.button = this._sR.querySelector('my-button');
        this.dropdownList = this._sR.querySelector('.dropdown-list');
    }
    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }
    get label() {
        return this.getAttribute('label');
    }
    set label(value) {
        this.setAttribute('label', value);
    }
    get option() {
        return this.getAttribute('option');
    }
    set option(value) {
        this.setAttribute('option', value);
    }
    get options() {
        return JSON.parse(this.getAttribute('options'));
    }
    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }
    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }
    render() {
    }
}
//window.customElements.define('af-tab', Button);
let TabContainer = {
    control: tabContainer,
    type: 'webcomponent',
    designer: null
};
exports.TabContainer = TabContainer;
