import Fastify from 'fastify';
import { Services } from '../../core'
import types from '../../types';
import { NotFound } from 'http-errors';
import * as fs from 'fs';
import { Parsers } from '../../core/dist/services';
import { html } from '../../processors';
//import * as path from 'path';
import * as util from './util';
//import { Promise } from '../../core/dist/services/Loader';

export interface serverInfo
{
    port: number
}

function server(options: {port?:number, loglevel?: string, folder?:string}) : Promise<serverInfo> {
    Parsers[".html"] = Parsers[".shtml"] = Parsers[".htm"] = html;
    let jstRaw = new Services.Transformer({module: types.app.ModuleSystem.Raw, compact: true, parsers: Parsers })
    let jstCjs = new Services.Transformer({module: types.app.ModuleSystem.AMD, compact: true, parsers: Parsers })
    
    const fastify = Fastify({ logger: options.loglevel ? { level: options.loglevel} : false });

    // let result = jst.transform(source);
    fastify.get('/*', (request, reply) => {
        let uri = util.resolveURI(util.parseURI(request.req.url || ''), options.folder);

        if (uri.jst) {
            
            let content = fs.readFileSync(uri.jst).toString();
            //reply.send(`{".${uri.extension}": ${content} }`);
            let result = uri.extension != '' ? jstRaw.transform(`{".${uri.extension}": ${content} }`, uri.jst) : jstCjs.transform(content, uri.jst);
            reply.type(result.format);
            reply.send(result.output);
        } 
        else if (uri.physicalPath && fs.existsSync(uri.physicalPath))
        {
            if (uri.extension)
                reply.type(util.getContentType(uri.extension));
            //sendstatic
            reply.send(fs.readFileSync(uri.physicalPath).toString());
        } else if (true) {
            reply.send(JSON.stringify({uri, options}));
        }
        else 
            throw new NotFound();
    });

    return new Promise((resolve:any, reject:any) => {
        fastify.listen(options.port || 0).then(() => {
            var addr = fastify.server.address();
            var port = 0;
            if (addr && typeof addr != 'string') port = addr.port;
            
            resolve({port});
        }).catch((e:any) => {
            //fastify.log.error(e);
            reject(e);
            //process.exit(1)
        });
        
    });

    

}



export { server }