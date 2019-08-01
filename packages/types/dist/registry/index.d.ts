export declare namespace registry {
    enum itemType {
        Service = 0,
        Component = 1
    }
    enum licenseType {
        "MIT" = 0,
        "GNU" = 1
    }
    interface item {
        displayName: string;
        fullyqualifiedname: string;
        type: itemType;
        license: licenseType;
        dependencies: Array<string>;
        parent?: item;
        cdn?: string;
    }
}
//# sourceMappingURL=index.d.ts.map