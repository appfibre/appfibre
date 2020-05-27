"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.openFile = exports.getUrl = exports.saveHtml = exports.saveMarkdown = exports.getFileFromUser = exports.createWindow = void 0;
var electron_1 = require("electron");
var application_menu_1 = require("./application-menu");
//import { fastify } from './server';
var server_1 = require("@appfibre/server");
var fs = require("fs");
//var editor = monaco.editor.create();
//editor.setValue()
var windows = new Set();
var openFiles = new Map();
var port = 9000;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    electron_1.app.quit();
}
else {
    electron_1.app.on('ready', function () {
        server_1.server({ port: port, loglevel: 'warn', folder: '' }).then(function (si) { return port = si.port; });
        application_menu_1.createApplicationMenu();
        createWindow();
        /*fastify.listen(9000).then(() => {
          createApplicationMenu();
          createWindow();
        }).catch((e) => {
          fastify.log.error(e);
          process.exit(1)
        });*/
    });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function (event, hasVisibleWindows) {
        if (!hasVisibleWindows)
            createWindow();
    });
}
function createWindow() {
    var x, y;
    var currentWindow = electron_1.BrowserWindow.getFocusedWindow();
    if (currentWindow) {
        var _a = currentWindow.getPosition(), currentWindowX = _a[0], currentWindowY = _a[1];
        x = currentWindowX + 10;
        y = currentWindowY + 10;
    }
    var newWindow = new electron_1.BrowserWindow({ x: x, y: y, show: false, darkTheme: true, webPreferences: { nodeIntegration: true } });
    newWindow.webContents.openDevTools();
    var view = new electron_1.BrowserView();
    newWindow.setBrowserView(view);
    //view.setBounds({ x: 200, y: 200, width: 400, height: 400 });
    //view.setAutoResize({ height: true, width: true });
    //view.webContents.loadURL(getUrl("C:/Users/Dawid/OneDrive/Documents/Finances/PropertyAdmin/statement.jst") );
    newWindow.webContents.setDevToolsWebContents(view.webContents);
    //view.webContents.toggleDevTools();
    newWindow.loadFile('./app/index.html');
    newWindow.once('ready-to-show', function () {
        newWindow.show();
    });
    newWindow.on('focus', application_menu_1.createApplicationMenu);
    newWindow.on('close', function (event) {
        if (newWindow.isDocumentEdited()) {
            event.preventDefault();
            electron_1.dialog.showMessageBox(newWindow, {
                type: 'warning',
                title: 'Quit with Unsaved Changes?',
                message: 'Your changes will be lost permanently if you do not save.',
                buttons: [
                    'Quit Anyway',
                    'Cancel',
                ],
                cancelId: 1,
                defaultId: 0
            }).then(function (d) {
                if (d.response == 0)
                    newWindow.destroy();
            });
        }
    });
    newWindow.on('closed', function () {
        windows["delete"](newWindow);
        application_menu_1.createApplicationMenu();
        stopWatchingFile(newWindow);
        newWindow = null;
    });
    windows.add(newWindow);
    return newWindow;
}
exports.createWindow = createWindow;
;
function getFileFromUser(targetWindow) {
    return __awaiter(this, void 0, void 0, function () {
        var file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog(targetWindow, {
                        properties: ['openFile'],
                        filters: [
                            { name: 'Source Files', extensions: ['jst', 'json'] },
                            { name: 'Text Files', extensions: ['txt'] },
                            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
                        ]
                    })];
                case 1:
                    file = _a.sent();
                    return [2 /*return*/, (file.canceled) ? null : file.filePaths[0]];
            }
        });
    });
}
exports.getFileFromUser = getFileFromUser;
;
function openFile(targetWindow, file) {
    var content = fs.readFileSync(file).toString();
    electron_1.app.addRecentDocument(file);
    targetWindow.setRepresentedFilename(file);
    //targetWindow.webContents.send('file-opened', file, content);
    application_menu_1.createApplicationMenu();
    startWatchingFile(targetWindow, file);
    return getUrl(file);
}
exports.openFile = openFile;
;
function saveMarkdown(targetWindow, file, content) {
    if (!file) {
        electron_1.dialog.showSaveDialog(targetWindow, {
            title: 'Save Markdown',
            defaultPath: electron_1.app.getPath('documents'),
            filters: [
                { name: 'Markdown Files', extensions: ['md', 'markdown'] }
            ]
        }).then(function (f) {
            if (!f.canceled) {
                fs.writeFileSync(file, content);
                openFile(targetWindow, file);
            }
        });
    }
    else {
        fs.writeFileSync(file, content);
        openFile(targetWindow, file);
    }
}
exports.saveMarkdown = saveMarkdown;
;
function saveHtml(targetWindow, content) {
    electron_1.dialog.showSaveDialog(targetWindow, {
        title: 'Save HTML',
        defaultPath: electron_1.app.getPath('documents'),
        filters: [
            { name: 'HTML Files', extensions: ['html', 'htm'] }
        ]
    }).then(function (f) {
        if (!f.canceled)
            fs.writeFileSync(f.filePath, content);
    });
}
exports.saveHtml = saveHtml;
;
function startWatchingFile(targetWindow, file) {
    stopWatchingFile(targetWindow);
    var watcher = fs.watchFile(file, function () {
        var content = fs.readFileSync(file).toString();
        targetWindow.webContents.send('file-changed', file, content);
    });
    openFiles.set(targetWindow, watcher);
}
;
function stopWatchingFile(targetWindow) {
    if (openFiles.has(targetWindow)) {
        openFiles.get(targetWindow).stop();
        openFiles["delete"](targetWindow);
    }
}
;
function getUrl(filename) {
    if (port) {
        //let address = fastify.server.address();
        //let url =  (typeof address == "string") ? address : "http://localhost:" + address.port.toString();
        var url = "http://localhost:" + port.toString();
        var path = filename;
        while (/\\/.test(path))
            path = path.replace('\\', '/');
        return url + (path.startsWith('/') ? '' : '/') + path;
    }
}
exports.getUrl = getUrl;
/*
// Run the server!
const start = async () => {
  try {
    await fastify.listen(0);
    var address = fastify.server.address();
    if (typeof address != 'string') port = address.port;
    //fastify.log.info(`server listening on ${address}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}*/
//# sourceMappingURL=main.js.map