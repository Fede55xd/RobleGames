const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    // Crear una ventana de navegador
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Cargar el archivo index.html
    win.loadFile('index.html');

    // Abre las herramientas de desarrollo (opcional)
    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

// Crear la ventana cuando se esté listo para hacerlo
app.whenReady().then(createWindow);

// Cerrar cuando todas las ventanas estén cerradas (en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Crear la ventana en caso de que se vuelva a abrir
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
