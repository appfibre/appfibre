import { Services } from "@appfibre/core";

import { Transformer } from "./Transformer"
import { Parsers } from "./Parsers"

Services.Transformer = Transformer;
Services.Parsers = Parsers;

export default Services;
