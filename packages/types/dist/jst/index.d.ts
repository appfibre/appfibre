export declare namespace jst {
    type default_templates = {
        ".": {
            ".": string;
        };
        ".import": {
            ".import": string;
        };
        ".reference": {
            ".reference": any;
        };
        ".function": {
            ".function": string | null | undefined;
            arguments?: Array<string>;
            "return": template;
        };
        ".call": {
            ".call": template;
            arguments?: Array<template>;
        };
        ".exec": {
            ".exec": template;
            arguments?: Array<template>;
        };
        ".new": {
            ".new": template;
            arguments?: Array<template>;
        };
    };
    type primitive = string | number | boolean | undefined | null | Function;
    type json<T = {}> = primitive | {
        [index: number]: template<T>;
    } | {
        [key: string]: json<T>;
    } | ({
        [key in keyof default_templates]?: never;
    } & {
        [key: string]: any;
    });
    type template<T = default_templates> = T[keyof T] | primitive | json<T>;
}
//# sourceMappingURL=index.d.ts.map