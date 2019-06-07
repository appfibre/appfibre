"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const preact_1 = __importDefault(require("preact"));
const enzyme_1 = __importDefault(require("enzyme"));
const enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
const enzyme_adapter_preact_1 = require("enzyme-adapter-preact");
class r extends react_1.default.Component {
    render() {
        //return react.createElement("div", {}, [ react.createElement("span", {key: 1}, "TEST")]);
        return react_1.default.Fragment({ children: "Testing" });
    }
}
class p extends preact_1.default.Component {
    render() {
        //return preact.h("div", {}, [ preact.h("span", {key: 1}, "TEST")]);
        return preact_1.default.h("Testing", {});
    }
}
console.log('react');
enzyme_1.default.configure({ adapter: new enzyme_adapter_react_16_1.default() });
console.log(enzyme_1.default.render(react_1.default.createElement(r)).toString());
console.log('preact');
enzyme_1.default.configure({ adapter: new enzyme_adapter_preact_1.Adapter() });
console.log(enzyme_1.default.render(preact_1.default.h(p, {}, [])).toString());
//console.log(Enzyme.render(react.createElement("div", null, "test")).toString());
