export namespace registry {
    export enum itemType {
        Service = 0,
        Component = 1
    }
    export enum licenseType {
        "MIT",
        "GNU"    
    }
    export interface item {
        displayName:string
        fullyqualifiedname:string
        type:itemType
        license:licenseType
        dependencies:Array<string>
        parent?:item
        cdn?:string

    }

}
