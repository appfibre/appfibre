"use strict";
exports.__esModule = true;
exports.server = void 0;
var server_1 = require("./server");
exports.server = server_1.server;
var yargs = require("yargs");
var argv = yargs
    .option('port', {
    alias: 'p',
    description: 'Port',
    type: 'number'
})
    .option('loglevel', {
    alias: 'l',
    description: 'Log level (trace, info, warn, error, fatal)',
    type: 'string'
})
    .option('folder', {
    alias: 'f',
    description: 'Folder to server as root',
    type: 'string'
})
    .help()
    .alias('help', 'h')
    .argv;
if (!/electron.exe/.test(process.argv[0]))
    server_1.server(argv).then(function (info) { return console.log('Server started on port ' + info.port); })["catch"](function () { process.exit(1); });
