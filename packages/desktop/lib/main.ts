import { app, BrowserWindow, dialog, BrowserView } from 'electron';
import { createApplicationMenu } from './application-menu'
//import { fastify } from './server';
import { server } from '@appfibre/server';
import * as fs from 'fs';

//var editor = monaco.editor.create();
//editor.setValue()

const windows = new Set();
const openFiles = new Map();
let port:number|undefined = 9000;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
} 
else
{
  
  app.on('ready', () => {
    server({port: port, loglevel: 'warn', folder: ''}).then((si:{port: number}) => port = si.port);
    createApplicationMenu();
    createWindow();
  
    /*fastify.listen(9000).then(() => {
      createApplicationMenu();
      createWindow();
    }).catch((e) => {
      fastify.log.error(e);
      process.exit(1)
    });*/
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) createWindow();
  });
}



function createWindow () {
  let x, y;
  const currentWindow = BrowserWindow.getFocusedWindow();

  if (currentWindow) {
    const [ currentWindowX, currentWindowY ] = currentWindow.getPosition();
    x = currentWindowX + 10;
    y = currentWindowY + 10;
  }
  let newWindow = new BrowserWindow({ x, y, show: false, darkTheme: true, webPreferences: { nodeIntegration: true }});
  newWindow.webContents.openDevTools();
  
  let view = new BrowserView()
  newWindow.setBrowserView(view)
  //view.setBounds({ x: 200, y: 200, width: 400, height: 400 });
  //view.setAutoResize({ height: true, width: true });
  //view.webContents.loadURL(getUrl("C:/Users/Dawid/OneDrive/Documents/Finances/PropertyAdmin/statement.jst") );
  
  newWindow.webContents.setDevToolsWebContents(view.webContents);
  //view.webContents.toggleDevTools();
  newWindow.loadFile('./app/index.html');

  newWindow.once('ready-to-show', () => {
    newWindow.show();
  });

  newWindow.on('focus', createApplicationMenu);

  newWindow.on('close', (event) => {
    if (newWindow.isDocumentEdited()) {
      event.preventDefault();

      dialog.showMessageBox(newWindow, {
        type: 'warning',
        title: 'Quit with Unsaved Changes?',
        message: 'Your changes will be lost permanently if you do not save.',
        buttons: [
          'Quit Anyway',
          'Cancel',
        ],
        cancelId: 1,
        defaultId: 0
      }).then(d => {
        if (d.response == 0)
          newWindow.destroy();
      })

    }
  });

  newWindow.on('closed', () => {
    windows.delete(newWindow);
    createApplicationMenu();
    stopWatchingFile(newWindow);
    newWindow = null;
  });

  windows.add(newWindow);
  return newWindow;
};

async function getFileFromUser (targetWindow:BrowserWindow) {
  let file = await dialog.showOpenDialog(targetWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Source Files', extensions: ['jst', 'json'] },
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] }
    ]
  });
  
  return (file.canceled) ? null : file.filePaths[0];
  /*.then(f => {
    openFile(targetWindow, f.filePaths[0]);    
  });*/

};

function openFile(targetWindow:BrowserWindow, file:string) {
  const content = fs.readFileSync(file).toString();
  app.addRecentDocument(file);
  targetWindow.setRepresentedFilename(file);
  //targetWindow.webContents.send('file-opened', file, content);
  createApplicationMenu();
  startWatchingFile(targetWindow, file);
  return getUrl(file);
};


function saveMarkdown (targetWindow:BrowserWindow, file?:string, content?:string) {
  if (!file) {
    dialog.showSaveDialog(targetWindow, {
      title: 'Save Markdown',
      defaultPath: app.getPath('documents'),
      filters: [
        { name: 'Markdown Files', extensions: ['md', 'markdown'] }
      ]
    }).then(f => {
      if (!f.canceled) {
        fs.writeFileSync(file, content);
        openFile(targetWindow, file);      
      }
    })
  } else {
  fs.writeFileSync(file, content);
  openFile(targetWindow, file);
  }
};



function saveHtml (targetWindow:BrowserWindow, content?:string)  {
  dialog.showSaveDialog(targetWindow, {
    title: 'Save HTML',
    defaultPath: app.getPath('documents'),
    filters: [
      { name: 'HTML Files', extensions: ['html', 'htm'] }
    ]
  }).then( f => {
    if (!f.canceled) fs.writeFileSync(f.filePath, content);
  });
};



function startWatchingFile (targetWindow:BrowserWindow, file:string)  {
  stopWatchingFile(targetWindow);
  const watcher = fs.watchFile(file, () => {
    const content = fs.readFileSync(file).toString();
    targetWindow.webContents.send('file-changed', file, content);
  });

  openFiles.set(targetWindow, watcher);
};



function stopWatchingFile (targetWindow:BrowserWindow) {
  if (openFiles.has(targetWindow)) {
    openFiles.get(targetWindow).stop();
    openFiles.delete(targetWindow);
  }
};

function getUrl(filename:string)
{

  if (port) {
  //let address = fastify.server.address();
  //let url =  (typeof address == "string") ? address : "http://localhost:" + address.port.toString();
  let url = "http://localhost:" + port.toString();
  let path = filename;
  while (/\\/.test(path)) path = path.replace('\\', '/');
  return url + (path.startsWith('/') ? '' : '/') + path;

  }
}

export {createWindow, getFileFromUser, saveMarkdown, saveHtml, getUrl, openFile };


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
