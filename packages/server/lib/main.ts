import {server} from './server';
import  yargs = require('yargs');

const argv = yargs
    .option('port', {
        alias: 'p',
        description: 'Port',
        type: 'number',
    })
    .option('loglevel', {
        alias: 'l',
        description: 'Log level (trace, info, warn, error, fatal)',
        type: 'string',
    })
    .option('folder', {
        alias: 'f',
        description: 'Folder to server as root',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (!/electron.exe/.test(process.argv[0]))
    server(argv).then((info: {port: number}) => console.log('Server started on port ' + info.port)).catch(() => {process.exit(1)});

export {server};