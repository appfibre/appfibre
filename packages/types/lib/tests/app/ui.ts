import { types } from '../..'

let a1:types.app.UI.Element<string, {}, string> = "test";
let a2:types.app.UI.Element<string, {}, string> = ["test", {}];
let a3:types.app.UI.Element<string, {}, string> = ["test", {}, "test"];
let a4:types.app.UI.Element<string, {}, string> = ["test", {}, [ ] ];
let a5:types.app.UI.Element<string, {}, string> = ["test", {}, [ ["test", {}] ]];
let a6:types.app.UI.Element<string, {}, string> = ["test", {}, [ ["test", {}, "test"]] ];
console.log('avoiding TS6133', [a1, a2, a3, a4, a5, a6] );

let b1:types.app.UI.Element<Function, {}, Function> = ()=>{};
let b2:types.app.UI.Element<Function, {}, Function> = [()=>{}, {}];
let b3:types.app.UI.Element<Function, {}, Function> = [()=>{}, {}, ()=>{}];
let b4:types.app.UI.Element<Function, {}, Function> = [()=>{}, {}, [ ] ];
let b5:types.app.UI.Element<Function, {}, Function> = [()=>{}, {}, [ [ ()=>{}, {}] ]];
let b6:types.app.UI.Element<Function, {}, Function> = [()=>{}, {}, [ [ ()=>{}, {}, ()=>{} ]] ];
console.log('avoiding TS6133', [b1, b2, b3, b4, b5, b6] );
