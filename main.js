const electron = require('electron');
const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');

/* Template for the Menu
menuTemplate = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'About',
        click: () => {
          openAboutWindow()
        }
      }
    ]
  }
]*/

let mainWindow;

function createWindow () {

  // parametrii ferestrei
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720
   })

  // incarcarea fisierului html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  /*var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)*/

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
//crearea ferestrei 
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

//inchiderea aplicației
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// pentru macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
