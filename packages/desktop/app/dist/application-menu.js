"use strict";
exports.__esModule = true;
exports.createApplicationMenu = void 0;
var electron_1 = require("electron");
var mainProcess = require("./main");
var createApplicationMenu = function () {
    var hasOneOrMoreWindows = !!electron_1.BrowserWindow.getAllWindows().length;
    var focusedWindow = electron_1.BrowserWindow.getFocusedWindow();
    var hasFilePath = !!(focusedWindow && focusedWindow.getRepresentedFilename());
    //type menu = {label?: string, type?: 'separator', submenu?: Array<menu>, accelerator?: string, enabled?: boolean, role?:string, click?:(item:MenuItem, focusedWindow: BrowserWindow)=>any};
    var template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New File',
                    accelerator: 'CommandOrControl+N',
                    click: function () {
                        mainProcess.createWindow();
                    }
                },
                {
                    label: 'Open File',
                    accelerator: 'CommandOrControl+O',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            return mainProcess.getFileFromUser(focusedWindow);
                        }
                        var newWindow = mainProcess.createWindow();
                        newWindow.on('show', function () {
                            mainProcess.getFileFromUser(newWindow);
                        });
                    }
                },
                {
                    label: 'Save File',
                    accelerator: 'CommandOrControl+S',
                    enabled: hasOneOrMoreWindows,
                    click: function (item, focusedWindow) {
                        if (!focusedWindow) {
                            return electron_1.dialog.showErrorBox('Cannot Save or Export', 'There is currently no active document to save or export.');
                        }
                        mainProcess.saveMarkdown(focusedWindow);
                    }
                },
                {
                    label: 'Export HTML',
                    accelerator: 'Shift+CommandOrControl+S',
                    enabled: hasOneOrMoreWindows,
                    click: function (item, focusedWindow) {
                        if (!focusedWindow) {
                            return electron_1.dialog.showErrorBox('Cannot Save or Export', 'There is currently no active document to save or export.');
                        }
                        mainProcess.saveHtml(focusedWindow);
                    }
                },
                { type: 'separator' },
                {
                    label: 'Show File',
                    enabled: hasFilePath,
                    click: function (item, focusedWindow) {
                        if (!focusedWindow) {
                            return electron_1.dialog.showErrorBox('Cannot Show File\'s Location', 'There is currently no active document show.');
                        }
                        focusedWindow.webContents.send('show-file');
                    }
                },
                {
                    label: 'Open in Default Application',
                    enabled: hasFilePath,
                    click: function (item, focusedWindow) {
                        if (!focusedWindow) {
                            return electron_1.dialog.showErrorBox('Cannot Open File in Default Application', 'There is currently no active document to open.');
                        }
                        focusedWindow.webContents.send('open-in-default');
                    }
                },
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CommandOrControl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CommandOrControl+Z',
                    role: 'redo'
                },
                { type: 'separator' },
                {
                    label: 'Cut',
                    accelerator: 'CommandOrControl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CommandOrControl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CommandOrControl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CommandOrControl+A',
                    role: 'selectAll'
                },
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CommandOrControl+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'CommandOrControl+W',
                    role: 'close'
                },
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Visit Website',
                    click: function () { }
                },
                {
                    label: 'Toggle Developer Tools',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.getBrowserView().webContents.toggleDevTools();
                    }
                }
            ]
        }
    ];
    if (process.platform === 'darwin') {
        var name_1 = 'appfibre';
        template.unshift({
            label: name_1,
            submenu: [
                {
                    label: "About " + name_1,
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                { type: 'separator' },
                {
                    label: "Hide " + name_1,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideOthers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                { type: 'separator' },
                {
                    label: "Quit " + name_1,
                    accelerator: 'Command+Q',
                    click: function () { electron_1.app.quit(); }
                },
            ]
        });
        var windowMenu = template.find(function (item) { return item.label === 'Window'; }); // B
        windowMenu.submenu.push({ type: 'separator' }, {
            label: 'Bring All to Front',
            role: 'front'
        });
    }
    return electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
};
exports.createApplicationMenu = createApplicationMenu;
//# sourceMappingURL=application-menu.js.map