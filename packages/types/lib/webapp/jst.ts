import { jst } from '../jst/index';

export namespace jst {
    export type webapp_templates = jst.default_templates & {
          ".webapp": { ".webapp": string, main: jst.template<webapp_templates> }
    }
}
