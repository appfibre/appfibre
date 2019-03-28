import { ref } from "./types";
import { NodePath } from "@babel/traverse";
import { types } from "@babel/core";
export declare function _require(this: any, ref: ref, path: NodePath<types.ObjectProperty>, name?: string): types.Node;
export declare function _app(this: any, ref: ref, path: NodePath<types.ObjectProperty>, name?: string): types.Node;
