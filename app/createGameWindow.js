import { BrowserWindow } from 'electron';

let gameWindow;
function createGameWindow(gameParams) {
  gameWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  gameWindow.loadURL(`file://${__dirname}/public/index.html`)

  gameWindow.webContents.on('did-finish-load', () => {
    if (process.env.NODE_ENV === 'development') {
      gameWindow.webContents.openDevTools({ mode: 'undocked' });
    }
    gameWindow.webContents.send('init-game', gameParams);
  });

  gameWindow.on('closed', () => {
    gameWindow = null;
  });
}

export default createGameWindow;
