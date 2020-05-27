import  { remote, ipcRenderer, shell, Accelerator } from 'electron';
//import { WebApp } from '@appfibre/webapp';
//import * as wc from '@appfibre/webcomponents'
//import types from '@appfibre/types';

//import * as monaco from 'monaco-editor';
alert(window);
const monaco = (<any>window).monaco;
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
alert(document.getElementById('container'))
var editor = monaco.editor.create(document.getElementById('container'), {
  value: [
    'function x() {',
    '\tconsole.log("Hello world!");',
    '}'
  ].join('\n'),
  language: 'json'
});



const { Menu } = remote; // A
const path = require('path');
const mainProcess = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const basePath = '';
function nodeRequire(url:string) {
    return new Function('url', 'tmpdir', 'tmpdir = tmpdir ? tmpdir : global.process.env.INIT_CWD; var __dirname__ = global.process.cwd(); if (__dirname__ != tmpdir) global.process.chdir(tmpdir); var _exp = (global.require || global.process.mainModule.constructor._load)(url); if (global.process.cwd() != __dirname__) global.process.chdir(__dirname__); return _exp;')(url, basePath);
}


//const marked = require('marked');
//alert(monaco);

const markdownView = <HTMLTextAreaElement>document.querySelector('#markdown');
const htmlView = <HTMLDivElement>document.querySelector('#html');
const newFileButton = <HTMLButtonElement>document.querySelector('#new-file');
const openFileButton = <HTMLButtonElement>document.querySelector('#open-file');
const saveMarkdownButton = <HTMLButtonElement>document.querySelector('#save-markdown');
const revertButton = <HTMLButtonElement>document.querySelector('#revert');
const saveHtmlButton = <HTMLButtonElement>document.querySelector('#save-html');
const showFileButton = <HTMLButtonElement>document.querySelector('#show-file');
const openInDefaultButton = <HTMLButtonElement>document.querySelector('#open-in-default');
const address = <HTMLInputElement>document.querySelector('#address');

let filePath:string = null;
let originalContent = '';


const isDifferentContent = (content:string) => content !== markdownView.value;

const renderMarkdownToHtml = (source:string, url?:string) => {
  //htmlView.innerHTML = marked(markdown, { sanitize: true });
  //let  m = { exports: {default:{}}};
  try{
      
    //let result = jst.transform(source);
      
    //if (result.format == 'html' || result.format == 'xml')
    //  htmlView.innerHTML = result.output;
    //else  
    //  htmlView.innerText = JSON.stringify(result);
    
    //htmlView.innerText = '@TODO';
    //htmlView.className = "rendered-html";


  } catch(e) {
    htmlView.innerText = e.message;
    htmlView.className = "rendered-html error";
  }   
};

window.addEventListener('resize', (ev: UIEvent) => {
  currentWindow.getBrowserView().setBounds(htmlView.getBoundingClientRect());
});

const renderFile = (file:string, content:string) => {
  filePath = file;
  originalContent = content;

  markdownView.value = content;
  renderMarkdownToHtml(content, file);

  showFileButton.disabled = false;
  openInDefaultButton.disabled = false;

  updateUserInterface(false);
};

const updateUserInterface = (isEdited:boolean) => {
  let title = 'appfibre Code';

  if (filePath) { title = `${path.basename(filePath)} - ${title}`; }
  if (isEdited) { title = `${title} (Edited)`; }

  currentWindow.setTitle(title);
  currentWindow.setDocumentEdited(isEdited);

  saveMarkdownButton.disabled = !isEdited;
  revertButton.disabled = !isEdited;
};

markdownView.addEventListener('keyup', (event:any) => {
  const currentContent = event.target.value;
  renderMarkdownToHtml(currentContent);
  updateUserInterface(currentContent !== originalContent);
});

newFileButton.addEventListener('click', () => {
  mainProcess.createWindow();
});

openFileButton.addEventListener('click', () => {
  mainProcess.getFileFromUser(currentWindow).then((file:string|null) => {
    if (file) { 
      let url = mainProcess.openFile(currentWindow, file); 
      if (url) //currentWindow.loadURL(url);
        currentWindow.getBrowserView().webContents.loadURL(url);
    }
  });
});

saveMarkdownButton.addEventListener('click', () => {
  mainProcess.saveMarkdown(currentWindow, filePath, markdownView.value);
});

revertButton.addEventListener('click', () => {
  markdownView.value = originalContent;
  renderMarkdownToHtml(originalContent);
});

saveHtmlButton.addEventListener('click', () => {
  mainProcess.saveHtml(currentWindow, htmlView.innerHTML);
});

const showFile = () => {
  if (!filePath) { return alert('This file has not been saved to the file system.'); }
  shell.showItemInFolder(filePath);
};

const openInDefaultApplication = () => {
  if (!filePath) { return alert('This file has not been saved to the file system.'); }
  shell.openItem(filePath);
};

showFileButton.addEventListener('click', showFile);
openInDefaultButton.addEventListener('click', openInDefaultApplication);
ipcRenderer.on('show-file', showFile);
ipcRenderer.on('open-in-default', openInDefaultApplication);

ipcRenderer.on('file-opened', (event, file:string, content:string) => {
  if (currentWindow.isDocumentEdited() && isDifferentContent(content)) {
    const result = remote.dialog.showMessageBox(currentWindow, {
      type: 'warning',
      title: 'Overwrite Current Unsaved Changes?',
      message: 'Opening a new file in this window will overwrite your unsaved changes. Open this file anyway?',
      buttons: [
        'Yes',
        'Cancel',
      ],
      defaultId: 0,
      cancelId: 1,
    }).then( r => {
      if (r.checkboxChecked) renderFile(file, content);
    })

    
    //if (result === 1) { return; }
  } 
  else
    renderFile(file, content);
});

ipcRenderer.on('file-changed', (event, file:string, content:string) => {
  if (!isDifferentContent(content)) return;
  const result = remote.dialog.showMessageBox(currentWindow, {
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
document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('dragleave', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

const getDraggedFile = (event:any) => event.dataTransfer.items[0];
const getDroppedFile = (event:any) => event.dataTransfer.files[0];

const fileTypeIsSupported = (file:{type:string}) => {
  return ['text/plain', 'text/markdown'].includes(file.type);
};

markdownView.addEventListener('dragover', (event) => {
  const file = getDraggedFile(event);

  if (fileTypeIsSupported(file)) {
    markdownView.classList.add('drag-over');
  } else {
    markdownView.classList.add('drag-error');
  }
});

markdownView.addEventListener('dragleave', () => {
  markdownView.classList.remove('drag-over');
  markdownView.classList.remove('drag-error');
});

markdownView.addEventListener('drop', (event) => {
  const file = getDroppedFile(event);

  if (fileTypeIsSupported(file)) {
    mainProcess.openFile(currentWindow, file.path);
  } else {
    alert('That file type is not supported');
  }

  markdownView.classList.remove('drag-over');
  markdownView.classList.remove('drag-error');
});

const createContextMenu = () => {
  return Menu.buildFromTemplate([
    { label: 'Open File', click() { mainProcess.getFileFromUser(); } },
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

markdownView.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  createContextMenu().popup();
});

ipcRenderer.on('save-markdown', () => {
  mainProcess.saveMarkdown(currentWindow, filePath, markdownView.value);
});

ipcRenderer.on('save-html', () => {
  mainProcess.saveHtml(currentWindow, filePath, markdownView.value);
});
