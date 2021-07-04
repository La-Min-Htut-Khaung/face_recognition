const electron = require('electron');
const path = require('path');
const url = require('url');

const {app,BrowserWindow, Menu} = electron;
let mainWindow;

app.on('ready',function(){
    mainWindow = new BrowserWindow({
        width : 1200,
        height : 680,
        webPreferences : {
            nodeIntegration: true
        }
        
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'./_view/mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // Quit when closed
    mainWindow.on('closed',function(){
        app.quit();
    })

    var mainMenu = Menu.buildFromTemplate([
        {
            label: 'Develper',
            submenu: [
                {
                    label: 'Toggle Dev',
                    accelerator: process.platform == 'darwin'? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
            
        }
    ])
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
    
    
});



