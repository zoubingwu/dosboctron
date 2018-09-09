import { ipcMain } from 'electron';

import createGameWindow from './createGameWindow';

function initIpcEvent() {
  ipcMain.on('select-game', (_, arg) => {
    createGameWindow(arg);
  });
}

export default initIpcEvent;
