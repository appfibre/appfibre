import react from 'react';
import preact from 'preact';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Adapter as PreactAdapter } from 'enzyme-adapter-preact';

class r extends react.Component
{
    render() {
        //return react.createElement("div", {}, [ react.createElement("span", {key: 1}, "TEST")]);
        return react.Fragment({children: "Testing"});
    }
}

class p extends preact.Component
{
    render() {
        //return preact.h("div", {}, [ preact.h("span", {key: 1}, "TEST")]);
        return preact.h("Testing", {});
    }
}

console.log('react');
Enzyme.configure({ adapter: new Adapter() });
console.log(Enzyme.render(react.createElement(r)).toString());

console.log('preact');
Enzyme.configure({ adapter: new PreactAdapter() });
console.log(Enzyme.render(preact.h(p, {}, [])).toString());
//console.log(Enzyme.render(react.createElement("div", null, "test")).toString());

