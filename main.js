const { app, BrowserWindow, Menu, shell } = require('electron');

const APP_URL = 'https://safe-os.netlify.app/';
const APP_ORIGIN = new URL(APP_URL).origin;

function isAppUrl(url) {
  try {
    return new URL(url).origin === APP_ORIGIN;
  } catch {
    return false;
  }
}

function openExternalUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      void shell.openExternal(parsedUrl.href).catch((error) => {
        console.error('Unable to open external link:', error);
      });
    }
  } catch (error) {
    console.error('Ignoring invalid external link:', error);
  }
}

function handleNavigation(event, url) {
  if (isAppUrl(url)) {
    return;
  }

  event.preventDefault();
  openExternalUrl(url);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    title: 'Safe OS',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.on('will-navigate', handleNavigation);
  mainWindow.webContents.on('will-redirect', handleNavigation);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!isAppUrl(url)) {
      openExternalUrl(url);
    }
    return { action: 'deny' };
  });

  void mainWindow.loadURL(APP_URL).catch((error) => {
    console.error('Unable to load Safe OS:', error);
  });
}

app.whenReady().then(() => {
  app.setName('Safe OS');
  Menu.setApplicationMenu(null);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
