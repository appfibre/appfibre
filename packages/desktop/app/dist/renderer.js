"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
//import { WebApp } from '@appfibre/webapp';
//import * as wc from '@appfibre/webcomponents'
//import types from '@appfibre/types';
//import * as monaco from 'monaco-editor';
alert(window);
var monaco = window.monaco;
//alert(monaco);
//alert(types.app);
/*var app = new WebApp (
  { "main": ["div", null, "ok"]
, "settings": { "logLevel": types.app.LogLevel.Warn, "title": "appfibre", "fullHeight": true, "cdn": {".import": "./scripts/loader.js"}}
, "components": {".import": "./scripts/components.js"}
, "controllers":
     { "designer":
        { "match": new RegExp(/(designer.html)(?:(.+\\?)?)([^#]*)((?:#)(.*))?$/i)
        , "resolve": function() { return wc.appfibre.Designer; }
        }
      , "index": { "resolve": function(){return this.main; } }
      }
}
);
app.run();*/
alert(document.getElementById('container'));
var editor = monaco.editor.create(document.getElementById('container'), {
    value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
    ].join('\n'),
    language: 'json'
});
var Menu = electron_1.remote.Menu; // A
var path = require('path');
var mainProcess = electron_1.remote.require('./main.js');
var currentWindow = electron_1.remote.getCurrentWindow();
var basePath = '';
function nodeRequire(url) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
}
//const marked = require('marked');
//alert(monaco);
var markdownView = document.querySelector('#markdown');
var htmlView = document.querySelector('#html');
var newFileButton = document.querySelector('#new-file');
var openFileButton = document.querySelector('#open-file');
var saveMarkdownButton = document.querySelector('#save-markdown');
var revertButton = document.querySelector('#revert');
var saveHtmlButton = document.querySelector('#save-html');
var showFileButton = document.querySelector('#show-file');
var openInDefaultButton = document.querySelector('#open-in-default');
var address = document.querySelector('#address');
var filePath = null;
var originalContent = '';
var isDifferentContent = function (content) { return content !== markdownView.value; };
var renderMarkdownToHtml = function (source, url) {
    //htmlView.innerHTML = marked(markdown, { sanitize: true });
    //let  m = { exports: {default:{}}};
    try {
        //let result = jst.transform(source);
        //if (result.format == 'html' || result.format == 'xml')
        //  htmlView.innerHTML = result.output;
        //else  
        //  htmlView.innerText = JSON.stringify(result);
        //htmlView.innerText = '@TODO';
        //htmlView.className = "rendered-html";
    }
    catch (e) {
        htmlView.innerText = e.message;
        htmlView.className = "rendered-html error";
    }
};
window.addEventListener('resize', function (ev) {
    currentWindow.getBrowserView().setBounds(htmlView.getBoundingClientRect());
});
var renderFile = function (file, content) {
    filePath = file;
    originalContent = content;
    markdownView.value = content;
    renderMarkdownToHtml(content, file);
    showFileButton.disabled = false;
    openInDefaultButton.disabled = false;
    updateUserInterface(false);
};
var updateUserInterface = function (isEdited) {
    var title = 'appfibre Code';
    if (filePath) {
        title = path.basename(filePath) + " - " + title;
    }
    if (isEdited) {
        title = title + " (Edited)";
    }
    currentWindow.setTitle(title);
    currentWindow.setDocumentEdited(isEdited);
    saveMarkdownButton.disabled = !isEdited;
    revertButton.disabled = !isEdited;
};
markdownView.addEventListener('keyup', function (event) {
    var currentContent = event.target.value;
    renderMarkdownToHtml(currentContent);
    updateUserInterface(currentContent !== originalContent);
});
newFileButton.addEventListener('click', function () {
    mainProcess.createWindow();
});
openFileButton.addEventListener('click', function () {
    mainProcess.getFileFromUser(currentWindow).then(function (file) {
        if (file) {
            var url = mainProcess.openFile(currentWindow, file);
            if (url) //currentWindow.loadURL(url);
                currentWindow.getBrowserView().webContents.loadURL(url);
        }
    });
});
saveMarkdownButton.addEventListener('click', function () {
    mainProcess.saveMarkdown(currentWindow, filePath, markdownView.value);
});
revertButton.addEventListener('click', function () {
    markdownView.value = originalContent;
    renderMarkdownToHtml(originalContent);
});
saveHtmlButton.addEventListener('click', function () {
    mainProcess.saveHtml(currentWindow, htmlView.innerHTML);
});
var showFile = function () {
    if (!filePath) {
        return alert('This file has not been saved to the file system.');
    }
    electron_1.shell.showItemInFolder(filePath);
};
var openInDefaultApplication = function () {
    if (!filePath) {
        return alert('This file has not been saved to the file system.');
    }
    electron_1.shell.openItem(filePath);
};
showFileButton.addEventListener('click', showFile);
openInDefaultButton.addEventListener('click', openInDefaultApplication);
electron_1.ipcRenderer.on('show-file', showFile);
electron_1.ipcRenderer.on('open-in-default', openInDefaultApplication);
electron_1.ipcRenderer.on('file-opened', function (event, file, content) {
    if (currentWindow.isDocumentEdited() && isDifferentContent(content)) {
        var result = electron_1.remote.dialog.showMessageBox(currentWindow, {
            type: 'warning',
            title: 'Overwrite Current Unsaved Changes?',
            message: 'Opening a new file in this window will overwrite your unsaved changes. Open this file anyway?',
            buttons: [
                'Yes',
                'Cancel',
            ],
            defaultId: 0,
            cancelId: 1
        }).then(function (r) {
            if (r.checkboxChecked)
                renderFile(file, content);
        });
        //if (result === 1) { return; }
    }
    else
        renderFile(file, content);
});
electron_1.ipcRenderer.on('file-changed', function (event, file, content) {
    if (!isDifferentContent(content))
        return;
    var result = electron_1.remote.dialog.showMessageBox(currentWindow, {
        type: 'warning',
        title: 'Overwrite Current Unsaved Changes?',
        message: 'Another application has changed this file. Load changes?',
        buttons: [
            'Yes',
            'Cancel',
        ],
        defaultId: 0,
        cancelId: 1
    });
    renderFile(file, content);
});
// Implement Drag and Drop 
document.addEventListener('dragstart', function (event) { return event.preventDefault(); });
document.addEventListener('dragover', function (event) { return event.preventDefault(); });
document.addEventListener('dragleave', function (event) { return event.preventDefault(); });
document.addEventListener('drop', function (event) { return event.preventDefault(); });
var getDraggedFile = function (event) { return event.dataTransfer.items[0]; };
var getDroppedFile = function (event) { return event.dataTransfer.files[0]; };
var fileTypeIsSupported = function (file) {
    return ['text/plain', 'text/markdown'].includes(file.type);
};
markdownView.addEventListener('dragover', function (event) {
    var file = getDraggedFile(event);
    if (fileTypeIsSupported(file)) {
        markdownView.classList.add('drag-over');
    }
    else {
        markdownView.classList.add('drag-error');
    }
});
markdownView.addEventListener('dragleave', function () {
    markdownView.classList.remove('drag-over');
    markdownView.classList.remove('drag-error');
});
markdownView.addEventListener('drop', function (event) {
    var file = getDroppedFile(event);
    if (fileTypeIsSupported(file)) {
        mainProcess.openFile(currentWindow, file.path);
    }
    else {
        alert('That file type is not supported');
    }
    markdownView.classList.remove('drag-over');
    markdownView.classList.remove('drag-error');
});
var createContextMenu = function () {
    return Menu.buildFromTemplate([
        { label: 'Open File', click: function () { mainProcess.getFileFromUser(); } },
        {
            label: 'Show File in Folder',
            click: showFile,
            enabled: !!filePath
        },
        {
            label: 'Open in Default',
            click: openInDefaultApplication,
            enabled: !!filePath
        },
        { type: 'separator' },
        { label: 'Cut', role: 'cut' },
        { label: 'Copy', role: 'copy' },
        { label: 'Paste', role: 'paste' },
        { label: 'Select All', role: 'selectAll' },
    ]);
};
markdownView.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    createContextMenu().popup();
});
electron_1.ipcRenderer.on('save-markdown', function () {
    mainProcess.saveMarkdown(currentWindow, filePath, markdownView.value);
});
electron_1.ipcRenderer.on('save-html', function () {
    mainProcess.saveHtml(currentWindow, filePath, markdownView.value);
});
//# sourceMappingURL=renderer.js.map