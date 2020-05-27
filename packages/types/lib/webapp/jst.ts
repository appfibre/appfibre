import { jst as _jst } from '../jst/index';

export namespace jst {
    export type webapp_templates = _jst.default_templates & {
          ".webapp": { ".webapp": string, main: _jst.template<webapp_templates> }
    }
}
