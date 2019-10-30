import { types} from "@appfibre/types"
import { Services } from "@appfibre/core"
import { Parsers } from "../services/Parsers"

export class Transformer extends Services.Transformer {
    constructor(settings?:types.app.ITransformSettings) {
        if (settings && !settings.parsers) settings.parsers = Parsers;
        super(settings||{module: types.app.ModuleSystem.AMD, parsers: Parsers});
    }

}