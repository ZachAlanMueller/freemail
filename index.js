'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {

	const {app, ipcMain} = require('electron');


	var basepath = app.getAppPath();

	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});
	const {BrowserWindow} = require('electron');
	let loadingWin = new BrowserWindow({frame: false, parent: win, width: 350, height: 350});
	loadingWin.loadURL(`file://${__dirname}/html/loadingWindow.html`);
	loadingWin.setResizable(false);
	//loadingWin.webContents.openDevTools();
	win.webContents.openDevTools();
	win.maximize();
	win.loadURL(`file://${__dirname}/html/registration.html`);
	win.on('closed', onClosed);
	loadingWin.show();
	//return win;

}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
